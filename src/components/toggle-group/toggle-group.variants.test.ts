import { describe, expect, it } from 'vitest';
import { toggleGroupVariants } from './toggle-group.variants';

describe('toggleGroupVariants', () => {
  it('applies the base class and default size', () => {
    const classes = toggleGroupVariants();
    expect(classes).toContain('eui-toggle-group');
    expect(classes).toContain('eui-toggle-group--md');
  });

  it('maps explicit size to its class', () => {
    expect(toggleGroupVariants({ size: 'sm' })).toContain('eui-toggle-group--sm');
    expect(toggleGroupVariants({ size: 'lg' })).toContain('eui-toggle-group--lg');
  });

  it('does not apply other size classes when one is selected', () => {
    const classes = toggleGroupVariants({ size: 'sm' });
    expect(classes).not.toContain('eui-toggle-group--md');
    expect(classes).not.toContain('eui-toggle-group--lg');
  });
});
