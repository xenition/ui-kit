import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
export type GoalCardColor = keyof SemanticColors;
export interface GoalCardProps {
    /** Goal title, e.g. "Weekly steps". */
    title: string;
    /** Current progress value. */
    value: number;
    /** Target value the goal is measured against. */
    target: number;
    /** Unit label, e.g. "steps", "km". */
    unit?: string;
    /** Progress-bar color; auto-switches to `success` when the goal is met. */
    color?: GoalCardColor;
    /** Optional icon/emoji slot. */
    icon?: React.ReactNode;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A goal-progress card: title, an emphasized `value / target` readout, and a
 * {@link MiniBar}. When the target is met the bar and readout switch to the
 * `success` tone and a "Goal met" note appears. Guards `target <= 0`. Token-only.
 */
export declare function GoalCard({ title, value, target, unit, color, icon, onPress, style, }: GoalCardProps): React.ReactElement;
//# sourceMappingURL=GoalCard.d.ts.map