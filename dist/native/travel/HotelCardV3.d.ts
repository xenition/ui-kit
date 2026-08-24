import * as React from 'react';
import type { HotelCardProps } from './HotelCard';
/**
 * Drop-in alternate design for {@link HotelCard} — same props, different look.
 *
 * V3 is a **horizontal media-left row**: a square thumbnail on the left, the
 * name / location / rating stacked in the middle, and the nightly price pinned
 * to the trailing edge — a compact list row for dense search results. Honours
 * `appearance`. Identical `HotelCardProps`.
 */
export type HotelCardV3Props = HotelCardProps;
export declare function HotelCardV3({ name, location, rating, reviewCount, priceCents, currency, tags, compareAtCents, appearance, onPress, style, }: HotelCardV3Props): React.ReactElement;
//# sourceMappingURL=HotelCardV3.d.ts.map