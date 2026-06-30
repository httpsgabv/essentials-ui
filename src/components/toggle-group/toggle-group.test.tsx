import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ToggleGroup } from './toggle-group';

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
];

describe('ToggleGroup', () => {
  it('renders all options as buttons', () => {
    render(<ToggleGroup options={options} />);
    expect(screen.getAllByRole('button')).toHaveLength(3);
    expect(screen.getByRole('button', { name: 'Option A' })).toBeInTheDocument();
  });

  it('marks the selected value as pressed (single mode)', () => {
    render(<ToggleGroup options={options} value="b" />);
    expect(screen.getByRole('button', { name: 'Option B' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Option A' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('calls onValueChange with the clicked value (single mode)', async () => {
    const onValueChange = vi.fn();
    render(<ToggleGroup options={options} onValueChange={onValueChange} />);
    await userEvent.click(screen.getByRole('button', { name: 'Option A' }));
    expect(onValueChange).toHaveBeenCalledWith('a');
  });

  it('calls onValueChange with null when the pressed item is toggled off (single mode)', async () => {
    const onValueChange = vi.fn();
    render(<ToggleGroup options={options} value="a" onValueChange={onValueChange} />);
    await userEvent.click(screen.getByRole('button', { name: 'Option A' }));
    expect(onValueChange).toHaveBeenCalledWith(null);
  });

  it('marks multiple values as pressed in multiple mode', () => {
    render(<ToggleGroup options={options} multiple value={['a', 'c']} />);
    expect(screen.getByRole('button', { name: 'Option A' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Option C' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Option B' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('calls onValueChange with the updated array (multiple mode)', async () => {
    const onValueChange = vi.fn();
    render(<ToggleGroup options={options} multiple onValueChange={onValueChange} />);
    await userEvent.click(screen.getByRole('button', { name: 'Option B' }));
    expect(onValueChange).toHaveBeenCalledWith(['b']);
  });

  it('disables all items when the group is disabled', () => {
    render(<ToggleGroup options={options} disabled />);
    screen.getAllByRole('button').forEach((btn) => expect(btn).toBeDisabled());
  });

  it('disables a single option when its disabled flag is set', () => {
    const opts = [
      { value: 'a', label: 'A', disabled: true },
      { value: 'b', label: 'B' },
    ];
    render(<ToggleGroup options={opts} />);
    expect(screen.getByRole('button', { name: 'A' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'B' })).not.toBeDisabled();
  });

  it('applies the size class to the group container', () => {
    const { container } = render(<ToggleGroup options={options} size="sm" />);
    expect(container.firstChild).toHaveClass('eui-toggle-group--sm');
  });

  it('applies the default size class', () => {
    const { container } = render(<ToggleGroup options={options} />);
    expect(container.firstChild).toHaveClass('eui-toggle-group--md');
  });

  it('does not fire onValueChange when a disabled item is clicked', async () => {
    const onValueChange = vi.fn();
    const opts = [{ value: 'a', label: 'A', disabled: true }];
    render(<ToggleGroup options={opts} onValueChange={onValueChange} />);
    await userEvent.click(screen.getByRole('button', { name: 'A' }));
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
