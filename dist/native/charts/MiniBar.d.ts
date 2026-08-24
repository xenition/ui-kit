import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
export type MiniBarColor = keyof SemanticColors;
export interface MiniBarProps {
    /** Current value. */
    value: number;
    /** Value mapped to a full-width fill. */
    max?: number;
    /** Theme color key for the fill. */
    color?: MiniBarColor;
    /** Track/fill height in px. */
    height?: number;
    /** Accessible one-line summary; a sensible default is generated when omitted. */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single thin progress-style bar — token-bound, View-based (no SVG). The fill
 * width is `value / max`; the track uses `border`. Handy inline next to a stat.
 */
export declare function MiniBar({ value, max, color, height, accessibilityLabel, style, }: MiniBarProps): React.ReactElement;
//# sourceMappingURL=MiniBar.d.ts.map