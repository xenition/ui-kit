import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface AllowanceGoal {
    /** What the child is saving for, e.g. "New bike". */
    label: string;
    /** Target amount. */
    target: number;
}
export interface AllowanceTrackerProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * A child's allowance wallet: a headline balance, an earned/spent split, an
 * optional savings-goal progress bar, and add/withdraw actions. Renders an
 * explicit empty state when no balance is set. Every color traces to a
 * `SemanticColors` token — no literals.
 */
export declare function AllowanceTracker({ balance, currency, earned, spent, goal, loading, emptyLabel, onAdd, onWithdraw, style, }: AllowanceTrackerProps): React.ReactElement;
//# sourceMappingURL=AllowanceTracker.d.ts.map