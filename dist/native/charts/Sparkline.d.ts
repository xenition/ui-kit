import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
export type SparklineColor = keyof SemanticColors;
export interface SparklineProps {
    /** Trend values, approximated as a row of thin vertical bars. */
    data: number[];
    /** Plot height in px. */
    height?: number;
    /** Theme color key for the bars. */
    color?: SparklineColor;
    /** Value mapped to full height; defaults to the largest datum. */
    max?: number;
    style?: StyleProp<ViewStyle>;
}
/**
 * Compact trend indicator approximated with thin View-based bars (no SVG — the
 * kit has no `react-native-svg`). Each datum is a hairline-gapped bar whose
 * height tracks its value, reading as a sparkline at a glance.
 */
export declare function Sparkline({ data, height, color, max, style, }: SparklineProps): React.ReactElement;
//# sourceMappingURL=Sparkline.d.ts.map