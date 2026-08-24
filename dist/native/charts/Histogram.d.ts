import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
export type HistogramColor = keyof SemanticColors;
export interface HistogramProps {
    /** Bin counts; each becomes an adjacent vertical bar. */
    bins: number[];
    /** Plot height in px. */
    height?: number;
    /** Theme color key for the bars. */
    color?: HistogramColor;
    /** Count mapped to full height; defaults to the largest bin. */
    max?: number;
    /** Accessible one-line summary; a sensible default is generated when omitted. */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Frequency histogram — token-bound, View/flex-based (no SVG). Like a bar chart
 * but bars sit flush (gapless) to read as a distribution. Bar height is
 * `count / max`; a `muted` baseline stands in for the axis.
 */
export declare function Histogram({ bins, height, color, max, accessibilityLabel, style, }: HistogramProps): React.ReactElement;
//# sourceMappingURL=Histogram.d.ts.map