import * as React from 'react';
import type { FundraiserCardProps } from './FundraiserCard';
/** Same public contract as {@link FundraiserCard} — a drop-in alternate design. */
export type FundraiserCardV2Props = FundraiserCardProps;
/**
 * FundraiserCard, redesigned (v2): a **cover-hero fundraiser**. A tall cover image
 * with the organizer's avatar + name overlapping its lower edge, then the title,
 * a progress meter, and Donate/Share actions on the surface below. Elevated.
 * Distinct from v1's stacked card. Same props, token-only.
 * Stays inside its own design line: the meter is {@link CampaignProgressV2}, not
 * the base one, because an app that picks V2 picks it for every surface it sees.
 */
export declare const FundraiserCardV2: React.ForwardRefExoticComponent<FundraiserCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FundraiserCardV2.d.ts.map