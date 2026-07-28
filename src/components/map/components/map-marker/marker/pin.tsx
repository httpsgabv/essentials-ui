import { MapPin } from "@phosphor-icons/react"
import type { CSSProperties } from "react"

// Must match the `.map-marker-pin` icon size in map.css.
export const PIN_SIZE = 32;

export type PinMarkerProps = {
  color: string
}

export function PinMarker({ color }: PinMarkerProps) {
  return (
    <span
      className="map-marker-pin"
      style={{ '--map-marker-color': color } as CSSProperties}
    >
      <MapPin size={PIN_SIZE} weight="fill" />
    </span>
  )
}