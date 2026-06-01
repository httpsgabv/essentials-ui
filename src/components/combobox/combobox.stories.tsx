import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Combobox } from './combobox';
import type { ComboboxOption } from './combobox.contract';

const FRUITS: ComboboxOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date', disabled: true },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
];

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  args: {
    options: FRUITS,
    placeholder: 'Search fruit…',
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

export const Single: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <div style={{ width: 280 }}>
        <Combobox {...args} multiple={false} value={value} onValueChange={setValue} />
        <p style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
          Selected: {value ?? '(none)'}
        </p>
      </div>
    );
  },
};

export const SinglePreselected: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>('banana');
    return (
      <div style={{ width: 280 }}>
        <Combobox {...args} multiple={false} value={value} onValueChange={setValue} />
      </div>
    );
  },
};

export const Multiple: Story = {
  render: (args) => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div style={{ width: 320 }}>
        <Combobox {...args} multiple value={value} onValueChange={setValue} />
        <p style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
          Selected: {value.length ? value.join(', ') : '(none)'}
        </p>
      </div>
    );
  },
};

export const MultiplePreselected: Story = {
  render: (args) => {
    const [value, setValue] = useState<string[]>(['apple', 'grape']);
    return (
      <div style={{ width: 320 }}>
        <Combobox {...args} multiple value={value} onValueChange={setValue} />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Combobox {...args} multiple={false} value="apple" />
    </div>
  ),
};

export const SmallSize: Story = {
  args: { size: 'sm' },
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <div style={{ width: 240 }}>
        <Combobox {...args} multiple={false} value={value} onValueChange={setValue} />
      </div>
    );
  },
};
