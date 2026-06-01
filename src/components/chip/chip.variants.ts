import { cva, type VariantProps } from 'class-variance-authority';

export const chipVariants = cva('eui-chip', {
  variants: {
    /**
     * `text-only`  — label only, no icon.
     * `icon-left`  — icon rendered to the left of the label.
     * `icon-right` — icon rendered to the right of the label (e.g. a dismiss action).
     */
    layout: {
      'text-only': 'eui-chip--text-only',
      'icon-left': 'eui-chip--icon-left',
      'icon-right': 'eui-chip--icon-right',
    },
    size: {
      sm: 'eui-chip--sm',
      md: 'eui-chip--md',
    },
  },
  defaultVariants: {
    layout: 'text-only',
    size: 'md',
  },
});

export type ChipVariantProps = VariantProps<typeof chipVariants>;
