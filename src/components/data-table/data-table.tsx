import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import {
  type ColumnDef,
  type OnChangeFn,
  type RowSelectionState,
  type SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { cn } from '@/core';
import { dataTableVariants } from './data-table.variants';
import type { DataTableProps } from './data-table.types';
import { ACTION_COLUMN_ID, SELECT_COLUMN_ID } from './data-table-constants';
import { formatNumeric } from './data-table-format';
import { DataTableCheckbox } from './data-table-checkbox';
import { DataTableActionCell } from './data-table-action-cell';
import { DataTableToolbar } from './data-table-toolbar';
import { DataTableHeader } from './data-table-header';
import { DataTableBody } from './data-table-body';
import { DataTableTotalsRow } from './data-table-totals-row';
import { DataTablePagination } from './data-table-pagination';

/**
 * Pluggable data table. Pass props matching {@link DataTableContract} plus the
 * feature toggles in {@link DataTableProps}, or feed a data source through an
 * adapter in `./adapters`.
 *
 * The rendering engine is the headless `@tanstack/react-table` (the same engine
 * the shadcn data table is built on); this wrapper supplies the markup, the
 * `eui-*` styling, and a flat, string-based public API. Pagination prev/next
 * reuse {@link Button} and selection uses the Base UI `Checkbox` primitive, so
 * the table stays consistent with the rest of the library.
 */
export function DataTable<TRow>({
  columns,
  rows,
  getRowId,
  size,
  searchable = false,
  searchPlaceholder,
  pageSize,
  selectable = false,
  onSelectionChange,
  actionColumn,
  totals,
  stickyHeader = false,
  infiniteScroll,
  emptyMessage = 'No results.',
  className,
}: DataTableProps<TRow>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [rowLimit, setRowLimit] = useState(() => infiniteScroll ?? 0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLTableRowElement>(null);

  const tableColumns = useMemo<ColumnDef<TRow>[]>(() => {
    const defs: ColumnDef<TRow>[] = columns.map((col) => ({
      id: col.id,
      header: col.header,
      accessorFn: (row) => col.value(row),
      cell: col.cell
        ? (ctx) => col.cell!(ctx.row.original)
        : col.format
          ? (ctx) => {
              const v = ctx.getValue();
              return typeof v === 'number' ? formatNumeric(v, col.format!) : String(v ?? '');
            }
          : (ctx) => ctx.getValue() as ReactNode,
      enableSorting: col.enableSorting ?? true,
    }));

    if (selectable) {
      defs.unshift({
        id: SELECT_COLUMN_ID,
        enableSorting: false,
        header: ({ table }) => (
          <DataTableCheckbox
            label="Select all rows"
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onCheckedChange={(value) => table.toggleAllRowsSelected(value)}
          />
        ),
        cell: ({ row }) => (
          <DataTableCheckbox
            label="Select row"
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(value)}
          />
        ),
      });
    }

    if (actionColumn) {
      const actionColDef = {
        id: ACTION_COLUMN_ID,
        enableSorting: false,
        header: actionColumn.header ?? '',
        cell: ({ row }: { row: import('@tanstack/react-table').Row<TRow> }) => (
          <DataTableActionCell row={row} actions={actionColumn.actions} />
        ),
      };
      if (actionColumn.position === 'start') {
        // Insert after the select column (always first) or at index 0.
        defs.splice(selectable ? 1 : 0, 0, actionColDef);
      } else {
        defs.push(actionColDef);
      }
    }

    return defs;
  }, [columns, selectable, actionColumn]);

  // Report selection without an impure state updater: apply the change to the
  // current state, set it, and emit the resulting ids.
  const handleRowSelectionChange: OnChangeFn<RowSelectionState> = (updater) => {
    const next = typeof updater === 'function' ? updater(rowSelection) : updater;
    setRowSelection(next);
    onSelectionChange?.(Object.keys(next).filter((id) => next[id]));
  };

  const table = useReactTable({
    data: rows,
    columns: tableColumns,
    state: { sorting, globalFilter, rowSelection },
    getRowId: getRowId ? (row, index) => getRowId(row, index) : undefined,
    enableRowSelection: selectable,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: handleRowSelectionChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...(pageSize ? { getPaginationRowModel: getPaginationRowModel() } : {}),
    initialState: pageSize ? { pagination: { pageIndex: 0, pageSize } } : undefined,
  });

  const isNumericCol = (colId: string) => columns.find((c) => c.id === colId)?.numeric === true;

  // Sum each numeric column over the filtered (not just current-page) rows.
  const columnTotals = useMemo(() => {
    if (!totals) return {} as Record<string, number>;
    const filteredRows = table.getFilteredRowModel().rows;
    return Object.fromEntries(
      columns
        .filter((col) => col.numeric)
        .map((col) => [
          col.id,
          filteredRows.reduce((sum, row) => {
            const v = col.value(row.original);
            return sum + (typeof v === 'number' ? v : 0);
          }, 0),
        ]),
    );
    // globalFilter and rows drive which rows appear in the filtered model.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totals, columns, globalFilter, rows]);

  const formattedTotals = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(columnTotals).map(([id, total]) => {
          const col = columns.find((c) => c.id === id);
          return [id, col?.format ? formatNumeric(total, col.format) : total.toLocaleString()];
        }),
      ),
    [columnTotals, columns],
  );

  const firstDataColId = table
    .getVisibleFlatColumns()
    .find((c) => c.id !== SELECT_COLUMN_ID && c.id !== ACTION_COLUMN_ID)?.id;

  // Reset visible row count when the filter changes so a narrowed result set
  // starts from the top again.
  useEffect(() => {
    if (infiniteScroll != null) setRowLimit(infiniteScroll);
  }, [globalFilter, infiniteScroll]);

  // Observe the sentinel row; when it enters the scroll container's viewport,
  // reveal the next batch of rows.
  useEffect(() => {
    if (infiniteScroll == null || !sentinelRef.current || !scrollContainerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setRowLimit((prev) => prev + infiniteScroll);
      },
      { root: scrollContainerRef.current },
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
    // Re-attach whenever rowLimit changes so the observer always targets the
    // current sentinel position after new rows are rendered.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infiniteScroll, rowLimit]);

  const allRows = table.getRowModel().rows;
  const displayedRows = infiniteScroll != null ? allRows.slice(0, rowLimit) : allRows;
  const hasMore = infiniteScroll != null && rowLimit < allRows.length;

  const showTopTotals = (totals === 'top' || totals === 'both') && allRows.length > 0;
  const showBottomTotals = (totals === 'bottom' || totals === 'both') && allRows.length > 0;

  return (
    <div className={cn(dataTableVariants({ size }), className)}>
      {searchable && (
        <DataTableToolbar
          value={globalFilter}
          onChange={setGlobalFilter}
          placeholder={searchPlaceholder}
        />
      )}

      <div
        ref={scrollContainerRef}
        className={cn(
          'eui-datatable__scroll',
          infiniteScroll != null && 'eui-datatable__scroll--infinite',
          stickyHeader && 'eui-datatable__scroll--sticky-header',
        )}
      >
        <table className="eui-datatable__table">
          <DataTableHeader table={table} isNumericCol={isNumericCol} />
          <DataTableBody
            table={table}
            allRows={allRows}
            displayedRows={displayedRows}
            hasMore={hasMore}
            isNumericCol={isNumericCol}
            showTopTotals={showTopTotals}
            formattedTotals={formattedTotals}
            firstDataColId={firstDataColId}
            sentinelRef={sentinelRef}
            emptyMessage={emptyMessage}
            visibleColumnCount={tableColumns.length}
          />
          {showBottomTotals && (
            <tfoot>
              <DataTableTotalsRow
                table={table}
                formattedTotals={formattedTotals}
                firstDataColId={firstDataColId}
                position="bottom"
              />
            </tfoot>
          )}
        </table>
      </div>

      {pageSize && <DataTablePagination table={table} />}
    </div>
  );
}
