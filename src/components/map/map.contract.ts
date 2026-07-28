import type { LatLngExpression } from 'leaflet';
import type { MapMarkerVariant } from './components/map-marker';

export interface MapFeatureTooltipItem {
  /** Row label, e.g. "Capacidade estática". */
  label: string;
  /** Pre-formatted row value, e.g. "12.000 Ton" or "5.287 Ton (101%)". */
  value: string;
  /** Optional group key; consecutive rows sharing a group are visually clustered,
   *  with a divider before the next group. Ungrouped rows render as one block. */
  group?: string;
}

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
  /** Optional marker shape: `'dot'` (default) is the layered-rings bubble;
   *  `'pin'` is a classic map-pin/place icon. */
  markerVariant?: MapMarkerVariant;
  /** Optional structured rows shown below the label in the marker's tooltip. */
  tooltip?: MapFeatureTooltipItem[];
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
