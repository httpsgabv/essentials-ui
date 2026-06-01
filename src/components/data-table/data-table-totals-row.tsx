import type { Table } from '@tanstack/react-table';
import { cn } from '@/core';
import { SELECT_COLUMN_ID } from './data-table-constants';

export function DataTableTotalsRow<TRow>({
  table,
  formattedTotals,
  firstDataColId,
  position,
}: {
  table: Table<TRow>;
  /** Pre-formatted total strings keyed by column id. Only numeric columns have an entry. */
  formattedTotals: Record<string, string>;
  firstDataColId: string | undefined;
  position: 'top' | 'bottom';
}) {
  return (
    <tr className={cn('eui-datatable__total-row', `eui-datatable__total-row--${position}`)}>
      {table.getVisibleFlatColumns().map((col) => {
        if (col.id === SELECT_COLUMN_ID) {
          return <td key={col.id} className="eui-datatable__total-td eui-datatable__td--select" />;
        }
        const formatted = formattedTotals[col.id];
        const isFirst = col.id === firstDataColId;
        return (
          <td
            key={col.id}
            className={cn(
              'eui-datatable__total-td',
              formatted !== undefined && 'eui-datatable__td--numeric',
            )}
          >
            {formatted !== undefined ? formatted : isFirst ? 'Total' : null}
          </td>
        );
      })}
    </tr>
  );
}
