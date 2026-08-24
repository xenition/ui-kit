import * as React from 'react';
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
    /** Click handler for the whole card (web parity of native `onPress`). */
    onClick?: () => void;
    className?: string;
}
/**
 * An expense-claim card: merchant, category, amount (integer **cents** via
 * `formatMoney`), date, and lifecycle status. Status is a glyph + word pill
 * (approved → success, rejected → danger, never color alone) and a missing
 * receipt is flagged by a glyph + word. When `actionable` and still `submitted`,
 * approve / reject `<button>`s render for an approver. `compact` drops the memo.
 * All colors are `--xen-*` token classes — no literals. `forwardRef` to the
 * root `<div>`.
 */
export declare const ExpenseClaim: React.ForwardRefExoticComponent<ExpenseClaimProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ExpenseClaim.d.ts.map