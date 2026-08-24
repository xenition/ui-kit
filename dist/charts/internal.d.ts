import * as React from 'react';
/**
 * Chart color tokens — single-word semantic slots that resolve to `--xen-*`
 * CSS custom properties. Charts never emit literal colors; every fill/stroke
 * references one of these vars so a theme swap restyles the visualization live.
 */
export type ChartColor = 'primary' | 'accent' | 'success' | 'warn' | 'danger' | 'muted';
/** CSS custom-property reference for a chart color token. */
export declare const colorVar: (c: ChartColor) => string;
/**
 * Series color cycle (token vars only). Multi-series charts index into this and
 * additionally vary opacity, so no literal colors are ever introduced.
 */
export declare const SERIES: readonly ChartColor[];
/** Token var for the i-th series, wrapping the cycle and guarding the index. */
export declare const seriesColor: (i: number) => string;
/**
 * Shared empty-state — rendered by every chart when handed no data. Uses the
 * `text-muted` token class (no literal color).
 */
export declare function ChartEmpty({ label }: {
    label?: string;
}): React.ReactElement;
/** Clamp a ratio into `[0, 1]`, treating NaN as 0. */
export declare const clamp01: (n: number) => number;
/** Largest finite value in a list, floored at 1 so it is safe as a divisor. */
export declare const safeMax: (values: number[], override?: number) => number;
//# sourceMappingURL=internal.d.ts.map