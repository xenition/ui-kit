import * as React from 'react';
import type { FundraiserCardProps } from './FundraiserCard';
/** Same public contract as {@link FundraiserCard} — a drop-in alternate design. */
export type FundraiserCardV3Props = FundraiserCardProps;
/**
 * FundraiserCard, redesigned (v3): a **dense fundraiser row**. A small thumbnail,
 * the title over an organizer line + a thin progress meter, and a compact Donate
 * button on the right — hairline-bordered for a list of campaigns. The opposite
 * of v2's cover hero. Same props, token-only.
 */
export declare const FundraiserCardV3: React.ForwardRefExoticComponent<FundraiserCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FundraiserCardV3.d.ts.map