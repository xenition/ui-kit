import * as React from 'react';
import type { HotelCardProps } from './HotelCard';
/** Drop-in for {@link HotelCardProps} — same props, the V4 "journey" design. */
export type HotelCardV4Props = HotelCardProps;
/**
 * HotelCard — **V4** "journey" design (web parity of the native V4). The
 * boarding-pass take on a hotel result: an elevated clean card with a small
 * brand-gradient disc behind the leading hotel glyph (the signature V4 touch),
 * the property name/location, guest star rating, amenity chips, and the nightly
 * fare sitting below a dashed boarding-pass tear line. Same props/behavior as
 * {@link HotelCardProps}; all colors from `--xen-*` token classes (no literal
 * colors). `variant="row"` tightens the layout into a horizontal row.
 */
export declare const HotelCardV4: React.ForwardRefExoticComponent<HotelCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=HotelCardV4.d.ts.map