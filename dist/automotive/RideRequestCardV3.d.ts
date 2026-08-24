import * as React from 'react';
import type { RideRequestCardProps } from './RideRequestCard';
/** Same public contract as {@link RideRequestCard} — a drop-in alternate design. */
export type RideRequestCardV3Props = RideRequestCardProps;
/**
 * RideRequestCard, redesigned (v3): a **compact dispatch row**. The rider + a
 * one-line pickup→dropoff route, the fare pinned right, and small Accept/Decline
 * controls — hairline-bordered for a queue. The opposite of v2's card. Same props,
 * token-only.
 */
export declare const RideRequestCardV3: React.ForwardRefExoticComponent<RideRequestCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RideRequestCardV3.d.ts.map