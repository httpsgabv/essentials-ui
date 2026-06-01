import type { Table } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { CaretDown, CaretUp, CaretUpDown } from '@phosphor-icons/react';
import { cn } from '@/core';
import { ACTION_COLUMN_ID, SELECT_COLUMN_ID } from './data-table-constants';

export function DataTableHeader<TRow>({
  table,
  isNumericCol,
}: {
  table: Table<TRow>;
  isNumericCol: (colId: string) => boolean;
}) {
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const canSort = header.column.getCanSort();
            const sorted = header.column.getIsSorted();
            const isSelect = header.column.id === SELECT_COLUMN_ID;
            const isAction = header.column.id === ACTION_COLUMN_ID;
            return (
              <th
                key={header.id}
                className={cn(
                  'eui-datatable__th',
                  isSelect && 'eui-datatable__th--select',
                  isAction && 'eui-datatable__th--action',
                  !isSelect && !isAction && isNumericCol(header.column.id) && 'eui-datatable__th--numeric',
                )}
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
  );
}
