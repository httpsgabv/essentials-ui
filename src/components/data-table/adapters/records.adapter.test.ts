import { describe, expect, it } from 'vitest';
import { recordsToDataTable } from './records.adapter';

describe('recordsToDataTable', () => {
  it('maps flat records and a column spec into the table contract', () => {
    const result = recordsToDataTable({
      records: [
        { name: 'Ada', age: 36 },
        { name: 'Grace', age: 45 },
      ],
      columns: [
        { key: 'name', header: 'Name' },
        { key: 'age', header: 'Age' },
      ],
    });

    expect(result.rows).toHaveLength(2);
    expect(result.columns.map((c) => c.id)).toEqual(['name', 'age']);
    expect(result.columns.map((c) => c.header)).toEqual(['Name', 'Age']);
    expect(result.columns[0].value({ name: 'Ada', age: 36 })).toBe('Ada');
    expect(result.columns[1].value({ name: 'Ada', age: 36 })).toBe(36);
  });
});
