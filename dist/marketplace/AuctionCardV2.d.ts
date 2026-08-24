import * as React from 'react';
import type { AuctionCardProps } from './AuctionCard';
/** Same public contract as {@link AuctionCard} — a drop-in alternate design. */
export type AuctionCardV2Props = AuctionCardProps;
/**
 * AuctionCard, redesigned (v2): a **hero-image lot card**. The photo fills a tall
 * banner with the countdown floating as a danger pill over a scrim; the current
 * bid + bid count sit large on the surface below with a full-width Place bid CTA.
 * Elevated, hover-lift. Same props as {@link AuctionCard}, token-only.
 */
export declare const AuctionCardV2: React.ForwardRefExoticComponent<AuctionCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AuctionCardV2.d.ts.map