import * as React from 'react';
import type { PropertyCardProps } from './PropertyCard';
/** Drop-in alternate of {@link PropertyCardProps} — identical prop contract. */
export type PropertyCardV3Props = PropertyCardProps;
/**
 * PropertyCard — design variant **V3**: a horizontal **list row** with a square
 * thumbnail on the left, the address block in the middle, and a **price rail**
 * pinned to the right — a primary-tinted panel with an accent edge that carries
 * the price. Where V1 is a vertical media-top tile, V3 scans as a dense list
 * item. Same props as {@link PropertyCardProps}; only the layout differs.
 * Token-only: the rail fill is `withAlpha` of the primary token.
 */
export declare function PropertyCardV3({ address, locality, priceCents, currency, variant, beds, baths, sqft, imageUrl, status, onPress, loading, style, }: PropertyCardV3Props): React.ReactElement;
//# sourceMappingURL=PropertyCardV3.d.ts.map