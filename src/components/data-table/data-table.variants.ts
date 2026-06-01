import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Single source of truth for the DataTable's density variants. Maps each size
 * to a semantic class; row/header padding and font size live in
 * `src/styles/data-table.css`, driven by `--eui-*` tokens.
 */
export const dataTableVariants = cva('eui-datatable', {
  variants: {
    size: {
      sm: 'eui-datatable--sm',
      md: 'eui-datatable--md',
      lg: 'eui-datatable--lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type DataTableVariantProps = VariantProps<typeof dataTableVariants>;
