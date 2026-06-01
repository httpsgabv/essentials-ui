import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  it('renders the label from its contract', () => {
    render(<Button label="Save" />);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('applies the variant class', () => {
    render(<Button label="Go" variant="ghost" />);
    expect(screen.getByRole('button')).toHaveClass('eui-button--ghost');
  });

  it('calls onClick when pressed', async () => {
    const onClick = vi.fn();
    render(<Button label="Go" onClick={onClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('does not fire onClick while disabled', async () => {
    const onClick = vi.fn();
    render(<Button label="Go" disabled onClick={onClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
