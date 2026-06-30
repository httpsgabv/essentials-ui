import { cva, type VariantProps } from 'class-variance-authority';

export const toggleGroupVariants = cva('eui-toggle-group', {
  variants: {
    size: {
      sm: 'eui-toggle-group--sm',
      md: 'eui-toggle-group--md',
      lg: 'eui-toggle-group--lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type ToggleGroupVariantProps = VariantProps<typeof toggleGroupVariants>;
