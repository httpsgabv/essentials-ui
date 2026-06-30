import type { Meta, StoryObj } from '@storybook/react';
import { AlignLeft, AlignCenterHorizontal, AlignRight, TextB, TextItalic, TextUnderline } from '@phosphor-icons/react';
import { ToggleGroup } from './toggle-group';

const alignOptions = [
  { value: 'left', label: 'Left', icon: AlignLeft },
  { value: 'center', label: 'Center', icon: AlignCenterHorizontal },
  { value: 'right', label: 'Right', icon: AlignRight },
];

const formatOptions = [
  { value: 'bold', label: 'Bold', icon: TextB },
  { value: 'italic', label: 'Italic', icon: TextItalic },
  { value: 'underline', label: 'Underline', icon: TextUnderline },
];

const textOptions = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
];

const meta: Meta<typeof ToggleGroup> = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  args: {
    options: alignOptions,
    disabled: false,
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    onValueChange: { action: 'valueChanged' },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Single: Story = {
  args: { options: textOptions, value: 'week' },
};

export const Multiple: Story = {
  args: { options: formatOptions, multiple: true },
};

export const WithIcons: Story = {
  args: { options: alignOptions, value: 'left' },
};

export const Vertical: Story = {
  args: { options: textOptions, orientation: 'vertical' },
};

export const Small: Story = {
  args: { options: textOptions, size: 'sm' },
};

export const Large: Story = {
  args: { options: textOptions, size: 'lg' },
};

export const Disabled: Story = {
  args: { options: textOptions, disabled: true },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <ToggleGroup options={textOptions} size="sm" />
      <ToggleGroup options={textOptions} size="md" />
      <ToggleGroup options={textOptions} size="lg" />
    </div>
  ),
};
