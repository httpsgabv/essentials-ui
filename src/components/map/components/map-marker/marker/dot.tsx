import type { CSSProperties } from "react";

export const DOT_SIZE = 44;

export type DotMarkerProps = {
  color: string
}

export function DotMarker({ color }: DotMarkerProps) {
  return (
    <div className="map-marker" style={{ '--map-marker-color': color } as CSSProperties}>
      <span className="map-marker-halo" />
      <span className="map-marker-outer" />
      <span className="map-marker-middle" />
      <span className="map-marker-inner" />
    </div>
  )
}