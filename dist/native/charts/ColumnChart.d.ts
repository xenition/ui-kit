import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
export type ColumnChartColor = keyof SemanticColors;
export interface ColumnChartDatum {
    label: string;
    value: number;
}
export interface ColumnChartProps {
    /** Labelled values rendered as horizontal bars. */
    data: ColumnChartDatum[];
    /** Theme color key for the bars. */
    color?: ColumnChartColor;
    /** Value mapped to full bar width; defaults to the largest datum. */
    max?: number;
    /** Per-bar track height in px. */
    barHeight?: number;
    /** Show the numeric value at the end of each bar. */
    showValues?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * Horizontal bar chart — token-bound, View/flex-based (no SVG). Each row is a
 * label plus a `View` whose width flexes to `value / max`. Track uses `border`,
 * fill uses the chosen theme color.
 */
export declare function ColumnChart({ data, color, max, barHeight, showValues, style, }: ColumnChartProps): React.ReactElement;
//# sourceMappingURL=ColumnChart.d.ts.map