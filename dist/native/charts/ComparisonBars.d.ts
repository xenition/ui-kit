import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
export type ComparisonBarsColor = keyof SemanticColors;
export interface ComparisonBarsGroup {
    label: string;
    /** Two (or more) series values compared side-by-side within the group. */
    values: number[];
}
export interface ComparisonBarsProps {
    data: ComparisonBarsGroup[];
    /** One theme color key per series; extras vary by opacity. */
    colors?: ComparisonBarsColor[];
    /** Value mapped to full bar height; defaults to the largest datum. */
    max?: number;
    /** Plot height in px. */
    height?: number;
    /** Accessible one-line summary; a sensible default is generated when omitted. */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Grouped comparison bars — token-bound, View/flex-based (no SVG). Renders each
 * group's series as adjacent vertical bars; distinguish series by cycling the
 * provided theme `colors` (and, beyond that, by descending opacity). Group
 * labels use `onSurface`; a `muted` baseline stands in for the axis.
 */
export declare function ComparisonBars({ data, colors: seriesColors, max, height, accessibilityLabel, style, }: ComparisonBarsProps): React.ReactElement;
//# sourceMappingURL=ComparisonBars.d.ts.map