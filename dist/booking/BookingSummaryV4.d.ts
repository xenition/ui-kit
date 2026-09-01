import * as React from 'react';
import type { BookingSummaryProps } from './BookingSummary';
/** The row labels, all overridable — the base hard-coded five English words. */
export interface BookingSummaryLabels {
    resource?: string;
    date?: string;
    time?: string;
    duration?: string;
    timezone?: string;
    price?: string;
    /** Shown when neither a resource nor a slot has been chosen. */
    empty?: string;
}
export interface BookingSummaryV4Props extends BookingSummaryProps {
    /**
     * What the booking costs, already formatted (e.g. `'$48.00'`).
     *
     * The base listed who, when and how long, and never what it costs — which is
     * the line a confirmation screen exists to show, and the one a user checks
     * before pressing the button underneath it. Pre-formatted, not cents: the
     * currency and its rounding are the host's decision, and a component that
     * formats money itself will eventually disagree with the invoice.
     */
    price?: string;
    /** A caption under the price — `'Charged at the appointment'`, a tax note. */
    priceNote?: string;
    /** Override any row label. */
    labels?: BookingSummaryLabels;
    /** Render the duration. Default `(min) => `${min} min``. */
    formatDuration?: (minutes: number) => string;
}
/**
 * **V4 booking summary** — the web twin of the native `BookingSummaryV4`, same
 * props as {@link BookingSummary} plus `price`, `priceNote`, `labels` and
 * `formatDuration`.
 *
 * ## Four changes
 *
 * 1. **It can show the price.** See `price`. It is the last row, separated by
 *    a hairline and set a step up in the display face, because a total is the
 *    figure the eye goes to and the base had no way to say it at all.
 * 2. **Every label is a prop**, where six English constants used to live
 *    inside the component out of a localizing host's reach.
 * 3. **Labels take `muted-text`**, the slot with an actual contrast promise,
 *    rather than `muted`.
 * 4. **The card is the raised ground.** A summary sits on top of a booking
 *    flow; on a dark page `bg-surface` made it disappear into the page with
 *    only its border to separate it.
 *
 * The empty state — no resource, no slot — is a message, not a bordered blank.
 */
export declare const BookingSummaryV4: React.ForwardRefExoticComponent<BookingSummaryV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BookingSummaryV4.d.ts.map