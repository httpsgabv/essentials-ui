import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NotePencil, Trash } from '@phosphor-icons/react';
import { DataTable } from './data-table';
import type { DataTableColumn } from './data-table.contract';

interface Employee {
  id: string;
  name: string;
  department: string;
  salary: number;
  yearsActive: number;
}

const EMPLOYEES: Employee[] = [
  { id: '1', name: 'Alice Johnson', department: 'Engineering', salary: 95000, yearsActive: 4 },
  { id: '2', name: 'Bob Smith', department: 'Design', salary: 82000, yearsActive: 2 },
  { id: '3', name: 'Carol White', department: 'Engineering', salary: 110000, yearsActive: 7 },
  { id: '4', name: 'David Lee', department: 'Marketing', salary: 74000, yearsActive: 1 },
  { id: '5', name: 'Eva Martinez', department: 'Engineering', salary: 99000, yearsActive: 5 },
  { id: '6', name: 'Frank Brown', department: 'HR', salary: 68000, yearsActive: 3 },
  { id: '7', name: 'Grace Kim', department: 'Design', salary: 88000, yearsActive: 6 },
  { id: '8', name: 'Hank Wilson', department: 'Marketing', salary: 71000, yearsActive: 2 },
];

const COLUMNS: DataTableColumn<Employee>[] = [
  { id: 'name', header: 'Name', value: (r) => r.name },
  { id: 'department', header: 'Department', value: (r) => r.department },
  {
    id: 'salary',
    header: 'Salary',
    value: (r) => r.salary,
    numeric: true,
    format: { groupDigits: true, prefix: '$' },
  },
  { id: 'yearsActive', header: 'Years', value: (r) => r.yearsActive, numeric: true },
];

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const Basic: Story = {
  render: () => <DataTable columns={COLUMNS} rows={EMPLOYEES} getRowId={(r) => r.id} />,
};

export const Searchable: Story = {
  render: () => (
    <DataTable
      columns={COLUMNS}
      rows={EMPLOYEES}
      getRowId={(r) => r.id}
      searchable
      searchPlaceholder="Search employees…"
    />
  ),
};

export const Paginated: Story = {
  render: () => (
    <DataTable columns={COLUMNS} rows={EMPLOYEES} getRowId={(r) => r.id} pageSize={3} />
  ),
};

export const WithTotals: Story = {
  render: () => (
    <DataTable columns={COLUMNS} rows={EMPLOYEES} getRowId={(r) => r.id} totals="bottom" />
  ),
};

export const Selectable: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <div>
        <DataTable
          columns={COLUMNS}
          rows={EMPLOYEES}
          getRowId={(r) => r.id}
          selectable
          onSelectionChange={setSelected}
        />
        <p style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
          Selected IDs: {selected.length ? selected.join(', ') : '(none)'}
        </p>
      </div>
    );
  },
};

export const WithActionColumn: Story = {
  render: () => (
    <DataTable
      columns={COLUMNS}
      rows={EMPLOYEES}
      getRowId={(r) => r.id}
      actionColumn={{
        actions: [
          { key: 'edit', icon: NotePencil, onClick: (r) => alert(`Edit: ${r.name}`) },
          { key: 'delete', icon: Trash, onClick: (r) => alert(`Delete: ${r.name}`) },
        ],
      }}
    />
  ),
};

export const FullFeatured: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <DataTable
        columns={COLUMNS}
        rows={EMPLOYEES}
        getRowId={(r) => r.id}
        searchable
        searchPlaceholder="Search…"
        pageSize={4}
        selectable
        onSelectionChange={setSelected}
        totals="bottom"
        actionColumn={{
          actions: [
            { key: 'edit', icon: NotePencil, label: 'Edit', onClick: (r) => alert(`Edit: ${r.name}`) },
          ],
        }}
      />
    );
  },
};

export const Empty: Story = {
  render: () => (
    <DataTable
      columns={COLUMNS}
      rows={[]}
      getRowId={(r) => r.id}
      emptyMessage="No employees found."
    />
  ),
};
