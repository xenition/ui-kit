import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
export type AreaChartColor = keyof SemanticColors;
/** A `{ x, y }` datum or a bare number (index becomes `x`). */
export type AreaChartDatum = number | {
    x: number;
    y: number;
};
export interface AreaChartProps {
    /** Series values; bare numbers are indexed on x, or explicit `{x,y}` points. */
    data: AreaChartDatum[];
    /** Plot height in px. */
    height?: number;
    /** Plot width in px. */
    width?: number;
    /** Theme color key for the line + filled area. */
    color?: AreaChartColor;
    /** Fill opacity for the area under the line. */
    fillOpacity?: number;
    /** Stroke width in px. */
    strokeWidth?: number;
    /** Render a dot at each point. */
    showDots?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * SVG area chart — token-bound (uses `react-native-svg`). A line over a filled
 * region (semantic `color` at a low `fillOpacity`); geometry is scaled from the
 * data's own min/max. Renders a `muted` "No data" note on empty input and guards
 * zero-range series.
 */
export declare function AreaChart({ data, height, width, color, fillOpacity, strokeWidth, showDots, style, }: AreaChartProps): React.ReactElement;
//# sourceMappingURL=AreaChart.d.ts.map