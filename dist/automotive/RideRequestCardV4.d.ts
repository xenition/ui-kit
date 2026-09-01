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
 * **V4 ride request card** — the web twin of the native `RideRequestCardV4`,
 * same props as {@link RideRequestCard} plus five copy hooks.
 *
 * ## Five changes
 *
 * 1. **The two stops are joined by a rail.** The base stacked pickup and
 *    dropoff as two independent rows, so nothing said they were one journey —
 *    the single fact a driver reads first.
 * 2. **Accept and decline are not the same weight.** §5 is explicit that a
 *    declined choice never competes with the primary one; the base drew two
 *    equal buttons side by side.
 * 3. **The fare is tabular and in the display face.**
 * 4. **Surge is a labelled chip**, not a tinted fare.
 * 5. **The rider's rating carries its number.**
 *
 * **Renders nothing without a `riderName`** (§4.5).
 */
export declare const RideRequestCardV4: React.ForwardRefExoticComponent<RideRequestCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RideRequestCardV4.d.ts.map