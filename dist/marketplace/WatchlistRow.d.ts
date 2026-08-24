import * as React from 'react';
import { type Condition } from './internal';
export interface WatchlistRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Listing title. */
    title: string;
    /** Current price in integer minor units (cents). */
    priceCents: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Optional prior price in cents; struck when higher than `priceCents`. */
    compareAtCents?: number;
    /** Thumbnail image URL. Omit for a token placeholder. */
    imageUrl?: string;
    /** Item condition; renders a small `ConditionBadge`. */
    condition?: Condition;
    /** Whether the item is currently watched (drives the ♥ toggle). Default `true`. */
    watched?: boolean;
    /** Marks the item as sold/unavailable → a neutral badge + dimmed row. */
    ended?: boolean;
    /** Fires when the watch toggle is clicked (kept out of the row press target). */
    onToggleWatch?: (next: boolean) => void;
    /**
     * Fires when the row body is activated (open detail). When set, that body
     * becomes a `role="button"` with keyboard support.
     */
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}
/**
 * A row in a saved / watchlist screen — thumbnail, title, price (with optional
 * compare-at drop), a condition chip, and a ♥ watch toggle. The toggle is a real
 * `<button>` outside the row's press target, so un-watching never also
 * navigates. Presentational: shaped data + callbacks only. `ended` dims the row
 * and shows a "Sold" badge (state via text + tone, not color alone). Reuses
 * `PriceTag`, `Badge`, and `ConditionBadge`; token-only colors.
 */
export declare const WatchlistRow: React.ForwardRefExoticComponent<WatchlistRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WatchlistRow.d.ts.map