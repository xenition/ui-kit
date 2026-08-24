import * as React from 'react';
import type { AuctionCardProps } from './AuctionCard';
/** Drop-in alternate of {@link AuctionCardProps} — identical prop contract. */
export type AuctionCardV2Props = AuctionCardProps;
/**
 * AuctionCard — Design V2: an **elevated card with a bold countdown band**. The
 * hero image sits up top; directly beneath it a full-width, tinted band makes
 * the time-remaining the loudest element on the card ("⏱ 2h 30m left" — or a
 * danger-toned "Auction ended" once closed). Price and bid count follow, then
 * the bid action. The countdown derives from `endsAtMs` against the injectable
 * `nowMs` (no self-tick, deterministic in tests); ended state is carried by
 * text + tone, not color alone. Same props as `AuctionCard`; token-pure with
 * `withAlpha` tints; elevated, borderless surface.
 */
export declare function AuctionCardV2({ title, currentBidCents, currency, bidCount, endsAtMs, nowMs, imageUrl, actionLabel, onPlaceBid, variant, style, }: AuctionCardV2Props): React.ReactElement;
//# sourceMappingURL=AuctionCardV2.d.ts.map