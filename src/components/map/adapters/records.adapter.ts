import type { Adapter } from '@/core';
import type { LatLngExpression } from 'leaflet';
import type { MapContract, MapFeature } from '../map.contract';

export interface GeoRecord {
  id: string | number;
  latitude: number;
  longitude: number;
  label?: string;
  category?: string;
  value?: number;
  color?: string;
}

export interface GeoRecordsSource {
  records: GeoRecord[];
  center?: LatLngExpression;
  zoom?: number;
}

export const recordsToMap: Adapter<GeoRecordsSource, MapContract> = (source) => ({
  features: source.records.map(
    (record): MapFeature => ({
      id: record.id,
      position: [record.latitude, record.longitude],
      label: record.label,
      category: record.category,
      value: record.value,
      color: record.color,
    }),
  ),
  center: source.center,
  zoom: source.zoom,
});
