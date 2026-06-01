import type { Adapter } from '@/core';
import type { DataTableContract } from '../data-table.contract';

/** A flat record keyed by column id. */
export type TableRecord = Record<string, string | number>;

/**
 * Example source shape: flat records plus a column key/label list (a REST
 * collection, a CSV, a Mendix datasource projected to attributes). Real projects
 * import their own row type — the adapter turns any flat shape into table
 * columns + rows without the component knowing the source.
 */
export interface RecordsTableSource {
  records: TableRecord[];
  columns: Array<{ key: string; header: string }>;
}

/** Map flat {@link RecordsTableSource} data into the DataTable contract. */
export const recordsToDataTable: Adapter<RecordsTableSource, DataTableContract<TableRecord>> = (
  source,
) => ({
  rows: source.records,
  columns: source.columns.map((col) => ({
    id: col.key,
    header: col.header,
    value: (row) => row[col.key],
  })),
});
