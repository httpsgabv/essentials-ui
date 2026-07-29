import type { Adapter } from '@/core';
import type { LatLngExpression } from 'leaflet';
import type { MapMarkerVariant } from '../components/map-marker';
import type { MapContract, MapFeature, MapFeatureTooltipItem } from '../map.contract';

export interface GeoRecord {
  id: string | number;
  latitude: number;
  longitude: number;
  label?: string;
  category?: string;
  value?: number;
  color?: string;
  markerVariant?: MapMarkerVariant;
  tooltip?: MapFeatureTooltipItem[];
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
      markerVariant: record.markerVariant,
      tooltip: record.tooltip,
    }),
  ),
  center: source.center,
  zoom: source.zoom,
});
