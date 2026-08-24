import * as React from 'react';
import type { ListingCardProps } from './ListingCard';
/** Drop-in alternate of {@link ListingCardProps} — identical prop contract. */
export type ListingCardV3Props = ListingCardProps;
/**
 * ListingCard — Design V3: a **full-bleed hero** tile. The image fills the whole
 * card; the condition chip pins to the top-left and the ♥ watch toggle to the
 * top-right, while the title and price ride a frosted scrim panel across the
 * bottom. The scrim is a theme-safe `surface` overlay (two stacked translucent
 * bands, faint→solid, standing in for a gradient) with `on-surface` text, so it
 * stays legible in light and dark. Editorial and immersive — clearly distinct
 * from the V1 grid tile and the V2 media-left rail. Same props as `ListingCard`;
 * token-pure with `withAlpha` tints.
 */
export declare function ListingCardV3({ title, priceCents, currency, compareAtCents, imageUrl, condition, subtitle, watched, onToggleWatch, onPress, loading, style, }: ListingCardV3Props): React.ReactElement;
//# sourceMappingURL=ListingCardV3.d.ts.map