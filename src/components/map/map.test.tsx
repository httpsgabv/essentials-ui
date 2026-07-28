import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Map } from './map';
import type { MapFeature } from './map.contract';

describe('Map', () => {
  it('mounts and unmounts cleanly', () => {
    const { unmount } = render(<Map center={[0, 0]} zoom={2} />);
    expect(() => unmount()).not.toThrow();
  });

  it('renders slot content', () => {
    render(<Map center={[0, 0]} zoom={2} topLeft={<span>Caption</span>} />);
    expect(screen.getByText('Caption')).toBeInTheDocument();
  });

  it('shows the structured tooltip on click and hides it on outside click', () => {
    const features: MapFeature[] = [
      {
        id: 1,
        position: [0, 0],
        label: '51-VACARIA 0%',
        tooltip: [
          { label: 'Capacidade estática', value: '12.000 Ton', group: 'estoque' },
          { label: 'Estoque físico', value: '0 Ton', group: 'estoque' },
          { label: 'Meta Receb.', value: '5.250 Ton', group: 'recebimento' },
          { label: 'Recebido', value: '5.287 Ton (101%)', group: 'recebimento' },
        ],
      },
    ];
    const { container } = render(<Map center={[0, 0]} zoom={2} features={features} />);

    expect(screen.queryByText('51-VACARIA 0%')).not.toBeInTheDocument();

    fireEvent.click(container.querySelector('.leaflet-marker-icon')!);

    expect(screen.getByText('51-VACARIA 0%')).toBeInTheDocument();
    expect(screen.getByText('Capacidade estática')).toBeInTheDocument();
    expect(screen.getByText('12.000 Ton')).toBeInTheDocument();
    expect(screen.getByText('Recebido')).toBeInTheDocument();
    expect(screen.getByText('5.287 Ton (101%)')).toBeInTheDocument();

    fireEvent.click(container.querySelector('.leaflet-container')!);

    expect(screen.queryByText('51-VACARIA 0%')).not.toBeInTheDocument();
  });
});
