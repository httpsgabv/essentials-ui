import type { ChipContract } from './chip.contract';
import type { ChipVariantProps } from './chip.variants';

export interface ChipProps extends ChipContract, ChipVariantProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}
