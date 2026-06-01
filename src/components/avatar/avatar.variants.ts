import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Single source of truth for the Avatar's visual variants. Maps each size to a
 * stable, semantic class name; styles live in `src/styles/avatar.css`, driven by
 * `--eui-*` design tokens.
 */
export const avatarVariants = cva('eui-avatar', {
  variants: {
    size: {
      sm: 'eui-avatar--sm',
      md: 'eui-avatar--md',
      lg: 'eui-avatar--lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type AvatarVariantProps = VariantProps<typeof avatarVariants>;
