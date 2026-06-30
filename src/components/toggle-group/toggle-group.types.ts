import type { ToggleGroupContract } from './toggle-group.contract';
import type { ToggleGroupVariantProps } from './toggle-group.variants';

export type ToggleGroupSize = NonNullable<ToggleGroupVariantProps['size']>;

interface ToggleGroupBaseProps extends ToggleGroupContract, ToggleGroupVariantProps {
  /** Layout direction. Default: `'horizontal'`. */
  orientation?: 'horizontal' | 'vertical';
  /** Disables all items in the group. */
  disabled?: boolean;
  /** Escape hatch for extra class names on the group container. */
  className?: string;
}

/** Single-select mode (default): at most one item pressed. */
export interface SingleToggleGroupProps extends ToggleGroupBaseProps {
  multiple?: false;
  /** Currently pressed item's `value`. `null`/omitted means nothing is pressed. */
  value?: string | null;
  /** Called with the pressed value, or `null` when the item is toggled off. */
  onValueChange?: (value: string | null) => void;
}

/** Multiple-select mode: any number of items may be pressed simultaneously. */
export interface MultipleToggleGroupProps extends ToggleGroupBaseProps {
  multiple: true;
  /** Currently pressed items' `value` array. */
  value?: string[];
  /** Called with the full array of pressed values after every change. */
  onValueChange?: (value: string[]) => void;
}

/**
 * Full prop set for ToggleGroup. Discriminated on `multiple` so the selection
 * types differ by mode while staying one pluggable component.
 */
export type ToggleGroupProps = SingleToggleGroupProps | MultipleToggleGroupProps;
