import * as React from 'react';
import type { SavingsGoalCardProps } from './SavingsGoalCard';
/** Same public contract as {@link SavingsGoalCard} — a drop-in alternate design. */
export type SavingsGoalCardV2Props = SavingsGoalCardProps;
/**
 * SavingsGoalCard, redesigned (v2): a **big ProgressRing hero**. A large,
 * percent-labeled ring is centered at the top, with the title, the saved /
 * target line, and the "to go" caption stacked and centered beneath it — a
 * focused, single-goal spotlight. Distinct at a glance from v1's small ring
 * beside a left-aligned block. Same props, guarded target, integer cents.
 */
export declare function SavingsGoalCardV2({ title, savedCents, targetCents, currency, deadline, color, formatMoney: format, style, }: SavingsGoalCardV2Props): React.ReactElement;
//# sourceMappingURL=SavingsGoalCardV2.d.ts.map