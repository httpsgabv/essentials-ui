import type { ReactNode } from 'react';
import type { Icon } from '@phosphor-icons/react';

/**
 * Display formatting options for a numeric column. Applied to both cell
 * values and the totals row. Only meaningful when the column's `value`
 * returns a `number`.
 */
export interface NumericFormat {
  /** Thousands separator (e.g. 1000000 → 1,000,000). Default: `false`. */
  groupDigits?: boolean;
  /** String prepended to the formatted value (e.g. `'$'`, `'€ '`). */
  prefix?: string;
  /** String appended to the formatted value (e.g. `'%'`, `' USD'`). */
  suffix?: string;
  /** Fixed number of decimal places (e.g. `2` → `'1.50'`). */
  decimalPlaces?: number;
}

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
  /**
   * When `true`, the column holds numeric/currency data: cells are
   * right-aligned and the column is included in the totals row when
   * `showTotals` is enabled on the table.
   */
  numeric?: boolean;
  /**
   * Display formatting applied to the cell value and the totals row.
   * Requires the `value` function to return a `number`.
   * See {@link NumericFormat} for available options.
   */
  format?: NumericFormat;
  /** Whether the column can be sorted. Defaults to `true`. */
  enableSorting?: boolean;
}

/**
 * One action rendered inside an action column cell. Supports four appearances
 * depending on which of `icon` and `label` are provided:
 * - icon only  → compact icon button
 * - label only → ghost text button
 * - both       → ghost button with leading icon
 */
export interface DataTableAction<TRow> {
  /** Unique key used for React element keying. */
  key: string;
  /**
   * Phosphor icon component to show (e.g. `NotePencil`, `Trash`). The cell
   * renders it at 1 rem. Provide either this, `label`, or both.
   */
  icon?: Icon;
  /** Text label shown on the button. */
  label?: string;
  /** Called with the row's data when the button is clicked. */
  onClick: (row: TRow) => void;
  /** Return `true` to disable this action for a specific row. */
  disabled?: (row: TRow) => boolean;
}

/**
 * An action column renders one or more action buttons in every row instead
 * of a data value. It is not sortable and not included in global search.
 */
export interface DataTableActionColumn<TRow> {
  /** Optional visible header label. Defaults to no header text. */
  header?: string;
  /** Whether to place the column before or after the data columns. Default: `'end'`. */
  position?: 'start' | 'end';
  /** The action buttons to render in each cell. */
  actions: DataTableAction<TRow>[];
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
  /** Optional column of action buttons placed at the start or end of each row. */
  actionColumn?: DataTableActionColumn<TRow>;
}
