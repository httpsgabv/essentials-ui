import type { LatLngExpression } from 'leaflet';

export interface MapFeature {
  /** Stable id, used for React keying. */
  id: string | number;
  /** Marker location. */
  position: LatLngExpression;
  /** Optional label shown in the marker's tooltip. */
  label?: string;
  /** Optional category, reserved for future grouping/legend behaviour. */
  category?: string;
  /** Optional numeric value, shown in the tooltip alongside the label. */
  value?: number;
  /** Optional marker color override (CSS color string). Defaults to the theme accent. */
  color?: string;
}

export interface MapContract {
  /** Points to plot. Defaults to an empty list. */
  features?: MapFeature[];
  /** Initial map center. Defaults to `[0, 0]`. */
  center?: LatLngExpression;
  /** Initial zoom level. Defaults to `2`. */
  zoom?: number;
  /** Minimum allowed zoom level. Defaults to `2`. */
  minZoom?: number;
  /** Maximum allowed zoom level. Defaults to `18`. */
  maxZoom?: number;
}
