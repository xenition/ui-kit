import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
export type ProgressBarsColor = keyof SemanticColors;
export interface ProgressBarsItem {
    label: string;
    value: number;
    /** Per-item color override. */
    color?: ProgressBarsColor;
}
export interface ProgressBarsProps {
    items: ProgressBarsItem[];
    /** Value mapped to a full bar; defaults to the largest item. */
    max?: number;
    /** Default theme color key for the bars. */
    color?: ProgressBarsColor;
    /** Show the numeric value beside each label. */
    showValues?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * Stack of labelled progress bars — token-bound, View-based (no SVG). Each row
 * is a label + value over a {@link MiniBar} sized to `value / max`.
 */
export declare function ProgressBars({ items, max, color, showValues, style, }: ProgressBarsProps): React.ReactElement;
//# sourceMappingURL=ProgressBars.d.ts.map