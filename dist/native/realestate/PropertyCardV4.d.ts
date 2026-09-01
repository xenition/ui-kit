import * as React from 'react';
import type { PropertyCardProps } from './PropertyCard';
/** Drop-in for {@link PropertyCardProps} — same props, the V4 "listing" design. */
export type PropertyCardV4Props = PropertyCardProps;
/**
 * PropertyCard — **V4** "listing" design. The image-forward, editorial take on a
 * listing summary: an elevated card with a floating rounded photo, an overlaid
 * status chip, a price-forward header, and the beds/baths/sqft facts as small
 * soft-primary chips. Same props/behavior as {@link PropertyCardProps}; the
 * `sale`/`rent` variant only changes the price suffix. Token-only colors via
 * `useXenitionTheme()`. `loading` shows a recap.
 */
export declare function PropertyCardV4({ address, locality, priceCents, currency, variant, beds, baths, sqft, imageUrl, status, onPress, loading, style, }: PropertyCardV4Props): React.ReactElement;
//# sourceMappingURL=PropertyCardV4.d.ts.map