import * as React from 'react';
export interface BidRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Bidder display name (or masked handle, e.g. "b***7"). */
    bidder: string;
    /** Bid amount in integer minor units (cents). */
    amountCents: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Optional avatar image URL. */
    avatarUrl?: string;
    /** Relative time label (e.g. "1m ago"). */
    timeLabel?: string;
    /** Highlights the row as the current highest bid. */
    leading?: boolean;
    /** Marks the bid as placed by the current user ("You"). */
    isYou?: boolean;
    /** Optional 1-based rank shown at the start of the row. */
    rank?: number;
}
/**
 * A single bid in an auction's bid history — optional rank, bidder, amount, and
 * time, with a `leading` highlight for the current top bid and a "You" marker.
 * Presentational: shaped data only, no callbacks. The leading state is conveyed
 * by a badge and a token-tinted surface (never color alone), and announced via
 * the row's `aria-label`. Reuses `Avatar`, `Badge`, and the shared
 * `formatMoney`; token-only colors.
 */
export declare const BidRow: React.ForwardRefExoticComponent<BidRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BidRow.d.ts.map