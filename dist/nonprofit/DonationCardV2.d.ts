import * as React from 'react';
import type { DonationCardProps } from './DonationCard';
/** Same public contract as {@link DonationCard} — a drop-in alternate design. */
export type DonationCardV2Props = DonationCardProps;
/**
 * DonationCard, redesigned (v2): a **bold gift card**. A large title/blurb over a
 * two-column grid of big preset amount tiles (the chosen one fills primary), with
 * a full-width Donate CTA that names the active amount. Distinct from v1's inline
 * chips. Same props, token-only.
 */
export declare const DonationCardV2: React.ForwardRefExoticComponent<DonationCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DonationCardV2.d.ts.map