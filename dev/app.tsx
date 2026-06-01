import { useState } from 'react';
import { NotePencil, Eye, Trash } from '@phosphor-icons/react';
import {
  actionToButton,
  Avatar,
  Button,
  Combobox,
  DataTable,
  recordsToDataTable,
  rowsToCombobox,
  userToAvatar,
  type User,
} from '@/index';

// Local playground for eyeballing components during development. Not shipped:
// `dev/` is excluded from the library build (see vite.config.ts lib entry).
const ada: User = { fullName: 'Ada Lovelace' };

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
    { key: 'salary', header: 'Salary', numeric: true, format: { prefix: '$', groupDigits: true, decimalPlaces: 2 } },
  ],
});

const fruit = rowsToCombobox([
  { id: 'apple', name: 'Apple' },
  { id: 'banana', name: 'Banana' },
  { id: 'cherry', name: 'Cherry' },
  { id: 'date', name: 'Date', disabled: true },
  { id: 'elderberry', name: 'Elderberry' },
  { id: 'fig', name: 'Fig' },
  { id: 'grape', name: 'Grape' },
  { id: 'honeydew', name: 'Honeydew' },
  { id: 'kiwi', name: 'Kiwi' },
  { id: 'lemon', name: 'Lemon' },
  { id: 'mango', name: 'Mango' },
  { id: 'nectarine', name: 'Nectarine' },
  { id: 'orange', name: 'Orange' },
  { id: 'pear', name: 'Pear' },
]);

export function App() {
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedMany, setSelectedMany] = useState<string[]>(['apple']);

  return (
    <main style={{ fontFamily: 'system-ui', padding: 24, display: 'grid', gap: 24 }}>
      <h1>essentials-ui playground</h1>

      <section style={{ display: 'grid', gap: 8 }}>
        <h2>Button — variants</h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Button label="Primary" variant="primary" onClick={() => alert('clicked')} />
          <Button label="Secondary" variant="secondary" />
          <Button label="Ghost" variant="ghost" />
          <Button label="Disabled" disabled />
          {/* Fed through an adapter — the component never sees the source shape. */}
          <Button {...actionToButton({ text: 'From adapter', enabled: true })} variant="primary" />
        </div>
        <h2>Button — sizes</h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Button label="Small" size="sm" />
          <Button label="Medium" size="md" />
          <Button label="Large" size="lg" />
        </div>
      </section>

      <section style={{ display: 'grid', gap: 8 }}>
        <h2>Avatar — sizes</h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Avatar {...userToAvatar(ada)} size="sm" />
          <Avatar name="Grace Hopper" size="md" />
          <Avatar name="Alan Turing" imageUrl="https://i.pravatar.cc/96" size="lg" />
        </div>
      </section>

      <section style={{ display: 'grid', gap: 8 }}>
        <h2>Combobox</h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {/* Options come from an adapter; value/onValueChange are string-based. */}
          <Combobox {...fruit} value={selected} onValueChange={setSelected} />
          <span style={{ color: '#64748b' }}>selected: {selected ?? '—'}</span>
        </div>
        <h2>Combobox — multiple</h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <Combobox {...fruit} multiple value={selectedMany} onValueChange={setSelectedMany} />
          <span style={{ color: '#64748b' }}>selected: {selectedMany.join(', ') || '—'}</span>
        </div>
      </section>

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
              {
                key: 'view',
                icon: Eye,
                label: 'View',
                onClick: (row) => alert(`View: ${row.name}`),
              },
              {
                key: 'edit',
                icon: NotePencil,
                onClick: (row) => alert(`Edit: ${row.name}`),
              },
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
            actions: [
              {
                key: 'select',
                label: 'Pick',
                onClick: (row) => alert(`Picked: ${row.name}`),
              },
            ],
          }}
        />
      </section>
    </main>
  );
}
