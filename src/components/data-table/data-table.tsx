import { type ReactNode, useMemo, useState } from 'react';
import {
  type ColumnDef,
  type OnChangeFn,
  type RowSelectionState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { CaretDown, CaretUp, CaretUpDown, Check } from '@phosphor-icons/react';
import { cn } from '@/core';
import { Button } from '../button';
import { dataTableVariants } from './data-table.variants';
import type { DataTableProps } from './data-table.types';

const SELECT_COLUMN_ID = '__select__';

function SelectionCheckbox({
  checked,
  indeterminate,
  onCheckedChange,
  label,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <BaseCheckbox.Root
      className="eui-datatable__checkbox"
      checked={checked}
      indeterminate={indeterminate}
      onCheckedChange={onCheckedChange}
      aria-label={label}
    >
      <BaseCheckbox.Indicator className="eui-datatable__checkbox-indicator">
        <Check weight="bold" />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}

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
  emptyMessage = 'No results.',
  className,
}: DataTableProps<TRow>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const tableColumns = useMemo<ColumnDef<TRow>[]>(() => {
    const defs: ColumnDef<TRow>[] = columns.map((col) => ({
      id: col.id,
      header: col.header,
      accessorFn: (row) => col.value(row),
      cell: col.cell ? (ctx) => col.cell!(ctx.row.original) : (ctx) => ctx.getValue() as ReactNode,
      enableSorting: col.enableSorting ?? true,
    }));

    if (selectable) {
      defs.unshift({
        id: SELECT_COLUMN_ID,
        enableSorting: false,
        header: ({ table }) => (
          <SelectionCheckbox
            label="Select all rows"
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onCheckedChange={(value) => table.toggleAllRowsSelected(value)}
          />
        ),
        cell: ({ row }) => (
          <SelectionCheckbox
            label="Select row"
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(value)}
          />
        ),
      });
    }

    return defs;
  }, [columns, selectable]);

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

  const visibleColumnCount = tableColumns.length;

  return (
    <div className={cn(dataTableVariants({ size }), className)}>
      {searchable && (
        <div className="eui-datatable__toolbar">
          <input
            type="search"
            className="eui-datatable__search"
            value={globalFilter}
            placeholder={searchPlaceholder}
            onChange={(event) => setGlobalFilter(event.target.value)}
            aria-label="Search table"
          />
        </div>
      )}

      <div className="eui-datatable__scroll">
        <table className="eui-datatable__table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sorted = header.column.getIsSorted();
                  const isSelect = header.column.id === SELECT_COLUMN_ID;
                  return (
                    <th
                      key={header.id}
                      className={cn('eui-datatable__th', isSelect && 'eui-datatable__th--select')}
                      aria-sort={
                        canSort
                          ? sorted === 'asc'
                            ? 'ascending'
                            : sorted === 'desc'
                              ? 'descending'
                              : 'none'
                          : undefined
                      }
                    >
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          type="button"
                          className="eui-datatable__sort"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {sorted === 'asc' ? (
                            <CaretUp />
                          ) : sorted === 'desc' ? (
                            <CaretDown />
                          ) : (
                            <CaretUpDown />
                          )}
                        </button>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td className="eui-datatable__empty" colSpan={visibleColumnCount}>
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="eui-datatable__row"
                  data-selected={row.getIsSelected() || undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={cn(
                        'eui-datatable__td',
                        cell.column.id === SELECT_COLUMN_ID && 'eui-datatable__td--select',
                      )}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pageSize && (
        <div className="eui-datatable__pagination">
          <span className="eui-datatable__page-info">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
          </span>
          <div className="eui-datatable__page-controls">
            <Button
              label="Previous"
              variant="secondary"
              size="sm"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            />
            <Button
              label="Next"
              variant="secondary"
              size="sm"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
