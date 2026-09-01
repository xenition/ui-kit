import * as React from 'react';
import type { RestaurantCardProps, RestaurantOpenState } from './RestaurantCard';
export interface RestaurantCardV4Props extends RestaurantCardProps {
    /** Override the availability words. Default `Open` / `Closed` / `Busy`. */
    openLabels?: Partial<Record<RestaurantOpenState, string>>;
    /**
     * The text equivalent of the `$$$` chip, for the card's spoken name. Default
     * `'Price level 3 of 4'`. The chip itself keeps its currency glyphs.
     */
    formatPriceLevel?: (level: number) => string;
}
/**
 * **V4 restaurant card** — same props as {@link RestaurantCard} plus
 * `openLabels` and `formatPriceLevel`.
 *
 * ## Five changes
 *
 * 1. **The card announces what it shows.** `accessibilityLabel` carried the
 *    name, the cuisine and the open state, and the `Pressable` around it is
 *    `accessible` — so the rating, the rating count, the price level, the ETA
 *    and the delivery fee were all removed from the tree. Every one of those
 *    is what a person is actually choosing between.
 * 2. **`$$$` gets words.** Three currency symbols announce as three currency
 *    symbols; `formatPriceLevel` gives the chip a text equivalent while the
 *    eye keeps the glyphs.
 * 3. **One dim, on one element.** The base put `0.75` on the container *and*
 *    `0.7` on the photo inside it, landing a closed restaurant's picture at
 *    0.525 — and then brightened the whole card to `0.9` on press, so a closed
 *    card lit up when touched. The photo carries M3's disabled band and
 *    nothing else does; press is a state layer.
 * 4. **The card reads as raised.** It was `surface` — the page's own colour —
 *    with a hairline, so on a dark page a list of restaurants was a flat
 *    field. `card`/`onCard` is the pair that exists for this.
 * 5. **The photo placeholder survives dark mode**, where it was
 *    `tokens.ramps.neutral[100]`: a near-white slab behind every unloaded
 *    thumbnail on a dark page.
 *
 * **Renders nothing without a `name`.**
 */
export declare function RestaurantCardV4({ name, cuisine, rating, ratingCount, priceLevel, etaText, feeText, imageUrl, openState, openLabels, formatPriceLevel, variant, onPress, style, }: RestaurantCardV4Props): React.ReactElement | null;
//# sourceMappingURL=RestaurantCardV4.d.ts.map