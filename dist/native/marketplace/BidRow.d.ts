import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface BidRowProps {
    /** Bidder display name (or masked handle, e.g. "b***7"). */
    bidder: string;
    /** Bid amount in integer minor units (cents). */
    amountCents: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Optional avatar image URI. */
    avatarUrl?: string;
    /** Relative time label (e.g. "1m ago"). */
    timeLabel?: string;
    /** Highlights the row as the current highest bid. */
    leading?: boolean;
    /** Marks the bid as placed by the current user ("You"). */
    isYou?: boolean;
    /** Optional 1-based rank shown at the start of the row. */
    rank?: number;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single bid in an auction's bid history — optional rank, bidder, amount, and
 * time, with a `leading` highlight for the current top bid and a "You" marker.
 * Presentational: shaped data only, no callbacks. The leading state is conveyed
 * by a badge and a token-tinted surface (never color alone). Reuses `Avatar`,
 * `Badge`, and the shared `formatMoney`; token-only colors via
 * `useXenitionTheme()`.
 */
export declare function BidRow({ bidder, amountCents, currency, avatarUrl, timeLabel, leading, isYou, rank, style, }: BidRowProps): React.ReactElement;
//# sourceMappingURL=BidRow.d.ts.map