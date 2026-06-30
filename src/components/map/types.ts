import type { LatLngExpression } from 'leaflet';

export interface MapFeature {
  id: string | number;
  position: LatLngExpression;
  label?: string;
  category?: string;
  value?: number;
  color?: string;
}
