import * as React from 'react';
import type { RideRequestCardProps } from './RideRequestCard';
export interface RideRequestCardV4Props extends RideRequestCardProps {
    /** CTA copy. Defaults `'Accept'` / `'Decline'`. */
    acceptLabel?: string;
    declineLabel?: string;
    /** Build the surge chip. Default `'1.8× surge'`. */
    formatSurge?: (multiplier: number) => string;
    /** Labels on the two stops. Defaults `'Pickup'` / `'Dropoff'`. */
    pickupLabel?: string;
    dropoffLabel?: string;
}
/**
 * **V4 ride request card** — same props as {@link RideRequestCard} plus five
 * copy hooks.
 *
 * ## Five changes
 *
 * 1. **The two stops are joined by a rail.** The base stacked pickup and
 *    dropoff as two independent rows, so nothing on the card said they were
 *    one journey — which is the single fact a driver reads first.
 * 2. **Accept and decline are not the same weight.** The base drew two equal
 *    buttons side by side; §5 of the design spec is explicit that a declined
 *    choice never competes with the primary one.
 * 3. **The fare is tabular and in the display face**, because it is the number
 *    the decision turns on.
 * 4. **Surge is a labelled chip**, not a tinted fare — a higher price is a
 *    condition, not an error (§35.4).
 * 5. **The rider's rating carries its number**, via `RatingV4 showValue`.
 *
 * **Renders nothing without a `riderName`** (§4.5).
 */
export declare function RideRequestCardV4({ riderName, riderAvatarUrl, riderRating, pickup, dropoff, fareCents, currency, distanceToPickup, tripDuration, scheduledFor, surgeMultiplier, variant, acceptLabel, declineLabel, formatSurge, pickupLabel, dropoffLabel, onAccept, onDecline, loading, style, }: RideRequestCardV4Props): React.ReactElement | null;
//# sourceMappingURL=RideRequestCardV4.d.ts.map