import * as React from 'react';
import type { RestaurantCardProps } from './RestaurantCard';
/** Drop-in for {@link RestaurantCard}: identical props, a distinct design. */
export type RestaurantCardV3Props = RestaurantCardProps;
/**
 * RestaurantCard, alternate design **V3** — a *compact list row*. Borderless
 * and dense: a small rounded thumbnail, then a two-line stack (name with an
 * inline status dot, meta + rating + ETA), meant to be repeated tightly in a
 * search or nearby list. No hero, no card chrome — the inverse of V2's cover.
 * Availability is a coloured dot *and* a word (never colour alone). Same props.
 */
export declare function RestaurantCardV3({ name, cuisine, rating, ratingCount, priceLevel, etaText, feeText, imageUrl, openState, onPress, style, }: RestaurantCardV3Props): React.ReactElement;
//# sourceMappingURL=RestaurantCardV3.d.ts.map