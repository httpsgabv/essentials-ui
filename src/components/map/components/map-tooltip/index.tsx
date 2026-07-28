import type { MapFeatureTooltipItem } from '../../map.contract';
import { MapTooltip } from './tooltip';
import { humanizeValue } from '@/core';

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
 * Resolves a row's `value` to display text, honoring its own `humanize`/`monetary`/
 * `currency`, then appends `suffix` (if any) — the suffix is appended regardless of
 * whether the value was humanized, plain-formatted, or already a string.
 */
function resolveTooltipValue(item: MapFeatureTooltipItem): string {
  const base =
    typeof item.value === 'number'
      ? item.humanize
        ? humanizeValue(item.value, { monetary: item.monetary, currency: item.currency })
        : item.value.toLocaleString(undefined, { maximumFractionDigits: 2 })
      : item.value;

  return item.suffix ? `${base} ${item.suffix}` : base;
}

/**
 * Wraps `MapTooltip`: decides between the structured, grouped tooltip and the
 * plain `label`/`value` fallback so callers (e.g. `Map`) don't need to.
 */
export function MapFeatureTooltip({ label, value, items }: MapFeatureTooltipProps) {
  if (items?.length) {
    const resolvedItems = items.map((item) => ({ ...item, value: resolveTooltipValue(item) }));
    return <MapTooltip title={label ?? ''} items={resolvedItems} />;
  }

  return (
    <>
      {label}
      {value !== undefined ? ` — ${value}` : ''}
    </>
  );
}
