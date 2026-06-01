import type { NumericFormat } from './data-table.contract';

/**
 * Format a numeric value according to the column's {@link NumericFormat} config.
 * Uses `Intl.NumberFormat` so locale-specific separators are handled correctly.
 */
export function formatNumeric(value: number, format: NumericFormat): string {
  const { groupDigits = false, prefix = '', suffix = '', decimalPlaces } = format;

  const formatted = new Intl.NumberFormat(undefined, {
    useGrouping: groupDigits,
    ...(decimalPlaces !== undefined && {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }),
  }).format(value);

  return `${prefix}${formatted}${suffix}`;
}
