import type { ButtonContract } from './button.contract';
import type { ButtonVariantProps } from './button.variants';

/** Visual style of the button. Derived from the CVA variant definition. */
export type ButtonVariant = NonNullable<ButtonVariantProps['variant']>;
/** Size preset of the button. Derived from the CVA variant definition. */
export type ButtonSize = NonNullable<ButtonVariantProps['size']>;

/**
 * Full prop set for the Button: its data contract plus presentation (CVA
 * variants) and behaviour. Consumers spread contract data and add the rest:
 * `<Button {...contract} variant="primary" onClick={...} />`.
 */
export interface ButtonProps extends ButtonContract, ButtonVariantProps {
  /** Native button type. Defaults to `'button'`. */
  type?: 'button' | 'submit' | 'reset';
  /** Click handler. Not fired while `disabled`. */
  onClick?: () => void;
  /** Escape hatch for additional class names from the consumer. */
  className?: string;
}
