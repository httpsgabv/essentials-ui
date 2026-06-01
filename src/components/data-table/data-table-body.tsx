import type { ReactNode, RefObject } from 'react';
import type { Row, Table } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { cn } from '@/core';
import { ACTION_COLUMN_ID, SELECT_COLUMN_ID } from './data-table-constants';
import { DataTableTotalsRow } from './data-table-totals-row';

export function DataTableBody<TRow>({
  table,
  allRows,
  displayedRows,
  hasMore,
  isNumericCol,
  showTopTotals,
  formattedTotals,
  firstDataColId,
  sentinelRef,
  emptyMessage,
  visibleColumnCount,
}: {
  table: Table<TRow>;
  allRows: Row<TRow>[];
  displayedRows: Row<TRow>[];
  hasMore: boolean;
  isNumericCol: (colId: string) => boolean;
  showTopTotals: boolean;
  formattedTotals: Record<string, string>;
  firstDataColId: string | undefined;
  sentinelRef: RefObject<HTMLTableRowElement | null>;
  emptyMessage: ReactNode;
  visibleColumnCount: number;
}) {
  return (
    <tbody>
      {allRows.length === 0 ? (
        <tr>
          <td className="eui-datatable__empty" colSpan={visibleColumnCount}>
            {emptyMessage}
          </td>
        </tr>
      ) : (
        <>
          {showTopTotals && (
            <DataTableTotalsRow
              table={table}
              formattedTotals={formattedTotals}
              firstDataColId={firstDataColId}
              position="top"
            />
          )}
          {displayedRows.map((row) => (
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
                    cell.column.id === ACTION_COLUMN_ID && 'eui-datatable__td--action',
                    isNumericCol(cell.column.id) && 'eui-datatable__td--numeric',
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          {hasMore && <tr ref={sentinelRef} aria-hidden />}
        </>
      )}
    </tbody>
  );
}
