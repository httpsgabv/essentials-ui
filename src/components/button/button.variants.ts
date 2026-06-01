import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Single source of truth for the Button's visual variants. Maps each variant to
 * a stable, semantic class name; the actual styles live in `src/styles/button.css`
 * and are driven by `--eui-*` design tokens. Swapping a theme means overriding
 * those CSS variables, never this file.
 */
export const buttonVariants = cva('eui-button', {
  variants: {
    variant: {
      primary: 'eui-button--primary',
      secondary: 'eui-button--secondary',
      ghost: 'eui-button--ghost',
    },
    size: {
      sm: 'eui-button--sm',
      md: 'eui-button--md',
      lg: 'eui-button--lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
