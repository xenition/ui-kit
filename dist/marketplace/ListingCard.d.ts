import * as React from 'react';
import { type Condition } from './internal';
/** Layout treatment of the card. */
export type ListingCardVariant = 'grid' | 'list' | 'featured';
export interface ListingCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Listing headline. */
    title: string;
    /** Asking price in integer minor units (cents). */
    priceCents: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Optional struck "was" price in cents (higher than `priceCents`). */
    compareAtCents?: number;
    /** Hero image URL. Omit for a token-styled placeholder. */
    imageUrl?: string;
    /** Item condition; renders a `ConditionBadge` when set. */
    condition?: Condition;
    /** Short location / seller line (e.g. "Brooklyn · 2mi"). */
    subtitle?: string;
    /** Whether the current user is watching this listing (drives the ♥ chip). */
    watched?: boolean;
    /** Fires when the watch chip is clicked (kept out of the card press target). */
    onToggleWatch?: (next: boolean) => void;
    /** Layout variant. Default `grid`. */
    variant?: ListingCardVariant;
    /** Renders a token placeholder recap instead of data. */
    loading?: boolean;
    /**
     * Fires when the card body is activated (open detail). When set, the card
     * becomes a `role="button"` with keyboard (Enter/Space) support.
     */
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}
/**
 * A single marketplace listing summary — hero media, price (with optional
 * compare-at), title, condition chip, and a location/seller line, plus an
 * optional ♥ watch toggle. Presentational: shaped data + callbacks only, nothing
 * fetches. `grid` (default) stacks media over text, `list` is a compact
 * horizontal row, `featured` enlarges the media. Colors come exclusively from
 * the `--xen-*` token classes. Pass `loading` for a recap. The watch toggle is a
 * real `<button>` outside the card press target, so watching never also
 * navigates.
 */
export declare const ListingCard: React.ForwardRefExoticComponent<ListingCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ListingCard.d.ts.map