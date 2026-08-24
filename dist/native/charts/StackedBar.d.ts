import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
export type StackedBarColor = keyof SemanticColors;
export interface StackedBarSegment {
    value: number;
    /** Theme color key for this segment. */
    color?: StackedBarColor;
    /** Opacity applied to the color (for series that share one theme color). */
    opacity?: number;
    label?: string;
}
export interface StackedBarProps {
    /** Segments laid end-to-end; each width is its share of the total. */
    segments: StackedBarSegment[];
    /** Bar height in px. */
    height?: number;
    /** Accessible one-line summary; a sensible default is generated when omitted. */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Single horizontal stacked bar — token-bound, View-based (no SVG). Each
 * segment is a `View` flexed by its share of the sum; distinguish series by
 * varying the `opacity` of one theme color rather than inventing hex values.
 */
export declare function StackedBar({ segments, height, accessibilityLabel, style, }: StackedBarProps): React.ReactElement;
//# sourceMappingURL=StackedBar.d.ts.map