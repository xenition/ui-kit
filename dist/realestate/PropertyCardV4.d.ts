import * as React from 'react';
import type { PropertyCardProps } from './PropertyCard';
/** Drop-in for {@link PropertyCardProps} — same props, the V4 "listing" design. */
export type PropertyCardV4Props = PropertyCardProps;
/**
 * PropertyCard — **V4** "listing" design (web parity of the native V4). The
 * image-forward, editorial take on a listing summary: an elevated card with a
 * floating rounded photo, an overlaid status chip, a price-forward header, and
 * the beds/baths/sqft facts as small soft-primary chips. Same props/behavior as
 * {@link PropertyCardProps}; the `sale`/`rent` variant only changes the price
 * suffix. All colors from `--xen-*` token classes (no literals). `loading` shows
 * a recap; when `onClick` is set the card is a keyboard-activatable button.
 */
export declare const PropertyCardV4: React.ForwardRefExoticComponent<PropertyCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PropertyCardV4.d.ts.map