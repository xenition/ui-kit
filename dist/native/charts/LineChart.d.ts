import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
export type LineChartColor = keyof SemanticColors;
/** A `{ x, y }` datum or a bare number (index becomes `x`). */
export type LineChartDatum = number | {
    x: number;
    y: number;
};
export interface LineChartProps {
    /** Series values; bare numbers are indexed on x, or explicit `{x,y}` points. */
    data: LineChartDatum[];
    /** Plot height in px. */
    height?: number;
    /** Plot width in px. */
    width?: number;
    /** Theme color key for the line + dots. */
    color?: LineChartColor;
    /** Render a dot at each point. */
    showDots?: boolean;
    /** Stroke width in px. */
    strokeWidth?: number;
    style?: StyleProp<ViewStyle>;
}
/**
 * SVG line chart — token-bound (uses `react-native-svg`). Points are scaled to
 * the plot box from the data's own min/max on each axis; the stroke and dots use
 * a semantic theme color, never a literal hex. Renders a `muted` "No data" note
 * on empty input and guards against zero-range (single point / flat) series.
 */
export declare function LineChart({ data, height, width, color, showDots, strokeWidth, style, }: LineChartProps): React.ReactElement;
//# sourceMappingURL=LineChart.d.ts.map