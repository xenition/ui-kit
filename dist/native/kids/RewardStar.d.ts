import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
export type RewardStarSize = 'sm' | 'md' | 'lg';
export interface RewardStarProps {
    /** Number of filled stars. */
    value: number;
    /** Total stars. */
    max?: number;
    /** Star glyph size from the type scale. */
    size?: RewardStarSize;
    /** Optional caption below the stars, e.g. "Great job!". */
    label?: string;
    /** Theme color slot for filled stars. */
    color?: keyof SemanticColors;
    /** When true the stars are display-only (no press handling). */
    readOnly?: boolean;
    /** Fires with the new star count (1..max) when a star is tapped. */
    onReward?: (next: number) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A tappable star-reward control: a row of star glyphs where the first `value`
 * are filled. Tapping the Nth star fires `onReward(N)` — the reward gesture.
 * Filled state is conveyed by a solid vs. outline glyph plus the a11y label
 * (never color alone). Filled color is a `SemanticColors` slot; no literals.
 */
export declare function RewardStar({ value, max, size, label, color, readOnly, onReward, style, }: RewardStarProps): React.ReactElement;
//# sourceMappingURL=RewardStar.d.ts.map