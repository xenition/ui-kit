import * as React from 'react';
import type { RestaurantCardProps, RestaurantOpenState } from './RestaurantCard';
export interface RestaurantCardV4Props extends RestaurantCardProps {
    /** Override the availability words. */
    openLabels?: Partial<Record<RestaurantOpenState, string>>;
    /**
     * The **spoken** form of the price level. `$$$` announces as three currency
     * symbols — "dollar dollar dollar" — which is not what it means. The glyphs
     * stay on screen and are hidden from the reader; this is what it says
     * instead. Default `'Price level 3 of 4'`.
     */
    formatPriceLevel?: (level: number) => string;
}
/**
 * **V4 restaurant card** — the web twin of the native `RestaurantCardV4`, same
 * props as {@link RestaurantCard} plus `openLabels` and `formatPriceLevel`.
 *
 * ## Five changes
 *
 * 1. **The name carries the card.** `aria-label` was name, cuisine and the
 *    open state on a `role="button"` root, and that role is
 *    children-presentational — so the rating, the rating count, the price
 *    level, the ETA and the delivery fee were drawn and then pruned. Choosing
 *    a restaurant on those five figures is the entire task this card exists
 *    for.
 * 2. **`$$$` says what it means.** Three currency glyphs announce as three
 *    currency glyphs; `formatPriceLevel` gives the reader a sentence and the
 *    glyphs become decorative.
 * 3. **A closed restaurant stops getting brighter when you point at it — and
 *    the badge saying so stays legible.** The base compounded `opacity-70` on
 *    the photo inside `opacity-75` on the card — 0.525, most of the way to
 *    invisible — with `hover:opacity-90` on the same node, so hovering
 *    *un-dimmed* it. One dim now, on the photo alone; the name and the
 *    availability badge are at full strength, and press is the M3 state layer.
 * 4. **`busy` is not the same as `closed`.** Both resolved to a `neutral`
 *    badge, so a restaurant that is open and slammed looked exactly like one
 *    that is shut.
 * 5. **The card is a real button on the card tokens.** A `div` with
 *    `role="button"` and a hand-written Enter/Space handler, ringed in
 *    `primary-300` and painted on `surface`, becomes a `<button>` on
 *    `card`/`on-card` ringed in `ring`.
 */
export declare const RestaurantCardV4: React.ForwardRefExoticComponent<RestaurantCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RestaurantCardV4.d.ts.map