import { describe, expect, it } from 'vitest';
import { comboboxVariants } from './combobox.variants';

describe('comboboxVariants', () => {
  it('applies the default size', () => {
    const classes = comboboxVariants();
    expect(classes).toContain('eui-combobox');
    expect(classes).toContain('eui-combobox--md');
  });

  it('maps an explicit size to its class', () => {
    const classes = comboboxVariants({ size: 'sm' });
    expect(classes).toContain('eui-combobox--sm');
    expect(classes).not.toContain('eui-combobox--md');
  });
});
