import * as React from 'react';
import type { DriverCardProps } from './DriverCard';
/** Same public contract as {@link DriverCard} — a drop-in alternate design. */
export type DriverCardV2Props = DriverCardProps;
/**
 * DriverCard, redesigned (v2): an **elevated driver card**. A large avatar (with an
 * online dot) heads the name, rating·trips, vehicle and a plate chip, with the ETA
 * prominent and Message/Call actions anchoring the card. Distinct from v1. Same
 * props, token-only.
 */
export declare const DriverCardV2: React.ForwardRefExoticComponent<DriverCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DriverCardV2.d.ts.map