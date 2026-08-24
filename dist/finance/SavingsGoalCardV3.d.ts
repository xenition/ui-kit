import * as React from 'react';
import type { SavingsGoalCardProps } from './SavingsGoalCard';
/** Same public contract as {@link SavingsGoalCard} — a drop-in alternate design. */
export type SavingsGoalCardV3Props = SavingsGoalCardProps;
/**
 * SavingsGoalCard, redesigned (v3): a **thin milestone bar**. No ring — a slim
 * horizontal track (tinted with the goal color) fills to the saved percentage,
 * notched at the 25 / 50 / 75% milestones, with the title and percent on the
 * header row and the saved / target + "to go" caption beneath. A compact,
 * list-friendly form distinct at a glance from the base/v2 rings. Same props.
 */
export declare const SavingsGoalCardV3: React.ForwardRefExoticComponent<SavingsGoalCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SavingsGoalCardV3.d.ts.map