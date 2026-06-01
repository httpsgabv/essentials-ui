import type { ReactNode } from 'react';

/**
 * One column of a {@link DataTableContract}. Generic over the row type so any
 * data shape can be tabulated.
 */
export interface DataTableColumn<TRow> {
  /** Stable column key (also used as the sort/selection key). */
  id: string;
  /** Header text. */
  header: string;
  /**
   * The cell's underlying value, used for display, sorting and global filtering.
   * Keep this flat (string/number) so sources like a Mendix attribute map onto
   * it directly; use `cell` when you need custom rendering.
   */
  value: (row: TRow) => string | number;
  /** Optional custom renderer. Defaults to printing `value`. */
  cell?: (row: TRow) => ReactNode;
  /** Whether the column can be sorted. Defaults to `true`. */
  enableSorting?: boolean;
}

/**
 * Data contract (inbound port) for the DataTable: the columns and the rows.
 * Both are *data* — a Mendix widget would feed `rows` from a datasource and
 * build `columns` from its configured attributes via an adapter.
 */
export interface DataTableContract<TRow> {
  /** Column definitions, left to right. */
  columns: DataTableColumn<TRow>[];
  /** Row data. */
  rows: TRow[];
  /** Stable id for a row, used for selection. Defaults to the row index. */
  getRowId?: (row: TRow, index: number) => string;
}
