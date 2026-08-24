import * as React from 'react';
import type { RestaurantCardProps } from './RestaurantCard';
/** Drop-in for {@link RestaurantCard}: identical props, a distinct design. */
export type RestaurantCardV2Props = RestaurantCardProps;
/**
 * RestaurantCard, alternate design **V2** — a *cover-hero* card. A tall
 * full-bleed cover photo carries two overlaid chips: the open-state badge top-
 * left and a frosted rating badge top-right. The name and details sit on a
 * solid surface footer beneath the image (never over it), so contrast is safe
 * while the card still reads as a big, tappable hero — the opposite of the
 * compact base row. Same props as the base; token-only, elevated with a hover
 * lift.
 */
export declare const RestaurantCardV2: React.ForwardRefExoticComponent<RestaurantCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RestaurantCardV2.d.ts.map