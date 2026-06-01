import type { Icon } from '@phosphor-icons/react';

export interface ChipContract {
  label: string;
  /** Phosphor icon component. Required when `layout` is `icon-left` or `icon-right`. */
  icon?: Icon;
}
