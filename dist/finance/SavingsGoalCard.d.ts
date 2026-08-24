import * as React from 'react';
import { type MoneyFormatter } from '../commerce/money';
import type { FinanceColor } from './internal/Meter';
export interface SavingsGoalCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Goal name (e.g. "Emergency fund"). */
    title: string;
    /** Amount saved so far, in integer **cents**. */
    savedCents: number;
    /** Target amount, in integer **cents**. */
    targetCents: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Optional target-date caption (already localized). */
    deadline?: string;
    /** Token color slot for the progress ring (default `success`). */
    color?: FinanceColor;
    /** Override the cents → string formatter (locale control). */
    formatMoney?: MoneyFormatter;
}
/**
 * A savings-goal tile: a {@link ProgressRing} showing percent-to-target beside
 * a saved / target breakdown and an optional deadline. Progress is
 * `savedCents / targetCents` (guarded against a non-positive target), amounts
 * are integer cents through {@link MoneyAmount}, and the "to go" figure is the
 * remaining cents. Token-bound throughout. Web parity of the native
 * `SavingsGoalCard`.
 */
export declare const SavingsGoalCard: React.ForwardRefExoticComponent<SavingsGoalCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SavingsGoalCard.d.ts.map