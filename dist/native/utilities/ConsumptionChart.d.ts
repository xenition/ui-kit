import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type UtilityKind } from './internal/status';
export type { UtilityKind };
/** One period's consumption. */
export interface ConsumptionPoint {
    /** Axis label (e.g. "Jan", "W1"). */
    label: string;
    /** Consumption for the period, in `unit`s. */
    value: number;
}
export interface ConsumptionChartProps {
    /** Utility line — drives the title glyph, label, and default unit. */
    kind: UtilityKind;
    /** Ordered per-period consumption. */
    data: ConsumptionPoint[];
    /** Chart family — reuses the token-bound `BarChart` or `LineChart` (default `bar`). */
    variant?: 'bar' | 'line';
    /** Metered unit override (defaults to the utility's canonical unit). */
    unit?: string;
    /** Decimal places for the printed total (default `0`). */
    decimals?: number;
    /** Title override (defaults to "<Utility> usage"). */
    title?: string;
    /** Plot height in px (default `140`). */
    height?: number;
    /** Loading skeleton flag — renders a placeholder instead of the chart. */
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A consumption-over-time chart card that **reuses** the token-bound `BarChart` /
 * `LineChart` primitives rather than drawing its own geometry. It derives the
 * period total from the data (via `formatUsage`, so it never renders `NaN`),
 * renders an accessible summary, and degrades to an inline empty message when
 * there are no points (guarded indexing throughout). Every color traces to a
 * token — the charts express series via theme color keys, never a literal.
 */
export declare function ConsumptionChart({ kind, data, variant, unit, decimals, title, height, loading, style, }: ConsumptionChartProps): React.ReactElement;
//# sourceMappingURL=ConsumptionChart.d.ts.map