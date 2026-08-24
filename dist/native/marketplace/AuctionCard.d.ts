import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type AuctionCardVariant = 'card' | 'compact';
export interface AuctionCardProps {
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
    /** Hero image URI. Omit for a token-styled placeholder. */
    imageUrl?: string;
    /** Label for the primary action (default "Place bid"). */
    actionLabel?: string;
    /** Fires when the bid button is pressed. Omit to hide the button. */
    onPlaceBid?: () => void;
    /** Layout variant. Default `card`. */
    variant?: AuctionCardVariant;
    style?: StyleProp<ViewStyle>;
}
/**
 * An auction lot summary — hero media, title, the live current bid with a bid
 * count, a countdown to close, and a place-bid action. The countdown is derived
 * from `endsAtMs` against an injectable `nowMs` (no internal timer, so it stays
 * deterministic in tests); once past close it reads "Ended", disables bidding,
 * and switches the timer chip to a danger tone (state carried by text + tone,
 * not color alone). Presentational: data + `onPlaceBid` only. Reuses `Badge`,
 * `Button`, and the shared `formatMoney`; token-only colors, tints via a
 * token-derived alpha.
 */
export declare function AuctionCard({ title, currentBidCents, currency, bidCount, endsAtMs, nowMs, imageUrl, actionLabel, onPlaceBid, variant, style, }: AuctionCardProps): React.ReactElement;
//# sourceMappingURL=AuctionCard.d.ts.map