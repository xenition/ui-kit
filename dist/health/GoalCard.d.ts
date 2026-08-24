import * as React from 'react';
import { type HealthColor } from './internal';
export type GoalCardColor = HealthColor;
export interface GoalCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
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
}
/**
 * A goal-progress card: title, an emphasized `value / target` readout, and a
 * token-bound progress bar. When the target is met the bar and readout switch to
 * the `success` tone and a "Goal met" note appears. Guards `target <= 0`. Web
 * parity of the native `GoalCard`; token-only colors.
 */
export declare const GoalCard: React.ForwardRefExoticComponent<GoalCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=GoalCard.d.ts.map