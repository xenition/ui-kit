import * as React from 'react';
import type { LeaveRequestProps } from './LeaveRequest';
export interface LeaveRequestV4Props extends LeaveRequestProps {
    /** Why the request was denied. Shown when the status is adverse. */
    decisionReason?: string;
    /** Name of the approve action. Default `'Approve'`. */
    approveLabel?: string;
    /** Name of the deny action. Default `'Deny'`. */
    denyLabel?: string;
    /** Build the day count. Default `'3 days'`. */
    formatDays?: (days: number) => string;
}
/**
 * **V4 leave request** — same props as {@link LeaveRequest} plus
 * `decisionReason`, `approveLabel`, `denyLabel` and `formatDays`.
 *
 * ## Six changes
 *
 * 1. **Approve and Deny are reachable.** They were `Button`s inside the card's
 *    own `Pressable`, which is `accessible` by default and flattens its whole
 *    subtree into one leaf named "Leave request, Vacation, Pending" — so on
 *    native the two decisions this card exists for were not focus stops at all.
 *    (On the web twin the same nesting had teeth: the card's `onKeyDown` caught
 *    the bubbled Enter, `preventDefault()` cancelled the button's own
 *    activation, and the card navigated instead. The manager navigated away
 *    without approving and nothing told them.) The card is a plain `CardV4`
 *    now; the activation wraps only the identity region, and the two buttons
 *    are its siblings.
 * 2. **A denial says why.** `denied` was one of six adverse statuses in this
 *    module with nowhere to put a reason, so a rejected request rendered a red
 *    "✕ Denied" above the requester's own note and the employee had to ask.
 * 3. **A day count is validated.** `days={0}` rendered "0 days" and `days={-1}`
 *    rendered "-1 days" — both drawn as confidently as a real figure. A count
 *    that is not a positive number is not drawn, and the plural comes from
 *    `pluralizeCount` rather than an appended `'s'`.
 * 4. **Leave type stops being a diagnosis.** `sick` was toned `danger` and
 *    `parental` `success` — a doctor's note in alarm red and a birth as a
 *    success condition. A type is identity: glyph, word, neutral chip.
 * 5. **The copy is props.** "Approve" and "Deny" were hard-coded English in the
 *    one component in the module a non-English HR team is guaranteed to see.
 * 6. **The card announces the whole request** — employee, type, dates, days and
 *    status — instead of three fragments and a subtree the reader cannot enter.
 *
 * `denyLabel`'s button keeps `variant="outline" tone="danger"` on **both**
 * twins. The web base spelled the destructive action `variant="danger"`, a
 * filled button, so the same request card put a heavier weight on "Deny" on the
 * web than on the phone; `tone` is the axis both platforms have.
 */
export declare function LeaveRequestV4({ type, startDate, endDate, days, status, employeeName, employeeAvatarUrl, approver, reason, actionable, variant, decisionReason, approveLabel, denyLabel, formatDays, onApprove, onDeny, onPress, testID, style, }: LeaveRequestV4Props): React.ReactElement | null;
//# sourceMappingURL=LeaveRequestV4.d.ts.map