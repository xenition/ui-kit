import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
export type LegendColor = keyof SemanticColors;
export interface LegendItem {
    label: string;
    /** Theme color key for the swatch. */
    color?: LegendColor;
    /** Opacity applied to the swatch color (for single-color series). */
    opacity?: number;
}
export interface LegendProps {
    items: LegendItem[];
    /** Stack vertically instead of wrapping in a row. */
    vertical?: boolean;
    /** Accessible one-line summary; a sensible default is generated when omitted. */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Chart legend — token-bound, View-based (no SVG). Each entry is a color swatch
 * (a theme color, optionally at reduced `opacity`) beside its `onSurface` label.
 */
export declare function Legend({ items, vertical, accessibilityLabel, style, }: LegendProps): React.ReactElement;
//# sourceMappingURL=Legend.d.ts.map