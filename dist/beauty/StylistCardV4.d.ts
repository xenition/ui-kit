import * as React from 'react';
import type { StylistCardProps } from './StylistCard';
export interface StylistCardV4Props extends StylistCardProps {
    /** Copy on the fully-booked chip. Default `'Fully booked'`. */
    fullyBookedLabel?: string;
    /** Prefix on the from-price. Default `'from'`. */
    fromLabel?: string;
    /** Build the review count. Default `'128 reviews'`. */
    formatReviewCount?: (count: number) => string;
    /** At most this many specialty chips are drawn. Default `3`. */
    maxSpecialties?: number;
}
/**
 * **V4 stylist card** — the web twin of the native `StylistCardV4`, same props
 * as {@link StylistCard} plus four hooks.
 *
 * ## Five changes
 *
 * 1. **The rating carries its number and its count** — a stylist list is
 *    exactly where a client compares 4.9 against 4.6.
 * 2. **Fully booked disables the CTA.** The base showed the chip and left
 *    "Book" live, so a client could tap through to a stylist with no slots.
 * 3. **The specialty chips are capped and wrap** — seven of them pushed the
 *    price off the row, and §7 says chips wrap and are never clipped.
 * 4. **The from-price is tabular** with its prefix as a separate muted
 *    element.
 * 5. **The skeleton is opaque**, and an interactive card is a real `<button>`.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export declare const StylistCardV4: React.ForwardRefExoticComponent<StylistCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StylistCardV4.d.ts.map