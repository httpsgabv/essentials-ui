import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Single source of truth for the Combobox's visual variants. Applied to the
 * input field wrapper; styles live in `src/styles/combobox.css`, driven by
 * `--eui-*` design tokens.
 */
export const comboboxVariants = cva('eui-combobox', {
  variants: {
    size: {
      sm: 'eui-combobox--sm',
      md: 'eui-combobox--md',
      lg: 'eui-combobox--lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type ComboboxVariantProps = VariantProps<typeof comboboxVariants>;
