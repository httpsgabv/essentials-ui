import { useMemo } from 'react';
import { useMapSlot } from '../context';
import type { MapFeature } from '../map.contract';

export interface SummaryProps {
  label?: string;
  attribute?: keyof MapFeature;
  format?: (total: number) => string;
  subtitle?: string;
}

export function Summary({ label = 'Total', attribute = 'value', format, subtitle }: SummaryProps) {
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
