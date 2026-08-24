import * as React from 'react';
export type AuctionCardVariant = 'card' | 'compact';
export interface AuctionCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Auction / lot title. */
    title: string;
    /** Current highest bid in integer minor units (cents). */
    currentBidCents: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Number of bids placed so far. */
    bidCount?: number;
    /** Epoch-ms timestamp when the auction closes. Drives the countdown. */
    endsAtMs: number;
    /**
     * Reference "now" in epoch-ms. Defaults to `Date.now()`; injectable so the
     * countdown is deterministic in tests (this component does not self-tick).
     */
    nowMs?: number;
    /** Hero image URL. Omit for a token-styled placeholder. */
    imageUrl?: string;
    /** Label for the primary action (default "Place bid"). */
    actionLabel?: string;
    /** Fires when the bid button is clicked. Omit to hide the button. */
    onPlaceBid?: () => void;
    /** Layout variant. Default `card`. */
    variant?: AuctionCardVariant;
}
/**
 * An auction lot summary — hero media, title, the live current bid with a bid
 * count, a countdown to close, and a place-bid action. The countdown is derived
 * from `endsAtMs` against an injectable `nowMs` (no internal timer, so it stays
 * deterministic in tests); once past close it reads "Ended", disables bidding,
 * and switches the timer chip to a danger tone (state carried by text + tone,
 * not color alone). Presentational: data + `onPlaceBid` only. Reuses `Badge`,
 * `Button`, and the shared `formatMoney`; token-only colors.
 */
export declare const AuctionCard: React.ForwardRefExoticComponent<AuctionCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AuctionCard.d.ts.map