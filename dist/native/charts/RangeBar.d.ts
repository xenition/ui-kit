import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
export type RangeBarColor = keyof SemanticColors;
export interface RangeBarProps {
    /** Start of the highlighted range (in domain units). */
    start: number;
    /** End of the highlighted range (in domain units). */
    end: number;
    /** Domain minimum (track left edge). */
    domainMin?: number;
    /** Domain maximum (track right edge). */
    domainMax?: number;
    /** Theme color key for the range segment. */
    color?: RangeBarColor;
    /** Track height in px. */
    height?: number;
    /** Accessible one-line summary; a sensible default is generated when omitted. */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single-range indicator — token-bound, View-based (no SVG). Draws a `border`
 * track with one filled segment spanning `[start, end]` positioned by its share
 * of `[domainMin, domainMax]`. Good for min–max / percentile bands.
 */
export declare function RangeBar({ start, end, domainMin, domainMax, color, height, accessibilityLabel, style, }: RangeBarProps): React.ReactElement;
//# sourceMappingURL=RangeBar.d.ts.map