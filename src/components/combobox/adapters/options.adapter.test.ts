import { describe, expect, it } from 'vitest';
import { rowsToCombobox, type OptionRow } from './options.adapter';

describe('rowsToCombobox', () => {
  it('maps list rows into combobox options, stringifying ids', () => {
    const rows: OptionRow[] = [
      { id: 1, name: 'Apple' },
      { id: 2, name: 'Banana', disabled: true },
    ];
    expect(rowsToCombobox(rows)).toEqual({
      options: [
        { value: '1', label: 'Apple', disabled: undefined },
        { value: '2', label: 'Banana', disabled: true },
      ],
    });
  });
});
