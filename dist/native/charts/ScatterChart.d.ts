import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
export type ScatterChartColor = keyof SemanticColors;
export interface ScatterPoint {
    x: number;
    y: number;
}
export interface ScatterChartProps {
    /** Points plotted against their own x/y min-max range. */
    points: ScatterPoint[];
    /** Plot height in px. */
    height?: number;
    /** Plot width in px. */
    width?: number;
    /** Theme color key for the dots. */
    color?: ScatterChartColor;
    /** Dot radius in px. */
    dotRadius?: number;
    /** Draw `border` axis lines along the left + bottom edges. */
    showAxes?: boolean;
    /** Accessible one-line summary; a sensible default is generated when omitted. */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * SVG scatter plot — token-bound (uses `react-native-svg`). Each point is a
 * semantic-`color` circle scaled from the data's own x/y min/max into the plot
 * box; zero-range axes are guarded. Optional `border` axis lines. Renders a
 * `muted` "No data" note on empty input.
 */
export declare function ScatterChart({ points, height, width, color, dotRadius, showAxes, accessibilityLabel, style, }: ScatterChartProps): React.ReactElement;
//# sourceMappingURL=ScatterChart.d.ts.map