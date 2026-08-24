import * as React from 'react';
import type { RideRequestCardProps } from './RideRequestCard';
/**
 * Alternate design (v3) of {@link RideRequestCard} — a drop-in with the **same
 * props**. This is the *compact single line* treatment: a small rider avatar, an
 * inline `pickup → drop-off` route, the fare on the trailing edge, and a pair of
 * icon-only accept/decline taps. Built for tight lists / notification rows. The
 * accept/decline glyphs carry text a11y labels so intent never rests on color.
 * Token-pure: semantic slots and `withAlpha` tints only.
 */
export type RideRequestCardV3Props = RideRequestCardProps;
export declare function RideRequestCardV3({ riderName, riderAvatarUrl, riderRating, pickup, dropoff, fareCents, currency, surgeMultiplier, onAccept, onDecline, loading, style, }: RideRequestCardV3Props): React.ReactElement;
//# sourceMappingURL=RideRequestCardV3.d.ts.map