import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { DataTable } from './data-table';
import type { DataTableColumn } from './data-table.contract';

interface Person {
  id: string;
  name: string;
  age: number;
}

const people: Person[] = [
  { id: '1', name: 'Ada', age: 36 },
  { id: '2', name: 'Grace', age: 45 },
  { id: '3', name: 'Alan', age: 41 },
];

const columns: DataTableColumn<Person>[] = [
  { id: 'name', header: 'Name', value: (row) => row.name },
  { id: 'age', header: 'Age', value: (row) => row.age },
];

const getRowId = (row: Person) => row.id;

/** Body rows (excludes the header row), as their text content. */
function bodyRowText() {
  return screen
    .getAllByRole('row')
    .slice(1)
    .map((row) => row.textContent ?? '');
}

describe('DataTable', () => {
  it('renders headers and a row per record', () => {
    render(<DataTable columns={columns} rows={people} getRowId={getRowId} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Ada')).toBeInTheDocument();
    // 1 header row + 3 body rows.
    expect(screen.getAllByRole('row')).toHaveLength(4);
  });

  it('uses a custom cell renderer when provided', () => {
    const withCell: DataTableColumn<Person>[] = [
      { id: 'name', header: 'Name', value: (row) => row.name },
      { id: 'age', header: 'Age', value: (row) => row.age, cell: (row) => `${row.age} yrs` },
    ];
    render(<DataTable columns={withCell} rows={people} getRowId={getRowId} />);
    expect(screen.getByText('36 yrs')).toBeInTheDocument();
  });

  it('sorts by a column when its header is clicked', async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} rows={people} getRowId={getRowId} />);

    await user.click(screen.getByRole('button', { name: /Name/ }));
    // Ascending: Ada, Alan, Grace.
    let rows = bodyRowText();
    expect(rows[0]).toContain('Ada');
    expect(rows[1]).toContain('Alan');

    await user.click(screen.getByRole('button', { name: /Name/ }));
    // Descending: Grace, Alan, Ada.
    rows = bodyRowText();
    expect(rows[0]).toContain('Grace');
  });

  it('filters across columns via the search box', async () => {
    const user = userEvent.setup();
    render(<DataTable searchable columns={columns} rows={people} getRowId={getRowId} />);

    await user.type(screen.getByRole('searchbox', { name: 'Search table' }), 'grace');
    expect(screen.getByText('Grace')).toBeInTheDocument();
    expect(screen.queryByText('Ada')).not.toBeInTheDocument();
  });

  it('paginates when pageSize is set', async () => {
    const user = userEvent.setup();
    render(<DataTable pageSize={2} columns={columns} rows={people} getRowId={getRowId} />);

    expect(screen.getAllByRole('row')).toHaveLength(3); // header + 2
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Alan')).toBeInTheDocument();
    expect(screen.queryByText('Ada')).not.toBeInTheDocument();
  });

  it('reports selected row ids', async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();
    render(
      <DataTable
        selectable
        columns={columns}
        rows={people}
        getRowId={getRowId}
        onSelectionChange={onSelectionChange}
      />,
    );

    const checkboxes = screen.getAllByRole('checkbox');
    // [0] = select-all, [1..] = one per row.
    await user.click(checkboxes[1]);
    expect(onSelectionChange).toHaveBeenLastCalledWith(['1']);

    await user.click(checkboxes[0]);
    expect(onSelectionChange).toHaveBeenLastCalledWith(['1', '2', '3']);
  });

  it('shows the empty message when there are no rows', () => {
    render(<DataTable columns={columns} rows={[]} emptyMessage="Nothing here" />);
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('marks a selected row with data-selected', async () => {
    const user = userEvent.setup();
    render(<DataTable selectable columns={columns} rows={people} getRowId={getRowId} />);

    await user.click(screen.getAllByRole('checkbox')[1]);
    const firstBodyRow = screen.getAllByRole('row')[1];
    expect(firstBodyRow).toHaveAttribute('data-selected');
    expect(within(firstBodyRow).getByText('Ada')).toBeInTheDocument();
  });
});
