import * as React from 'react';
import type { SavingsGoalCardProps } from './SavingsGoalCard';
/** Same public contract as {@link SavingsGoalCard} — a drop-in alternate design. */
export type SavingsGoalCardV3Props = SavingsGoalCardProps;
/**
 * SavingsGoalCard, redesigned (v3): a **thin milestone bar**. No ring — a slim
 * horizontal track (tinted with the goal color) fills to the saved percentage,
 * notched at the 25 / 50 / 75% milestones, with the title and percent on the
 * header row and the saved / target + "to go" caption beneath. A compact,
 * list-friendly form distinct at a glance from v1/v2's rings. Same props.
 */
export declare function SavingsGoalCardV3({ title, savedCents, targetCents, currency, deadline, color, formatMoney: format, style, }: SavingsGoalCardV3Props): React.ReactElement;
//# sourceMappingURL=SavingsGoalCardV3.d.ts.map