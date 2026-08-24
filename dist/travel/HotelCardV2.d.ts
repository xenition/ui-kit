import * as React from 'react';
import type { HotelCardProps } from './HotelCard';
/** Same public contract as {@link HotelCard} — a drop-in alternate design. */
export type HotelCardV2Props = HotelCardProps;
/**
 * HotelCard, redesigned (v2): a **media-hero property card**. A tinted media panel
 * (glyph watermark + a floating rating badge) tops the name/location, amenity
 * chips, and a nightly-price footer with any struck compare-at. Elevated,
 * hover-lift. Distinct from v1. Same props, token-only.
 */
export declare const HotelCardV2: React.ForwardRefExoticComponent<HotelCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=HotelCardV2.d.ts.map