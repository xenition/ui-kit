import * as React from 'react';
import type { RideRequestCardProps } from './RideRequestCard';
/** Same public contract as {@link RideRequestCard} — a drop-in alternate design. */
export type RideRequestCardV2Props = RideRequestCardProps;
/**
 * RideRequestCard, redesigned (v2): a **bold dispatch card**. The rider + rating and
 * a fare hero head the card; a pickup→dropoff route with node dots and a connector
 * follows, with distance·duration·surge chips and big Accept/Decline actions.
 * Distinct from v1. Same props, token-only.
 */
export declare const RideRequestCardV2: React.ForwardRefExoticComponent<RideRequestCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RideRequestCardV2.d.ts.map