import { cx } from 'class-variance-authority';

/**
 * Join class names, dropping falsy values. Thin alias over CVA's `cx`, used to
 * merge a component's variant classes with a consumer-supplied `className`.
 *
 * @example cn(buttonVariants({ variant }), className)
 */
export const cn = cx;
