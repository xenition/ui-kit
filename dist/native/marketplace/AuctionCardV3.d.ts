import * as React from 'react';
import type { AuctionCardProps } from './AuctionCard';
/** Drop-in alternate of {@link AuctionCardProps} — identical prop contract. */
export type AuctionCardV3Props = AuctionCardProps;
/**
 * AuctionCard — Design V3: **minimal, with the bid figures laid out inline**. No
 * hero media and no filled band — a leading accent rule, the lot title, and an
 * inline "ledger" row that sets the current bid against the bid count and the
 * time remaining, each separated by a hairline divider. The bid action is a
 * compact text-style pressable on the trailing edge (disabled once ended). The
 * countdown derives from `endsAtMs` against the injectable `nowMs` (no
 * self-tick); ended state reads in text ("Ended") + a danger tone. Same props
 * as `AuctionCard`; token-pure with `withAlpha` tints; borderless and airy.
 */
export declare function AuctionCardV3({ title, currentBidCents, currency, bidCount, endsAtMs, nowMs, actionLabel, onPlaceBid, style, }: AuctionCardV3Props): React.ReactElement;
//# sourceMappingURL=AuctionCardV3.d.ts.map