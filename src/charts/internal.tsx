import * as React from 'react';

/**
 * Chart color tokens — single-word semantic slots that resolve to `--xen-*`
 * CSS custom properties. Charts never emit literal colors; every fill/stroke
 * references one of these vars so a theme swap restyles the visualization live.
 */
export type ChartColor = 'primary' | 'accent' | 'success' | 'warn' | 'danger' | 'muted';

/** CSS custom-property reference for a chart color token. */
export const colorVar = (c: ChartColor): string => `var(--xen-${c})`;

/**
 * Series color cycle (token vars only). Multi-series charts index into this and
 * additionally vary opacity, so no literal colors are ever introduced.
 */
export const SERIES: readonly ChartColor[] = ['primary', 'accent', 'success', 'warn', 'danger'];

/** Token var for the i-th series, wrapping the cycle and guarding the index. */
export const seriesColor = (i: number): string => {
  const n = SERIES.length;
  const key = SERIES[((i % n) + n) % n] ?? 'primary';
  return colorVar(key);
};

/**
 * Shared empty-state — rendered by every chart when handed no data. Uses the
 * `text-muted` token class (no literal color).
 */
export function ChartEmpty({ label = 'No data' }: { label?: string }): React.ReactElement {
  return <span className="text-muted text-sm">{label}</span>;
}

/** Clamp a ratio into `[0, 1]`, treating NaN as 0. */
export const clamp01 = (n: number): number => (Number.isFinite(n) ? Math.min(Math.max(n, 0), 1) : 0);

/** Largest finite value in a list, floored at 1 so it is safe as a divisor. */
export const safeMax = (values: number[], override?: number): number =>
  Math.max(override ?? (values.length > 0 ? Math.max(...values) : 1), 1);
