import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
export interface LoadPlanBarProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * A stacked capacity/utilization bar for trailer or container load planning.
 * Either pass `segments` (each a token-ramp slice) or a single `utilization`
 * value; the bar fills proportionally and flips to a warn ramp past `warnAt`.
 * Utilization is announced via the `progressbar` role + `accessibilityValue`
 * and echoed in the caption, so fullness is never color-only. No literal
 * colors — every fill is a `tokens.ramps.*` step.
 */
export declare function LoadPlanBar({ segments, utilization, caption, warnAt, loading, style, }: LoadPlanBarProps): React.ReactElement;
//# sourceMappingURL=LoadPlanBar.d.ts.map