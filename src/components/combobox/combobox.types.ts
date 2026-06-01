import type { ComboboxContract } from './combobox.contract';
import type { ComboboxVariantProps } from './combobox.variants';

/** Size preset of the combobox field. Derived from the CVA variant definition. */
export type ComboboxSize = NonNullable<ComboboxVariantProps['size']>;

/** Props shared by both selection modes. */
interface ComboboxBaseProps extends ComboboxContract, ComboboxVariantProps {
  /** Placeholder shown in the empty input. */
  placeholder?: string;
  /** When true, the whole combobox is non-interactive. */
  disabled?: boolean;
  /** Escape hatch for additional class names on the field wrapper. */
  className?: string;
}

/** Single-select mode (default): one value in, one value out. */
export interface SingleComboboxProps extends ComboboxBaseProps {
  multiple?: false;
  /** Selected option's `value` (controlled). `null`/omitted means no selection. */
  value?: string | null;
  /** Called with the selected `value`, or `null` when cleared. */
  onValueChange?: (value: string | null) => void;
}

/** Multiple-select mode: selections render as removable chips in the input. */
export interface MultipleComboboxProps extends ComboboxBaseProps {
  multiple: true;
  /** Selected option `value`s (controlled). */
  value?: string[];
  /** Called with the full array of selected `value`s after every change. */
  onValueChange?: (value: string[]) => void;
}

/**
 * Full prop set for the Combobox. A discriminated union on `multiple` so the
 * selection types differ by mode while it stays one pluggable component.
 */
export type ComboboxProps = SingleComboboxProps | MultipleComboboxProps;
