import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Tag, X } from '@phosphor-icons/react';
import { Chip } from './chip';

describe('Chip', () => {
  it('renders the label', () => {
    render(<Chip label="React" />);
    expect(screen.getByRole('button', { name: 'React' })).toBeInTheDocument();
  });

  it('applies the layout class', () => {
    render(<Chip label="React" layout="icon-left" icon={Tag} />);
    expect(screen.getByRole('button')).toHaveClass('eui-chip--icon-left');
  });

  it('applies the size class', () => {
    render(<Chip label="React" size="sm" />);
    expect(screen.getByRole('button')).toHaveClass('eui-chip--sm');
  });

  it('calls onClick when pressed', async () => {
    const onClick = vi.fn();
    render(<Chip label="React" onClick={onClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('does not fire onClick while disabled', async () => {
    const onClick = vi.fn();
    render(<Chip label="React" disabled onClick={onClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders icon on the left for icon-left layout', () => {
    const { container } = render(<Chip label="React" layout="icon-left" icon={Tag} />);
    const [iconSpan, labelSpan] = container.querySelectorAll('.eui-chip__icon, .eui-chip__label');
    expect(iconSpan).toHaveClass('eui-chip__icon');
    expect(labelSpan).toHaveClass('eui-chip__label');
  });

  it('renders icon on the right for icon-right layout', () => {
    const { container } = render(<Chip label="React" layout="icon-right" icon={X} />);
    const [labelSpan, iconSpan] = container.querySelectorAll('.eui-chip__label, .eui-chip__icon');
    expect(labelSpan).toHaveClass('eui-chip__label');
    expect(iconSpan).toHaveClass('eui-chip__icon');
  });

  it('renders no icon for text-only layout', () => {
    const { container } = render(<Chip label="React" layout="text-only" />);
    expect(container.querySelector('.eui-chip__icon')).toBeNull();
  });
});
