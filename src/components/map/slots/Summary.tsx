import { useMemo } from 'react';
import { useMapSlot } from '../MapContext';
import type { MapFeature } from '../types';

export interface SummaryProps {
  label?: string;
  attribute?: keyof MapFeature;
  format?: (total: number) => string;
}

export function Summary({ label = 'Total', attribute = 'value', format }: SummaryProps) {
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
        across {count} feature{count === 1 ? '' : 's'}
      </p>
    </div>
  );
}
