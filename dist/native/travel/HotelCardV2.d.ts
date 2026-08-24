import * as React from 'react';
import type { HotelCardProps } from './HotelCard';
/**
 * Drop-in alternate design for {@link HotelCard} — same props, different look.
 *
 * V2 is a **full-bleed cover hero**: the media placeholder fills a tall banner,
 * a rating chip floats top-right, and the name / location / nightly price sit
 * over a bottom scrim (a token-derived translucent wash — no literal color).
 * Amenity chips run in a strip beneath. Identical `HotelCardProps`.
 */
export type HotelCardV2Props = HotelCardProps;
export declare function HotelCardV2({ name, location, rating, reviewCount, priceCents, currency, tags, compareAtCents, appearance, onPress, style, }: HotelCardV2Props): React.ReactElement;
//# sourceMappingURL=HotelCardV2.d.ts.map