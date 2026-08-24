import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
export type GaugeChartColor = keyof SemanticColors;
export interface GaugeChartProps {
    /** Current value; clamped to `[0, max]`. */
    value: number;
    /** Full-scale value mapped to the right end of the arc. */
    max?: number;
    /** Width in px (height is roughly half). */
    size?: number;
    /** Arc thickness in px. */
    thickness?: number;
    /** Theme color key for the filled value arc + needle. */
    color?: GaugeChartColor;
    /** Show the value text under the needle. */
    showValue?: boolean;
    /** Accessible one-line summary; a sensible default is generated when omitted. */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * SVG gauge — token-bound (uses `react-native-svg`). A 180° semicircular track
 * (`border`) with a value arc filled in a semantic `color` and a needle pointing
 * at the clamped value. `max` guards divide-by-zero. Renders a `muted` "No data"
 * note only when `max <= 0`.
 */
export declare function GaugeChart({ value, max, size, thickness, color, showValue, accessibilityLabel, style, }: GaugeChartProps): React.ReactElement;
//# sourceMappingURL=GaugeChart.d.ts.map