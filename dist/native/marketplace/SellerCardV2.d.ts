import * as React from 'react';
import type { SellerCardProps } from './SellerCard';
/** Drop-in alternate of {@link SellerCardProps} — identical prop contract. */
export type SellerCardV2Props = SellerCardProps;
/**
 * SellerCard — Design V2: a **profile-banner** card. A primary-tinted cover band
 * fills the header; the avatar overlaps it, centered; and the name, verified
 * badge, rating, and a row of stat cells (sales / rating) stack beneath, with a
 * full-width contact action at the foot. Vertical and centered — a shop
 * "storefront" identity rather than the V1 horizontal row. Same props as
 * `SellerCard`; the contact button stays outside the profile press target;
 * token-pure colors with `withAlpha` tints; elevated surface.
 */
export declare function SellerCardV2({ name, avatarUrl, rating, reviewCount, salesCount, location, verified, actionLabel, onContact, onPress, style, }: SellerCardV2Props): React.ReactElement;
//# sourceMappingURL=SellerCardV2.d.ts.map