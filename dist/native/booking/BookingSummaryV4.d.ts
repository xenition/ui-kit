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
 * **V4 booking summary** — same props as {@link BookingSummary} plus `price`,
 * `priceNote`, `labels` and `formatDuration`.
 *
 * ## Four changes
 *
 * 1. **It can show the price.** See `price`. It is the last row, separated by
 *    a hairline and set a step up in the display face, because a total is the
 *    figure the eye goes to and the base had no way to say it at all.
 * 2. **Every label is a prop.** `With` / `Date` / `Time` / `Duration` /
 *    `Timezone` / `Nothing selected yet.` were English constants inside the
 *    component, unreachable from a host that localizes.
 * 3. **The rows are `TextV4`, and the labels take `mutedText`.** The base
 *    hand-wrote `color: colors.muted` with a literal font size on a raw
 *    `<Text>`, which is both the wrong token and the wrong layer.
 * 4. **The card is `CardV4`'s raised ground.** A summary sits on top of a
 *    booking flow, and on a dark page the base's `surface` ground made it
 *    disappear into the page with only its border to separate it.
 *
 * The empty state — no resource, no slot — is a message, not a bordered blank.
 */
export declare function BookingSummaryV4({ resource, slot, timeZone, formatDate, formatTime, formatDuration, action, title, price, priceNote, labels, style, }: BookingSummaryV4Props): React.ReactElement;
//# sourceMappingURL=BookingSummaryV4.d.ts.map