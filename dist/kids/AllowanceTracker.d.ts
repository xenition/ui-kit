import * as React from 'react';
export interface AllowanceGoal {
    /** What the child is saving for, e.g. "New bike". */
    label: string;
    /** Target amount. */
    target: number;
}
export interface AllowanceTrackerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Current wallet balance. `NaN`/undefined renders the empty state. */
    balance: number;
    /** Currency symbol prefix. */
    currency?: string;
    /** Amount earned this period. */
    earned?: number;
    /** Amount spent this period. */
    spent?: number;
    /** Optional savings goal; drives a progress bar from `balance`→`target`. */
    goal?: AllowanceGoal;
    /** Loading placeholder state. */
    loading?: boolean;
    /** Copy shown when there is no balance set. */
    emptyLabel?: string;
    /** Fires to add funds / give allowance. */
    onAdd?: () => void;
    /** Fires to withdraw / spend. */
    onWithdraw?: () => void;
}
/**
 * A child's allowance wallet: a headline balance, an earned/spent split, an
 * optional savings-goal progress bar, and add/withdraw actions. Renders the
 * shared {@link EmptyState} when no balance is set. Earned/spent carry `+`/`−`
 * signs alongside their token color, so the split reads without color alone.
 * Token-bound throughout — no literal colors.
 */
export declare const AllowanceTracker: React.ForwardRefExoticComponent<AllowanceTrackerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AllowanceTracker.d.ts.map