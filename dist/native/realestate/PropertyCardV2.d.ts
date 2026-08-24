import * as React from 'react';
import type { PropertyCardProps } from './PropertyCard';
/** Drop-in alternate of {@link PropertyCardProps} — identical prop contract. */
export type PropertyCardV2Props = PropertyCardProps;
/**
 * PropertyCard — design variant **V2**: a **full-bleed hero photo** with a
 * bottom gradient scrim and the price / address / beds-baths chips overlaid
 * directly on the image. Where V1 is a media-top card with a separate white
 * body, V2 is one immersive tile — the photo fills the frame and the facts sit
 * on a dark scrim at the bottom. Same props as {@link PropertyCardProps}; only
 * the layout differs. Token-only: the scrim is `withAlpha` of the neutral ramp,
 * overlay text is the lightest neutral step, chips are translucent.
 */
export declare function PropertyCardV2({ address, locality, priceCents, currency, variant, beds, baths, sqft, imageUrl, status, onPress, loading, style, }: PropertyCardV2Props): React.ReactElement;
//# sourceMappingURL=PropertyCardV2.d.ts.map