import { Button as BaseButton } from '@base-ui/react/button';
import { cn } from '@/core';
import { buttonVariants } from './button.variants';
import type { ButtonProps } from './button.types';

/**
 * Pluggable button. Import it and pass props matching {@link ButtonContract}
 * plus any presentation props from {@link ButtonProps}.
 *
 * Wraps the Base UI `Button` primitive (`@base-ui/react/button`): Base UI owns
 * the accessible, unstyled behaviour; this wrapper maps our contract onto it and
 * resolves the `eui-*` variant classes via {@link buttonVariants} (CVA). The
 * contract and adapters never depend on Base UI or the variant system, so each
 * can be swapped in isolation.
 */
export function Button({
  label,
  disabled = false,
  variant,
  size,
  type = 'button',
  onClick,
  className,
}: ButtonProps) {
  return (
    <BaseButton
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </BaseButton>
  );
}
