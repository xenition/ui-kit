import * as React from 'react';
import type { Salary } from './types';
/** Where an offer stands. `ApplicationStage` ends at `hired` and says nothing about this. */
export type OfferStatus = 'pending' | 'accepted' | 'declined' | 'expired';
/** An offer of employment. Declared identically in the native twin. */
export interface OfferV4 {
    id: string;
    jobTitle: string;
    companyName: string;
    companyLogoUrl?: string;
    /** What is being offered. */
    salary?: Salary;
    /** When the role starts (ISO-8601). */
    startsAt?: string;
    /** When the offer lapses (ISO-8601). */
    respondBy?: string;
    /** Default `'pending'`. */
    status?: OfferStatus;
}
export interface OfferCardV4Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** The offer to render. */
    offer: OfferV4;
    /** Fired when the card body is pressed (open the full offer). `onPress` → `onClick`. */
    onClick?: (offer: OfferV4) => void;
    /** Fired when the offer is accepted. */
    onAccept?: (offer: OfferV4) => void;
    /** Fired when the offer is declined. */
    onDecline?: (offer: OfferV4) => void;
    /** Copy on the accept action. Default `'Accept offer'`. */
    acceptLabel?: string;
    /** Copy on the decline action. Default `'Decline'`. */
    declineLabel?: string;
    /** Caption on the start date. Default `'Starts'`. */
    startLabel?: string;
    /** Caption on the response deadline. Default `'Respond by'`. */
    deadlineLabel?: string;
    /** Re-word the statuses. Defaults Pending / Accepted / Declined / Expired. */
    statusLabels?: Partial<Record<OfferStatus, string>>;
    /** Render a date. Default a localized short date, e.g. `'Jun 15'`. */
    formatDate?: (iso: string) => string;
    /** Render one salary bound. Default the module's compact money formatter. */
    formatMoney?: (amount: number, currency?: string) => string;
    /** Cadence suffixes. Default `/yr`, `/hr`, `/mo`. */
    periodLabels?: {
        year?: string;
        hour?: string;
        month?: string;
    };
}
/**
 * **V4 offer card** — a new component, so it has no base to extend.
 *
 * ## Why it exists
 *
 * `ApplicationStage` ends at `'offer' | 'hired'` and nothing in the module
 * renders what sits between them. There are twelve components here for
 * finding, filtering, applying and tracking, and **none at all for the screen
 * that decides the outcome** — the pay, the start date, the deadline, and the
 * two buttons that end it either way. An app building a job-seeker product on
 * this kit reached the last step of its own funnel and had to leave.
 *
 * Four things it does that the rest of the module was not doing:
 *
 * 1. **The deadline is words, not an implication.** `respondBy` is captioned
 *    and folded into the card's accessible name, and while the offer is still
 *    pending it is drawn in `warn-text` — a genuine warning, because the offer
 *    lapses, not a category wearing a status colour.
 * 2. **Accept and Decline are siblings of the card's activation**, never
 *    inside it. That is the defect found in six components in this module and
 *    four more elsewhere in the kit: a `<button>` inside a `role="button"` is
 *    invalid ARIA, and its keyboard activation is cancelled by the ancestor's
 *    own Enter handler. A decision has to be reachable.
 * 3. **The card is one accessible name**, so the role, the employer, the pay,
 *    both dates and the status arrive as a sentence rather than as six stops —
 *    the failure that made every existing row in this module unusable with a
 *    screen reader.
 * 4. **The band is validated.** Pay goes through the same {@link SalaryRangeV4}
 *    as the rest of the module, so an offer whose bounds run backwards says so
 *    rather than printing "$120K – $90K/yr".
 */
export declare const OfferCardV4: React.ForwardRefExoticComponent<OfferCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=OfferCardV4.d.ts.map