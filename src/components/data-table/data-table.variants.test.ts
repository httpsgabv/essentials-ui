import { describe, expect, it } from 'vitest';
import { dataTableVariants } from './data-table.variants';

describe('dataTableVariants', () => {
  it('applies the default size', () => {
    const classes = dataTableVariants();
    expect(classes).toContain('eui-datatable');
    expect(classes).toContain('eui-datatable--md');
  });

  it('maps an explicit size to its class', () => {
    const classes = dataTableVariants({ size: 'sm' });
    expect(classes).toContain('eui-datatable--sm');
    expect(classes).not.toContain('eui-datatable--md');
  });
});
