import { NotePencil, Eye, Trash } from '@phosphor-icons/react';
import { DataTable, recordsToDataTable } from '@/index';

const people = recordsToDataTable({
  records: [
    { name: 'Ada Lovelace', role: 'Mathematician', year: 1815, salary: 92000 },
    { name: 'Grace Hopper', role: 'Computer Scientist', year: 1906, salary: 118000 },
    { name: 'Alan Turing', role: 'Logician', year: 1912, salary: 105000 },
    { name: 'Katherine Johnson', role: 'Mathematician', year: 1918, salary: 87500 },
    { name: 'Margaret Hamilton', role: 'Engineer', year: 1936, salary: 134000 },
    { name: 'Linus Torvalds', role: 'Engineer', year: 1969, salary: 210000 },
    { name: 'Barbara Liskov', role: 'Computer Scientist', year: 1939, salary: 96000 },
    { name: 'Donald Knuth', role: 'Logician', year: 1938, salary: 145000 },
  ],
  columns: [
    { key: 'name', header: 'Name' },
    { key: 'role', header: 'Role' },
    { key: 'year', header: 'Born' },
    {
      key: 'salary',
      header: 'Salary',
      numeric: true,
      format: { prefix: '$', groupDigits: true, decimalPlaces: 2 },
    },
  ],
});

export function DataTablePage() {
  return (
    <main style={{ padding: 24, display: 'grid', gap: 24 }}>
      <section style={{ display: 'grid', gap: 8 }}>
        <h2>DataTable — sort, search, paginate, select, totals (bottom)</h2>
        <DataTable
          {...people}
          getRowId={(row) => String(row.name)}
          searchable
          searchPlaceholder="Search people…"
          pageSize={4}
          selectable
          totals="bottom"
          onSelectionChange={(ids) => console.log('selected:', ids)}
        />
      </section>

      <section style={{ display: 'grid', gap: 8 }}>
        <h2>DataTable — totals both + sticky header</h2>
        <div style={{ '--eui-datatable-scroll-height': '14rem' } as React.CSSProperties}>
          <DataTable
            {...people}
            getRowId={(row) => String(row.name)}
            searchable
            searchPlaceholder="Search people…"
            totals="both"
            stickyHeader
          />
        </div>
      </section>

      <section style={{ display: 'grid', gap: 8 }}>
        <h2>DataTable — infinite scroll + totals + sticky header</h2>
        <DataTable
          {...people}
          getRowId={(row) => String(row.name)}
          searchable
          searchPlaceholder="Search people…"
          totals="bottom"
          stickyHeader
          infiniteScroll={3}
        />
      </section>

      <section style={{ display: 'grid', gap: 8 }}>
        <h2>DataTable — action column (end, icon + text + icon-only)</h2>
        <DataTable
          {...people}
          getRowId={(row) => String(row.name)}
          actionColumn={{
            position: 'end',
            actions: [
              { key: 'view', icon: Eye, label: 'View', onClick: (row) => alert(`View: ${row.name}`) },
              { key: 'edit', icon: NotePencil, onClick: (row) => alert(`Edit: ${row.name}`) },
              {
                key: 'delete',
                icon: Trash,
                onClick: (row) => alert(`Delete: ${row.name}`),
                disabled: (row) => Number(row.year) < 1900,
              },
            ],
          }}
        />
      </section>

      <section style={{ display: 'grid', gap: 8 }}>
        <h2>DataTable — action column (start, text-only)</h2>
        <DataTable
          {...people}
          getRowId={(row) => String(row.name)}
          selectable
          actionColumn={{
            header: 'Actions',
            position: 'start',
            actions: [{ key: 'select', label: 'Pick', onClick: (row) => alert(`Picked: ${row.name}`) }],
          }}
        />
      </section>
    </main>
  );
}
