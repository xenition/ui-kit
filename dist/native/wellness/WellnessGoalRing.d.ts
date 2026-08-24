import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
export type WellnessGoalColor = keyof SemanticColors;
export interface WellnessGoalRingProps {
    /** Metric label, e.g. "Mindful minutes". */
    label: string;
    /** Current value. */
    value: number;
    /** Target value; `<= 0` renders an empty "No goal set" state. */
    goal: number;
    /** Unit suffix, e.g. "min". */
    unit?: string;
    /** Ring color (semantic slot). Default `'primary'`. */
    color?: WellnessGoalColor;
    /** Ring diameter in px. Default 132. */
    size?: number;
    /** Show a "✓ Goal met" note once value reaches the goal. Default true. */
    showMetBadge?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A wellness goal dial built on the shared `ProgressRing` chart: a labeled ring
 * showing progress toward a daily target, with the value / goal beneath and a
 * success badge once met. A non-positive `goal` degrades to a "No goal set"
 * note (state, not color alone). Token-only colors — the ring resolves its
 * stroke from a `SemanticColors` key.
 */
export declare function WellnessGoalRing({ label, value, goal, unit, color, size, showMetBadge, style, }: WellnessGoalRingProps): React.ReactElement;
//# sourceMappingURL=WellnessGoalRing.d.ts.map