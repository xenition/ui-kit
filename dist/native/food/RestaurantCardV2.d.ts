import * as React from 'react';
import type { RestaurantCardProps } from './RestaurantCard';
/** Drop-in for {@link RestaurantCard}: identical props, a distinct design. */
export type RestaurantCardV2Props = RestaurantCardProps;
/**
 * RestaurantCard, alternate design **V2** — a *cover-hero* card. A tall
 * full-bleed cover photo carries two overlaid chips: the open-state badge top-
 * left and a frosted rating badge top-right. The name and details sit on a
 * solid surface footer beneath the image (never over it), so contrast is safe
 * in both schemes while the card still reads as a big, tappable hero — the
 * opposite of the compact classic row. Same props as the classic.
 */
export declare function RestaurantCardV2({ name, cuisine, rating, ratingCount, priceLevel, etaText, feeText, imageUrl, openState, onPress, style, }: RestaurantCardV2Props): React.ReactElement;
//# sourceMappingURL=RestaurantCardV2.d.ts.map