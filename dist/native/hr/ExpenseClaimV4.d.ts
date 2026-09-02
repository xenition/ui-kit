import * as React from 'react';
import { type MoneyFormatter } from '../../commerce/money';
import type { ExpenseClaimProps } from './ExpenseClaim';
export interface ExpenseClaimV4Props extends ExpenseClaimProps {
    /** Why the claim was rejected. Shown when the status is adverse. */
    decisionReason?: string;
    /** Name of the approve action. Default `'Approve'`. */
    approveLabel?: string;
    /** Name of the reject action. Default `'Reject'`. */
    rejectLabel?: string;
    /** Money formatter, for a locale the default cannot reach. */
    formatMoney?: MoneyFormatter;
}
/**
 * **V4 expense claim** — same props as {@link ExpenseClaim} plus
 * `decisionReason`, `approveLabel`, `rejectLabel` and `formatMoney`.
 *
 * ## Six changes
 *
 * 1. **Approve and Reject are reachable.** They were `Button`s inside the
 *    card's own `Pressable`, which is `accessible` by default and flattens its
 *    whole subtree into one leaf named "Expense Hilton, $840.00, Submitted" —
 *    so the two decisions this card exists for were not focus stops at all, and
 *    an approver using VoiceOver could open the claim and could not act on it.
 *    The card is a plain `CardV4`; the activation wraps only the
 *    merchant-and-amount region and the buttons are its siblings.
 * 2. **A rejection says why.** An $840 lodging claim rendered a red "✕
 *    Rejected" directly above the claimant's own memo, with no field anywhere
 *    in the component for the approver's reason.
 * 3. **Category stops being a verdict.** `software` was toned `success` and
 *    `meals` `accent`, so a laptop purchase rendered green next to a genuinely
 *    approved claim. A category is identity: glyph, word, neutral chip.
 * 4. **"No receipt" is inked with ink.** It was `colors.danger`, the **fill**
 *    slot, used as a text colour — measured as low as 1.32:1 in the audit that
 *    produced the `*Text` tokens.
 * 5. **Money takes a formatter.** `formatMoney` has a third `locale` argument
 *    no caller could reach, so every claim in the module printed in the
 *    runtime's default locale regardless of the employee's.
 * 6. **The card announces the whole claim** — merchant, category, date, amount,
 *    status, receipt and the rejection reason.
 *
 * `rejectLabel`'s button keeps `variant="outline" tone="danger"` on **both**
 * twins; the web base spelled the destructive action as a filled
 * `variant="danger"`, giving it more weight on one platform than the other.
 *
 * **Renders nothing without a `merchant`.**
 */
export declare function ExpenseClaimV4({ merchant, category, amountCents, currency, date, status, description, hasReceipt, actionable, variant, decisionReason, approveLabel, rejectLabel, formatMoney, onApprove, onReject, onPress, testID, style, }: ExpenseClaimV4Props): React.ReactElement | null;
//# sourceMappingURL=ExpenseClaimV4.d.ts.map