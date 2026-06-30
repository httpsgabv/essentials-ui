import { useState } from 'react';
import { Combobox, rowsToCombobox } from '@/index';

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

export function ComboboxPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedMany, setSelectedMany] = useState<string[]>(['apple']);

  return (
    <main style={{ padding: 24, display: 'grid', gap: 24 }}>
      <section style={{ display: 'grid', gap: 8 }}>
        <h2>Combobox</h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Combobox {...fruit} value={selected} onValueChange={setSelected} />
          <span style={{ color: '#64748b' }}>selected: {selected ?? '—'}</span>
        </div>
        <h2>Combobox — multiple</h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <Combobox {...fruit} multiple value={selectedMany} onValueChange={setSelectedMany} />
          <span style={{ color: '#64748b' }}>selected: {selectedMany.join(', ') || '—'}</span>
        </div>
      </section>
    </main>
  );
}
