import * as React from 'react';
import { type MoneyFormatter } from '../commerce/money';
import type { ExpenseClaimProps } from './ExpenseClaim';
export interface ExpenseClaimV4Props extends ExpenseClaimProps {
    /**
     * Why the claim was rejected.
     *
     * A rejected $840 lodging claim rendered "✕ Rejected" directly above the
     * claimant's own memo, with no room anywhere for the approver's answer.
     */
    decisionReason?: string;
    /** Copy on the approve action. Default `'Approve'`. */
    approveLabel?: string;
    /** Copy on the reject action. Default `'Reject'`. */
    rejectLabel?: string;
    /** Render the amount. Defaults to the shared `formatMoney`. */
    formatMoney?: MoneyFormatter;
    /** Test hook. Every native `hr` component had one; no web one did. */
    testID?: string;
}
/**
 * **V4 expense claim** — the web twin of the native `ExpenseClaimV4`, same
 * props as {@link ExpenseClaim} plus `decisionReason`, `approveLabel`,
 * `rejectLabel`, `formatMoney` and `testID`.
 *
 * ## Six changes
 *
 * 1. **An approver can approve from the keyboard.** Approve and Reject were
 *    `<Button>`s inside a `<Card role="button">` with its own Enter/Space
 *    handler. Their clicks were guarded with `stopPropagation`, their keydowns
 *    were not, and the card's `preventDefault()` on the bubbled Enter cancels
 *    the button's own activation — Enter's default action on a button *is*
 *    that click. So Enter on Approve opened the claim and approved nothing.
 *    The card is a plain container now, the activation wraps only the merchant
 *    and the amount, and the decisions are its **siblings**.
 * 2. **A rejection can say why.** See `decisionReason`.
 * 3. **The card is one accessible name.** `Expense Hilton, $840.00, Rejected`
 *    dropped the category, the date and the missing receipt; all of them now
 *    join the name.
 * 4. **Expense category stops spending a status colour.** `software: success`
 *    made a laptop purchase read as good news and `meals: accent` competed
 *    with the status pill for the eye. The glyph carries the category.
 * 5. **Money is overridable and inked correctly.** `formatMoney`'s third
 *    `locale` argument was unreachable, so the amount rendered in the browser
 *    default whatever the app's locale was; and "⚠ No receipt" was drawn in
 *    `text-danger`, a fill token, rather than the `danger-text` ink slot.
 * 6. **Reject weighs the same on both twins**, an outline at `tone="danger"` —
 *    web filled it and native outlined it, so the destructive action was the
 *    loudest thing on the card on one platform and the quietest on the other.
 */
export declare const ExpenseClaimV4: React.ForwardRefExoticComponent<ExpenseClaimV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ExpenseClaimV4.d.ts.map