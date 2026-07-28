import type { MapFeatureTooltipItem } from '../../map.contract';
import { MapTooltip } from './tooltip';

export interface MapFeatureTooltipProps {
  /** Feature label. Used as the structured tooltip's title, or as the
   *  plain-text fallback when there are no structured `items`. */
  label?: string;
  /** Feature value. Appended to the plain-text fallback when there are no
   *  structured `items`. */
  value?: number;
  /** Structured tooltip rows. When present, renders the grouped `MapTooltip`;
   *  otherwise falls back to plain `label`/`value` text. */
  items?: MapFeatureTooltipItem[];
}

/**
 * Wraps `MapTooltip`: decides between the structured, grouped tooltip and the
 * plain `label`/`value` fallback so callers (e.g. `Map`) don't need to.
 */
export function MapFeatureTooltip({ label, value, items }: MapFeatureTooltipProps) {
  if (items?.length) {
    return <MapTooltip title={label ?? ''} items={items} />;
  }

  return (
    <>
      {label}
      {value !== undefined ? ` — ${value}` : ''}
    </>
  );
}
