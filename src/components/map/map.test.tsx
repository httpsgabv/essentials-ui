import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Map as LeafletMap, type LatLngBounds } from 'leaflet';
import { describe, expect, it, vi } from 'vitest';
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

  it('fits the view to all features when fitBounds is set, without needing a center', async () => {
    const fitBoundsSpy = vi.spyOn(LeafletMap.prototype, 'fitBounds');
    const features: MapFeature[] = [
      { id: 1, position: [48.8566, 2.3522] },
      { id: 2, position: [51.5074, -0.1278] },
    ];

    render(<Map zoom={4} features={features} fitBounds />);

    await waitFor(() => expect(fitBoundsSpy).toHaveBeenCalled());
    const bounds = fitBoundsSpy.mock.calls[0][0] as LatLngBounds;
    expect(bounds.contains([48.8566, 2.3522])).toBe(true);
    expect(bounds.contains([51.5074, -0.1278])).toBe(true);

    fitBoundsSpy.mockRestore();
  });

  it('does not fit bounds when there are no features', async () => {
    const fitBoundsSpy = vi.spyOn(LeafletMap.prototype, 'fitBounds');

    render(<Map zoom={4} fitBounds />);

    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(fitBoundsSpy).not.toHaveBeenCalled();

    fitBoundsSpy.mockRestore();
  });
});
