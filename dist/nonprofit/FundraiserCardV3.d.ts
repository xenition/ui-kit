import * as React from 'react';
import type { FundraiserCardProps } from './FundraiserCard';
/** Same public contract as {@link FundraiserCard} — a drop-in alternate design. */
export type FundraiserCardV3Props = FundraiserCardProps;
/**
 * FundraiserCard, redesigned (v3): a **dense fundraiser row**. A small thumbnail,
 * the title over an organizer line + a thin progress meter, and a compact Donate
 * button on the right — hairline-bordered for a list of campaigns. The opposite
 * of v2's cover hero. Same props, token-only.
 * Stays inside its own design line: the meter is {@link CampaignProgressV3}, not
 * the base one, because an app that picks V3 picks it for every surface it sees.
 */
export declare const FundraiserCardV3: React.ForwardRefExoticComponent<FundraiserCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FundraiserCardV3.d.ts.map