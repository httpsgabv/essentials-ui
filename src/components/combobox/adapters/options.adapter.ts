import type { Adapter } from '@/core';
import type { ComboboxContract } from '../combobox.contract';

/**
 * Example source shape: rows from a list data source (a REST collection, a DB
 * query, a Mendix datasource). Real projects import their own row type — the
 * adapter is the seam that turns any list shape into combobox options without
 * the component knowing where they came from.
 */
export interface OptionRow {
  id: string | number;
  name: string;
  disabled?: boolean;
}

/** Map a list of {@link OptionRow} into the Combobox contract. */
export const rowsToCombobox: Adapter<OptionRow[], ComboboxContract> = (rows) => ({
  options: rows.map((row) => ({
    value: String(row.id),
    label: row.name,
    disabled: row.disabled,
  })),
});
