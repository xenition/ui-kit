import * as React from 'react';
export interface LoadSegment {
    /** Stable key. */
    id: string;
    /** Short label for the segment (e.g. a stop, a pallet group). */
    label?: string;
    /** Portion of total capacity this segment occupies, 0–100. */
    pct: number;
    /** Ramp emphasis for the segment fill (all token-derived). */
    emphasis?: 'strong' | 'medium' | 'soft';
}
export interface LoadPlanBarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Capacity segments, drawn left→right; total is clamped to 100%. */
    segments?: LoadSegment[];
    /** When no segments are given, a single utilization percentage 0–100. */
    utilization?: number;
    /** Capacity caption (e.g. `18 / 24 pallets`). */
    caption?: string;
    /** Warn styling once utilization crosses this threshold (default 90). */
    warnAt?: number;
    /** Muted placeholder while the plan is computing. */
    loading?: boolean;
}
/**
 * A stacked capacity/utilization bar for trailer or container load planning.
 * Either pass `segments` (each a token-ramp slice) or a single `utilization`
 * value; the bar fills proportionally and flips to a warn ramp past `warnAt`.
 * Utilization is announced via the `progressbar` role + `aria-valuenow` and
 * echoed in the caption, so fullness is never color-only. No literal colors —
 * every fill is a token ramp class. Web parity of the native `LoadPlanBar`.
 */
export declare const LoadPlanBar: React.ForwardRefExoticComponent<LoadPlanBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LoadPlanBar.d.ts.map