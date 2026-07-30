import type { LatLngExpression } from 'leaflet';
import type { MapMarkerVariant } from './components/map-marker';

export interface MapFeatureTooltipItem {
  /** Row label, e.g. "Capacidade estática". */
  label: string;
  /** Row value: either a pre-formatted string (e.g. "12.000 Ton" or "5.287 Ton
   *  (101%)"), or a raw number — combine with `humanize`/`monetary`/`currency`
   *  to have the tooltip format it. */
  value: string | number;
  /** Optional group key; consecutive rows sharing a group are visually clustered,
   *  with a divider before the next group. Ungrouped rows render as one block. */
  group?: string;
  /** Humanize a numeric `value` (e.g. `1_500_000 -> "1.5 mi"`) instead of a plain
   *  locale number. No effect when `value` is already a pre-formatted string. */
  humanize?: boolean;
  /** Whether a numeric `value` represents money; when true with `humanize`, `currency`
   *  is prefixed. No effect when `value` is already a pre-formatted string. */
  monetary?: boolean;
  /** Currency symbol/code to prefix, e.g. `'R$'`. Only used when `monetary` is true. */
  currency?: string;
  /** Unit text appended after the resolved value, e.g. `'Ton'`. Appended verbatim
   *  regardless of whether `humanize` applies — lets a numeric `value` carry its own
   *  unit instead of baking it into a pre-formatted string. */
  suffix?: string;
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
  /** Initial map center. Defaults to `[0, 0]`. Ignored once `fitBounds` adjusts
   *  the view, so it can be omitted when `fitBounds` is enabled. */
  center?: LatLngExpression;
  /** Initial zoom level. Defaults to `2`. Ignored once `fitBounds` adjusts the view. */
  zoom?: number;
  /** Minimum allowed zoom level. Defaults to `2`. */
  minZoom?: number;
  /** Maximum allowed zoom level. Defaults to `18`. */
  maxZoom?: number;
  /** When true, the map automatically fits its viewport to contain all
   *  `features` (via Leaflet's `fitBounds`) instead of using `center`/`zoom`.
   *  Re-fits whenever `features` changes. Has no effect with fewer than one
   *  feature. Defaults to `false`. */
  fitBounds?: boolean;
  /** fit bounds box padding */
  padding?: number
}
