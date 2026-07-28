export interface HumanizeValueOptions {
  /** Whether the value represents money; when true, `currency` is prefixed onto the result. */
  monetary?: boolean;
  /** Currency symbol/code to prefix, e.g. `'R$'` or `'USD'`. Only used when `monetary` is true. */
  currency?: string;
  /** Max decimal places kept on the scaled number once a suffix tier applies. Defaults to 1. */
  decimalPlaces?: number;
}

interface HumanizeTier {
  threshold: number;
  divisor: number;
  suffix: string;
}

const TIERS: HumanizeTier[] = [
  { threshold: 1_000_000_000_000, divisor: 1_000_000_000_000, suffix: 'tri' },
  { threshold: 1_000_000_000, divisor: 1_000_000_000, suffix: 'bi' },
  { threshold: 1_000_000, divisor: 1_000_000, suffix: 'mi' },
  { threshold: 100_000, divisor: 1_000, suffix: 'mil' },
];

/**
 * Humanize a number for display: values at or above 100.000 are scaled down and
 * suffixed (`mil` / `mi` / `bi` / `tri`), e.g. `1_500_000 -> "1.5 mi"`. Values
 * below that are formatted as-is with locale grouping. Pass `monetary` + `currency`
 * to prefix a currency symbol onto the result.
 */
export function humanizeValue(value: number, options: HumanizeValueOptions = {}): string {
  const { monetary = false, currency = '', decimalPlaces = 1 } = options;
  const prefix = monetary && currency ? `${currency} ` : '';

  const tier = TIERS.find((t) => Math.abs(value) >= t.threshold);
  if (!tier) {
    return `${prefix}${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  }

  const scaled = (value / tier.divisor).toLocaleString(undefined, {
    maximumFractionDigits: decimalPlaces,
  });
  return `${prefix}${scaled} ${tier.suffix}`;
}
