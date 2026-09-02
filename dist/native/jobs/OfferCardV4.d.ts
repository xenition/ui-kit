import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { Salary } from './types';
/** Where an offer stands. `ApplicationStage` ends at `hired` and says nothing about this. */
export type OfferStatus = 'pending' | 'accepted' | 'declined' | 'expired';
/** An offer of employment. */
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
export interface OfferCardV4Props {
    /** The offer to render. */
    offer: OfferV4;
    /** Fired when the card body is pressed (open the full offer). */
    onPress?: (offer: OfferV4) => void;
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
    style?: StyleProp<ViewStyle>;
}
/**
 * **V4 offer card** — a new component. There is no base to extend, so the
 * props are plain `OfferCardV4Props`.
 *
 * ## Why it exists
 *
 * `ApplicationStage` ends at `'offer' | 'hired'` and **nothing in the module
 * renders an offer.** The decision screen of the whole funnel — the pay being
 * offered, the start date, the date the offer lapses, and the two buttons that
 * end the process one way or the other — had no component, so an app either
 * built it by hand or dropped the applicant onto a `StatusPipeline` reading
 * "Stage 4 of 5" with nothing to act on.
 *
 * ## What it takes from the pass
 *
 * - **The sibling rule.** Accept and Decline are siblings of the card's
 *   activation, never children of it. This is the one card in the module where
 *   getting that wrong is unrecoverable: on native the outer `Pressable` would
 *   flatten both buttons out of existence for a screen-reader user, and on web
 *   Enter on Accept would fire the card instead — which is not "the wrong
 *   navigation", it is a life decision made by a keyboard user who could not
 *   reach the control.
 * - **The salary goes through `salaryParts`.** An offer with a broken band
 *   says so rather than printing `From $NaN/yr` at the moment it matters most.
 * - **The deadline is a fact, not a colour.** An expired offer is `danger`
 *   *and* the word "Expired"; the countdown itself is plain text, because
 *   colouring a date orange as it approaches is the kind of urgency the reader
 *   cannot hear.
 * - **Nothing is decided twice.** The two buttons appear only while the offer
 *   is `pending`; a decided offer states its outcome instead of offering a
 *   choice that no longer exists.
 *
 * **Renders nothing without a job title** (§4.5).
 */
export declare function OfferCardV4({ offer, onPress, onAccept, onDecline, acceptLabel, declineLabel, startLabel, deadlineLabel, statusLabels, formatDate, formatMoney, periodLabels, style, }: OfferCardV4Props): React.ReactElement | null;
//# sourceMappingURL=OfferCardV4.d.ts.map