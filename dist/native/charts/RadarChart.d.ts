import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
export type RadarChartColor = keyof SemanticColors;
export interface RadarChartProps {
    /** Axis labels; also fixes the number of spokes. */
    axes: string[];
    /** One number per axis, per series. Extra/short rows are padded with 0. */
    series: number[][];
    /** Diameter in px (chart is square). */
    size?: number;
    /** Value mapped to the outer ring; defaults to the largest datum. */
    max?: number;
    /** Number of concentric grid rings. */
    rings?: number;
    style?: StyleProp<ViewStyle>;
}
/**
 * SVG radar / spider chart — token-bound (uses `react-native-svg`). Draws `border`
 * grid rings and spokes, then one filled `Polygon` per series (semantic color,
 * low fill opacity). Values are normalized to `max`. Renders a `muted` "No data"
 * note when there are no axes or no series.
 */
export declare function RadarChart({ axes, series, size, max, rings, style, }: RadarChartProps): React.ReactElement;
//# sourceMappingURL=RadarChart.d.ts.map