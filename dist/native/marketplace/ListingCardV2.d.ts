import * as React from 'react';
import type { ListingCardProps } from './ListingCard';
/** Drop-in alternate of {@link ListingCardProps} — identical prop contract. */
export type ListingCardV2Props = ListingCardProps;
/**
 * ListingCard — Design V2: a horizontal "media-left" card with a dedicated
 * right-hand **price rail**. The hero sits on the left; the middle column
 * carries the title, condition chip, and location; and a tinted vertical rail
 * on the trailing edge isolates the price (plus the ♥ watch toggle) so scanning
 * a feed reads price-first. Elevated (drop shadow, no border) rather than the
 * V1 bordered grid tile, so the two are distinct at a glance. Same props as
 * `ListingCard`; presentational only; token-pure colors with `withAlpha` tints.
 */
export declare function ListingCardV2({ title, priceCents, currency, compareAtCents, imageUrl, condition, subtitle, watched, onToggleWatch, onPress, loading, style, }: ListingCardV2Props): React.ReactElement;
//# sourceMappingURL=ListingCardV2.d.ts.map