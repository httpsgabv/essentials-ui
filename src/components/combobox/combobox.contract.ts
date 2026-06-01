/**
 * Combobox data contract (inbound port).
 *
 * A single selectable option. The shape mirrors what Base UI consumes natively
 * (`{ value, label }`), so the label is shown in the input/list and `value` is
 * used for selection and form submission.
 */
export interface ComboboxOption {
  /** Stable identifier reported on selection. */
  value: string;
  /** Human-readable text shown in the input and the list. */
  label: string;
  /** When true, the option is present but not selectable. */
  disabled?: boolean;
}

/**
 * The data a Combobox needs: the catalog of options to choose from. A Mendix
 * widget feeds this from a datasource via an adapter (see `./adapters`).
 *
 * Selection (`value`) is *not* part of the contract because its shape depends on
 * the mode — `string | null` for single select, `string[]` for multiple. It is
 * a controlled prop on `combobox.types.ts` instead, alongside `onValueChange`.
 */
export interface ComboboxContract {
  /** Options to choose from. */
  options: ComboboxOption[];
}
