import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Combobox } from './combobox';
import type { ComboboxOption } from './combobox.contract';

const fruits: ComboboxOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry', disabled: true },
];

describe('Combobox', () => {
  it('renders the input with placeholder', () => {
    render(<Combobox options={fruits} placeholder="Search fruit" />);
    expect(screen.getByPlaceholderText('Search fruit')).toBeInTheDocument();
  });

  it('applies the size class to the field wrapper', () => {
    render(<Combobox options={fruits} size="lg" placeholder="Search" />);
    const field = screen.getByPlaceholderText('Search').closest('.eui-combobox');
    expect(field).toHaveClass('eui-combobox', 'eui-combobox--lg');
  });

  it('shows the selected option label (string value -> label)', () => {
    render(<Combobox options={fruits} value="banana" />);
    expect(screen.getByRole('combobox')).toHaveValue('Banana');
  });

  it('opens the list and reports the chosen value', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Combobox options={fruits} placeholder="Search" onValueChange={onValueChange} />);

    await user.click(screen.getByLabelText('Toggle options'));
    await user.click(await screen.findByRole('option', { name: 'Banana' }));

    expect(onValueChange).toHaveBeenCalledWith('banana');
  });

  describe('multiple', () => {
    it('renders a chip per selected value', () => {
      render(<Combobox multiple options={fruits} value={['apple', 'banana']} />);
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
    });

    it('removes a chip and reports the remaining values', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(
        <Combobox
          multiple
          options={fruits}
          value={['apple', 'banana']}
          onValueChange={onValueChange}
        />,
      );

      await user.click(screen.getByLabelText('Remove Apple'));
      expect(onValueChange).toHaveBeenCalledWith(['banana']);
    });

    it('adds a selection to the array', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(
        <Combobox multiple options={fruits} value={['apple']} onValueChange={onValueChange} />,
      );

      await user.click(screen.getByLabelText('Toggle options'));
      await user.click(await screen.findByRole('option', { name: 'Banana' }));

      expect(onValueChange).toHaveBeenCalledWith(['apple', 'banana']);
    });
  });
});
