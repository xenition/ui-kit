import * as React from 'react';
import type { RideRequestCardProps } from './RideRequestCard';
/**
 * Alternate design (v2) of {@link RideRequestCard} — a drop-in with the **same
 * props**. Where the original is a flat bordered card, V2 is an *elevated,
 * floating* request: a shadowed borderless surface, a large ringed rider avatar,
 * a prominent vertical **route timeline** (pin → line → flag) with the fare
 * hero'd in a tinted pill, and a mount fade-in. Endpoints are marked by
 * text-labelled glyphs (not color alone) and the surge state is spelled out.
 * Token-pure: colors come from semantic slots and `withAlpha` tints only.
 */
export type RideRequestCardV2Props = RideRequestCardProps;
export declare function RideRequestCardV2({ riderName, riderAvatarUrl, riderRating, pickup, dropoff, fareCents, currency, distanceToPickup, tripDuration, scheduledFor, surgeMultiplier, variant, onAccept, onDecline, loading, style, }: RideRequestCardV2Props): React.ReactElement;
//# sourceMappingURL=RideRequestCardV2.d.ts.map