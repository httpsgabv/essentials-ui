import { describe, expect, it } from 'vitest';
import { buttonVariants } from './button.variants';

describe('buttonVariants', () => {
  it('applies the default variant and size', () => {
    const classes = buttonVariants();
    expect(classes).toContain('eui-button');
    expect(classes).toContain('eui-button--primary');
    expect(classes).toContain('eui-button--md');
  });

  it('maps explicit variant and size to their classes', () => {
    const classes = buttonVariants({ variant: 'ghost', size: 'lg' });
    expect(classes).toContain('eui-button--ghost');
    expect(classes).toContain('eui-button--lg');
    expect(classes).not.toContain('eui-button--primary');
  });
});
