import { useState } from 'react';
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
    { name: 'Ada Lovelace', role: 'Mathematician', year: 1815 },
    { name: 'Grace Hopper', role: 'Computer Scientist', year: 1906 },
    { name: 'Alan Turing', role: 'Logician', year: 1912 },
    { name: 'Katherine Johnson', role: 'Mathematician', year: 1918 },
    { name: 'Margaret Hamilton', role: 'Engineer', year: 1936 },
  ],
  columns: [
    { key: 'name', header: 'Name' },
    { key: 'role', header: 'Role' },
    { key: 'year', header: 'Born' },
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
        <h2>DataTable — sort, search, paginate, select</h2>
        <DataTable
          {...people}
          getRowId={(row) => String(row.name)}
          searchable
          searchPlaceholder="Search people…"
          pageSize={3}
          selectable
          onSelectionChange={(ids) => console.log('selected:', ids)}
        />
      </section>
    </main>
  );
}
