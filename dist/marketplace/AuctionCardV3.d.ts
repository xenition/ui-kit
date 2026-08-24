import * as React from 'react';
import type { AuctionCardProps } from './AuctionCard';
/** Same public contract as {@link AuctionCard} — a drop-in alternate design. */
export type AuctionCardV3Props = AuctionCardProps;
/**
 * AuctionCard, redesigned (v3): a **dense lot row**. A small thumbnail, the title
 * over a "N bids · ends in …" meta line, the current bid pinned right, and a
 * compact Bid button — hairline-bordered for scannable lists. The opposite of
 * v2's hero card. Same props, token-only.
 */
export declare const AuctionCardV3: React.ForwardRefExoticComponent<AuctionCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AuctionCardV3.d.ts.map