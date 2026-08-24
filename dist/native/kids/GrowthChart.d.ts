import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
export type GrowthMetric = 'height' | 'weight' | 'head' | 'other';
export interface GrowthChartProps {
    /** Series of measurements over time (bare numbers indexed on x). */
    data: number[];
    /** Which growth metric this chart plots; drives the title + icon. */
    metric?: GrowthMetric;
    /** Unit suffix for the latest-value readout, e.g. "cm" or "kg". */
    unit?: string;
    /** Optional percentile subtitle, e.g. "75th percentile". */
    percentile?: string;
    /** Line color slot. */
    color?: keyof SemanticColors;
    /** Plot height in px. */
    height?: number;
    /** Loading placeholder state. */
    loading?: boolean;
    /** Copy shown when there is no data. */
    emptyLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A child's growth curve — a titled card wrapping the shared `LineChart` with a
 * latest-value + percentile readout. Reuses the charts module rather than
 * re-plotting. Renders an explicit empty state when `data` is empty. All colors
 * are `SemanticColors` tokens — no literals.
 */
export declare function GrowthChart({ data, metric, unit, percentile, color, height, loading, emptyLabel, style, }: GrowthChartProps): React.ReactElement;
//# sourceMappingURL=GrowthChart.d.ts.map