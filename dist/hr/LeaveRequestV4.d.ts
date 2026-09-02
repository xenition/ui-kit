import * as React from 'react';
import type { LeaveRequestProps } from './LeaveRequest';
export interface LeaveRequestV4Props extends LeaveRequestProps {
    /**
     * Why the request was denied.
     *
     * `denied` is a decision a person has to act on and the card had no field to
     * carry the manager's sentence, so the employee saw "✕ Denied" and nothing
     * else. Rendered whenever the status is an adverse one.
     */
    decisionReason?: string;
    /** Copy on the approve action. Default `'Approve'`. */
    approveLabel?: string;
    /** Copy on the deny action. Default `'Deny'`. */
    denyLabel?: string;
    /** Render the day count. Default `'3 days'` / `'1 day'`. */
    formatDays?: (days: number) => string;
    /** Test hook. Every native `hr` component had one; no web one did. */
    testID?: string;
}
/**
 * **V4 leave request** — the web twin of the native `LeaveRequestV4`, same
 * props as {@link LeaveRequest} plus `decisionReason`, `approveLabel`,
 * `denyLabel`, `formatDays` and `testID`.
 *
 * ## Six changes
 *
 * 1. **A manager can approve leave from the keyboard.** This is the module's
 *    headline defect and this card is where it does the most damage. Approve
 *    and Deny were `<Button>`s inside a `<Card role="button">` carrying its own
 *    Enter/Space handler. Their *clicks* were guarded with `stopPropagation`;
 *    their *keydowns* were not. Tab to Approve, press Enter, and the card's
 *    handler catches the bubbled event, calls `preventDefault()` — which
 *    cancels the button's own activation, because Enter's default action on a
 *    button **is** that click — and fires the card's `onClick` instead. The
 *    manager is navigated to the request detail, the request is still pending,
 *    and nothing says so. A mouse user never sees it, which is why it shipped.
 *    The card is now a plain container, the activation is a real `<button>`
 *    around the employee and the dates, and the two decisions are its
 *    **siblings**. No guard, because there is nothing left to guard against.
 * 2. **`days={0}` and `days={-1}` no longer render.** The base printed
 *    "0 days" and "-1 days" — a request for a negative number of days — by
 *    interpolating whatever it was handed. The count is floored into `0…∞`
 *    and simply omitted when there is nothing to count.
 * 3. **A denial can say why.** See `decisionReason`.
 * 4. **The card is one accessible name** carrying the status. `Leave request,
 *    Vacation, Pending` replaced the subtree, so the employee, the dates and
 *    the day count were never announced.
 * 5. **Leave type stops spending a status colour.** `sick: danger` said that
 *    being ill is an error and `parental: success` that having a baby went
 *    well. The glyph already tells a holiday from a sick day.
 * 6. **Deny weighs the same on both twins.** Web filled it (`variant="danger"`)
 *    and native outlined it, so the destructive action was the loudest thing
 *    on the card on one platform and the quietest on the other. Both are now
 *    an outline at `tone="danger"` — resolved through `tone`, because
 *    `ButtonVariant` has a `danger` member on web and none on native.
 */
export declare const LeaveRequestV4: React.ForwardRefExoticComponent<LeaveRequestV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LeaveRequestV4.d.ts.map