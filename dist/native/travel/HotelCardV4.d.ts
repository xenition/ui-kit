import * as React from 'react';
import type { HotelCardProps } from './HotelCard';
/** Drop-in for {@link HotelCardProps} — same props, the V4 "journey" design. */
export type HotelCardV4Props = HotelCardProps;
/**
 * HotelCard — **V4** "journey" design. The boarding-pass take on a hotel result:
 * an elevated clean card with a small brand-gradient disc behind the leading
 * hotel glyph (the signature V4 touch), the property name/location, guest star
 * rating, amenity chips, and the nightly fare sitting below a dashed
 * boarding-pass tear line. Same props/behavior as {@link HotelCardProps};
 * token-only colors via `useXenitionTheme()`. `variant="row"` keeps the layout
 * compact.
 */
export declare function HotelCardV4({ name, location, rating, reviewCount, priceCents, currency, tags, compareAtCents, variant, onPress, style, }: HotelCardV4Props): React.ReactElement;
//# sourceMappingURL=HotelCardV4.d.ts.map