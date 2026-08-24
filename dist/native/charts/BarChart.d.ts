import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
export type ChartColor = keyof SemanticColors;
export interface BarChartProps {
    /** Bar values; each becomes a vertical bar sized by value / max. */
    data: number[];
    /** Optional labels rendered under each bar. */
    labels?: string[];
    /** Plot height in px. */
    height?: number;
    /** Theme color key for the bars. */
    color?: ChartColor;
    /** Value mapped to full bar height; defaults to the largest datum. */
    max?: number;
    style?: StyleProp<ViewStyle>;
}
/**
 * Vertical bar chart — token-bound, View/flex-based (no SVG). Each datum is a
 * `View` whose height is `(value / max) * height`. A `muted` baseline stands in
 * for the axis; labels use `onSurface`.
 */
export declare function BarChart({ data, labels, height, color, max, style, }: BarChartProps): React.ReactElement;
//# sourceMappingURL=BarChart.d.ts.map