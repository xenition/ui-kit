import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
export type DonutChartColor = keyof SemanticColors;
export interface DonutChartDatum {
    label: string;
    value: number;
    /** Optional semantic color; falls back to a cycled palette. */
    color?: DonutChartColor;
}
export interface DonutChartProps {
    /** Ring segments; each segment's sweep is `value / total`. */
    data: DonutChartDatum[];
    /** Outer diameter in px (chart is square). */
    size?: number;
    /** Ring thickness in px. */
    thickness?: number;
    /** Optional text drawn in the hole (e.g. a total). */
    centerLabel?: string;
    /** Render a swatch + label legend beneath the donut. */
    showLegend?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * SVG donut chart — token-bound (uses `react-native-svg`). Like `PieChart` but
 * each segment is an annular sector between an inner and outer radius, leaving a
 * hole for an optional `centerLabel`. Colors are semantic keys or a cycled
 * palette. Renders a `muted` "No data" note when empty or all-zero.
 */
export declare function DonutChart({ data, size, thickness, centerLabel, showLegend, style, }: DonutChartProps): React.ReactElement;
//# sourceMappingURL=DonutChart.d.ts.map