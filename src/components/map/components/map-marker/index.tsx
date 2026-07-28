import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Marker } from 'react-leaflet';
import { divIcon, type LatLngExpression, type Marker as LeafletMarker } from 'leaflet';
import { PIN_SIZE, PinMarker } from './marker/pin';
import { DOT_SIZE, DotMarker } from './marker/dot';

export type MapMarkerVariant = 'dot' | 'pin';

// Must match the `.map-marker-halo` diameter in map.css — this is the icon's
// hit/paint area, so it needs to fit the widest (hover) ring.
const DEFAULT_COLOR = '#38bdf8';

export interface MapMarkerProps {
  /** Marker location. */
  center: LatLngExpression;
  /** Marker color. Defaults to the map's default accent. */
  color?: string;
  /** Marker shape: `'dot'` (default) is the layered-rings bubble; `'pin'` is a
   *  classic map-pin/place icon. */
  variant?: MapMarkerVariant;
  /** Rendered inside the marker's Leaflet context, e.g. a `Tooltip`. */
  children?: ReactNode;
}

/**
 * A map item's marker, in one of two shapes:
 * - `'dot'` (default): a white outer ring, a lighter tint of `color` in the
 *   middle, and the full `color` in the center; a fourth halo ring (same tint
 *   as the middle ring) appears around it on hover.
 * - `'pin'`: a classic map-pin/place icon in `color`, anchored at its tip.
 *
 * Built from plain elements rather than stacked `CircleMarker`s: Leaflet's SVG
 * renderer appends each path to the end of its container as it's added to the
 * map, so a ring that mounts later (e.g. only once hovered) always ends up on
 * top regardless of DOM/JSX order — there's no reliable way to keep a
 * conditionally-shown ring underneath the others. A `Marker` with a blank
 * `divIcon` is used purely as the positioned, interactive container (it tracks
 * the map like any marker and gives us hover via plain CSS); the marker's
 * content is portaled into its icon element so normal DOM stacking (and
 * `:hover`) applies.
 */
export function MapMarker({
  center,
  color = DEFAULT_COLOR,
  variant = 'dot',
  children,
}: MapMarkerProps) {
  const icon = useMemo(() => {
    const size = variant === 'pin' ? PIN_SIZE : DOT_SIZE;
    return divIcon({
      className: 'map-marker-icon',
      iconSize: [size, size],
      // The dot is centered on `center`; the pin's tip points at it.
      iconAnchor: variant === 'pin' ? [size / 2, size] : [size / 2, size / 2],
      popupAnchor: variant === 'pin' ? [0, -size] : [0, -size / 2],
    });
  }, [variant]);
  const [markerEl, setMarkerEl] = useState<HTMLElement | null>(null);
  const markerRef = useCallback(
    (instance: LeafletMarker | null) => setMarkerEl(instance?.getElement() ?? null),
    [],
  );

  return (
    <Marker position={center} icon={icon} ref={markerRef}>
      {children}
      {markerEl &&
        createPortal(
          variant === 'pin' ? (
            <PinMarker color={color} />
          ) : (
            <DotMarker color={color} />
          ),
          markerEl,
        )}
    </Marker>
  );
}
