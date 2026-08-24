import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
export type PieChartColor = keyof SemanticColors;
export interface PieChartDatum {
    label: string;
    value: number;
    /** Optional semantic color; falls back to a cycled palette. */
    color?: PieChartColor;
}
export interface PieChartProps {
    /** Slices; each slice's sweep is `value / total`. */
    data: PieChartDatum[];
    /** Diameter in px (chart is square). */
    size?: number;
    /** Render a swatch + label legend beneath the pie. */
    showLegend?: boolean;
    /** Accessible one-line summary; a sensible default is generated when omitted. */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * SVG pie chart — token-bound (uses `react-native-svg`). Slice angles accumulate
 * from each value's share of the total; colors come from a semantic key or a
 * cycled palette (opacity steps down on wrap-around). Renders a `muted` "No data"
 * note when empty or when every value is zero.
 */
export declare function PieChart({ data, size, showLegend, accessibilityLabel, style, }: PieChartProps): React.ReactElement;
//# sourceMappingURL=PieChart.d.ts.map