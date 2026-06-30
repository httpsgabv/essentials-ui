import { describe, expect, it } from 'vitest';
import { recordsToMap } from './records.adapter';

describe('recordsToMap', () => {
  it('maps flat geo-records and a viewport into the map contract', () => {
    const result = recordsToMap({
      records: [
        { id: 1, latitude: 48.8566, longitude: 2.3522, label: 'Paris', value: 2161, color: '#38bdf8' },
        { id: 2, latitude: 51.5074, longitude: -0.1278, label: 'London', value: 3975, color: '#f472b6' },
      ],
      center: [50, 10],
      zoom: 4,
    });

    expect(result.center).toEqual([50, 10]);
    expect(result.zoom).toBe(4);
    expect(result.features).toEqual([
      { id: 1, position: [48.8566, 2.3522], label: 'Paris', category: undefined, value: 2161, color: '#38bdf8' },
      { id: 2, position: [51.5074, -0.1278], label: 'London', category: undefined, value: 3975, color: '#f472b6' },
    ]);
  });

  it('leaves optional fields undefined when the source omits them', () => {
    const result = recordsToMap({
      records: [{ id: 'a', latitude: 0, longitude: 0 }],
    });

    expect(result.center).toBeUndefined();
    expect(result.zoom).toBeUndefined();
    expect(result.features).toEqual([
      { id: 'a', position: [0, 0], label: undefined, category: undefined, value: undefined, color: undefined },
    ]);
  });
});
