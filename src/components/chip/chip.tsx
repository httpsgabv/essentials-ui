import { Button } from '@base-ui/react/button';
import { cn } from '@/core';
import { chipVariants } from './chip.variants';
import type { ChipProps } from './chip.types';

/**
 * Standalone interactive chip. Wraps the Base UI `Button` primitive and maps
 * the {@link ChipContract} onto it via {@link chipVariants} (CVA).
 *
 * The `layout` variant controls icon placement:
 * - `text-only`  — label only
 * - `icon-left`  — icon to the left of the label
 * - `icon-right` — icon to the right of the label (e.g. a dismiss `X`)
 */
export function Chip({ label, icon: IconComponent, layout, size, onClick, disabled, className }: ChipProps) {
  return (
    <Button
      className={cn(chipVariants({ layout, size }), className)}
      disabled={disabled}
      onClick={onClick}
    >
      {layout === 'icon-left' && IconComponent && (
        <span className="eui-chip__icon" aria-hidden>
          <IconComponent />
        </span>
      )}
      <span className="eui-chip__label">{label}</span>
      {layout === 'icon-right' && IconComponent && (
        <span className="eui-chip__icon" aria-hidden>
          <IconComponent />
        </span>
      )}
    </Button>
  );
}
