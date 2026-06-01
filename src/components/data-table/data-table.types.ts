import type { ReactNode } from 'react';
import type { DataTableContract } from './data-table.contract';
import type { DataTableVariantProps } from './data-table.variants';

/** Density preset of the table. Derived from the CVA variant definition. */
export type DataTableSize = NonNullable<DataTableVariantProps['size']>;

/**
 * Full prop set for the DataTable: its data contract plus presentation (CVA
 * density) and the feature toggles mirroring the shadcn data table (sorting is
 * always on per-column; search, pagination and selection are opt-in).
 */
export interface DataTableProps<TRow> extends DataTableContract<TRow>, DataTableVariantProps {
  /** Show a search box that filters across all columns. */
  searchable?: boolean;
  /** Placeholder for the search box. */
  searchPlaceholder?: string;
  /** Rows per page. When set, pagination controls are shown. */
  pageSize?: number;
  /** Show selection checkboxes; selected row ids are reported via `onSelectionChange`. */
  selectable?: boolean;
  /** Called with the selected row ids whenever the selection changes. */
  onSelectionChange?: (selectedIds: string[]) => void;
  /** Content shown when there are no rows (after filtering). */
  emptyMessage?: ReactNode;
  /** Escape hatch for additional class names on the root element. */
  className?: string;
}
