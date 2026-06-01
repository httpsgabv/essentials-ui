import type { Meta, StoryObj } from '@storybook/react';
import { X, Tag, Star } from '@phosphor-icons/react';
import { Chip } from './chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  args: {
    label: 'Chip',
    disabled: false,
  },
  argTypes: {
    layout: { control: 'select', options: ['text-only', 'icon-left', 'icon-right'] },
    size: { control: 'select', options: ['sm', 'md'] },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const TextOnly: Story = {
  args: { layout: 'text-only', label: 'Label' },
};

export const IconLeft: Story = {
  args: { layout: 'icon-left', label: 'Tag', icon: Tag },
};

export const IconRight: Story = {
  args: { layout: 'icon-right', label: 'Dismiss', icon: X },
};

export const Small: Story = {
  args: { size: 'sm', label: 'Small' },
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled' },
};

export const AllLayouts: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Chip label="Text only" layout="text-only" />
      <Chip label="Icon left" layout="icon-left" icon={Star} />
      <Chip label="Dismiss" layout="icon-right" icon={X} />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Chip label="Small" size="sm" />
      <Chip label="Medium" size="md" />
    </div>
  ),
};
