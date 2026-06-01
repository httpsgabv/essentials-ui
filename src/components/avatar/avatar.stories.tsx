import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: {
    name: 'John Doe',
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Initials: Story = {
  args: { name: 'John Doe' },
};

export const ExplicitInitials: Story = {
  args: { name: 'John Doe', initials: 'JD' },
};

export const WithImage: Story = {
  args: {
    name: 'Jane Smith',
    imageUrl: 'https://i.pravatar.cc/150?img=47',
  },
};

export const BrokenImage: Story = {
  args: {
    name: 'Fallback User',
    imageUrl: 'https://example.com/non-existent.jpg',
  },
};

export const Small: Story = {
  args: { name: 'Small Avatar', size: 'sm' },
};

export const Large: Story = {
  args: { name: 'Large Avatar', size: 'lg' },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar name="Alice Small" size="sm" />
      <Avatar name="Bob Medium" size="md" />
      <Avatar name="Carol Large" size="lg" />
    </div>
  ),
};
