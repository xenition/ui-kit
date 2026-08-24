import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type ExpenseStatus, type ExpenseCategory } from './internal';
export type ExpenseClaimVariant = 'default' | 'compact';
export interface ExpenseClaimProps {
    /** Merchant / vendor name. */
    merchant: string;
    /** Expense category — glyph + word chip. */
    category: ExpenseCategory;
    /** Claim amount in integer **cents**. */
    amountCents: number;
    /** ISO 4217 currency (default USD). */
    currency?: string;
    /** Pre-formatted transaction date. */
    date?: string;
    /** Claim lifecycle status — glyph + word pill. */
    status: ExpenseStatus;
    /** Free-text description / memo. */
    description?: string;
    /** Whether a receipt is attached — flagged by word + glyph. */
    hasReceipt?: boolean;
    /** Show approve/reject actions (meaningful while `submitted`). */
    actionable?: boolean;
    /** Density. */
    variant?: ExpenseClaimVariant;
    onApprove?: () => void;
    onReject?: () => void;
    /** Tap handler for the whole card. */
    onPress?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * An expense-claim card: merchant, category, amount (integer **cents** via
 * `formatMoney`), date, and lifecycle status. Status is a glyph + word pill
 * (approved → success, rejected → danger, never color alone) and a missing
 * receipt is flagged by a word. When `actionable` and still `submitted`,
 * approve / reject buttons render for an approver. `compact` drops the memo.
 * All colors are theme tokens — no literals.
 */
export declare function ExpenseClaim({ merchant, category, amountCents, currency, date, status, description, hasReceipt, actionable, variant, onApprove, onReject, onPress, testID, style, }: ExpenseClaimProps): React.ReactElement;
//# sourceMappingURL=ExpenseClaim.d.ts.map