import type { Icon } from '@phosphor-icons/react';

/** A single selectable item within a ToggleGroup. */
export interface ToggleGroupOption {
  /** Stable identifier; reported in `onValueChange`. */
  value: string;
  /** Visible label text. */
  label: string;
  /** Optional Phosphor icon rendered to the left of the label. */
  icon?: Icon;
  /** When true, this item cannot be pressed. */
  disabled?: boolean;
}

/**
 * ToggleGroup data contract (inbound port).
 *
 * The catalog of options to display. Selection state (`value` / `onValueChange`)
 * is kept in `toggle-group.types.ts` because its shape depends on the mode
 * (`string | null` for single, `string[]` for multiple).
 */
export interface ToggleGroupContract {
  options: ToggleGroupOption[];
}
