import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
export type ProgressRingColor = keyof SemanticColors;
export interface ProgressRingProps {
    /** Current value; clamped to `[0, max]`. */
    value: number;
    /** Full-circle value. */
    max?: number;
    /** Outer diameter in px. */
    size?: number;
    /** Ring stroke width in px. */
    strokeWidth?: number;
    /** Theme color key for the progress arc. */
    color?: ProgressRingColor;
    /** Center text; defaults to the rounded percentage when `showPercent`. */
    label?: string;
    /** Show `NN%` in the center when no explicit `label` is given. */
    showPercent?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * SVG progress ring — token-bound (uses `react-native-svg`). A `border` track
 * circle plus a semantic-`color` arc drawn with the stroke-dasharray technique
 * (rotated so it starts at 12 o'clock). `max` guards divide-by-zero. Renders a
 * `muted` "No data" note only when `max <= 0`.
 */
export declare function ProgressRing({ value, max, size, strokeWidth, color, label, showPercent, style, }: ProgressRingProps): React.ReactElement;
//# sourceMappingURL=ProgressRing.d.ts.map