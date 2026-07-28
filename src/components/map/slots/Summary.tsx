import { useMemo } from 'react';
import { useMapSlot } from '../context';
import type { MapFeature } from '../map.contract';
import { humanizeValue } from '@/core';

export interface SummaryProps {
  label?: string;
  attribute?: keyof MapFeature;
  format?: (total: number) => string;
  subtitle?: string;
  /** Humanize the total (e.g. `1_500_000 -> "1.5 mi"`) instead of a plain locale number. */
  humanize?: boolean;
  /** Whether the total represents money; when true with `humanize`, `currency` is prefixed. */
  monetary?: boolean;
  /** Currency symbol/code to prefix, e.g. `'R$'`. Only used when `monetary` is true. */
  currency?: string;
}

export function Summary({
  label = 'Total',
  attribute = 'value',
  format,
  subtitle,
  humanize = false,
  monetary = false,
  currency,
}: SummaryProps) {
  const { features } = useMapSlot();

  const { total, count } = useMemo(() => {
    let total = 0;
    let count = 0;
    for (const f of features) {
      const raw = f[attribute];
      if (typeof raw === 'number' && Number.isFinite(raw)) {
        total += raw;
        count += 1;
      }
    }
    return { total, count };
  }, [features, attribute]);

  const display = format
    ? format(total)
    : humanize
      ? humanizeValue(total, { monetary, currency })
      : total.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="slot-panel">
      <p className="slot-summary-label">{label}</p>
      <p className="slot-summary-value">{display}</p>
      <p className="slot-summary-meta">
        {subtitle ?? `across ${count} feature${count === 1 ? '' : 's'}`}
      </p>
    </div>
  );
}
