import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type Condition } from './internal';
/** Layout treatment of the card. */
export type ListingCardVariant = 'grid' | 'list' | 'featured';
export interface ListingCardProps {
    /** Listing headline. */
    title: string;
    /** Asking price in integer minor units (cents). */
    priceCents: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Optional struck "was" price in cents (higher than `priceCents`). */
    compareAtCents?: number;
    /** Hero image URI. Omit for a token-styled placeholder. */
    imageUrl?: string;
    /** Item condition; renders a `ConditionBadge` when set. */
    condition?: Condition;
    /** Short location / seller line (e.g. "Brooklyn · 2mi"). */
    subtitle?: string;
    /** Whether the current user is watching this listing (drives the ♥ chip). */
    watched?: boolean;
    /** Fires when the watch chip is tapped (kept out of the card press target). */
    onToggleWatch?: (next: boolean) => void;
    /** Fires when the card body is pressed (open detail). */
    onPress?: () => void;
    /** Layout variant. Default `grid`. */
    variant?: ListingCardVariant;
    /** Renders a token placeholder recap instead of data. */
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single marketplace listing summary — hero media, price (with optional
 * compare-at), title, condition chip, and a location/seller line, plus an
 * optional ♥ watch toggle. Presentational: shaped data + callbacks only,
 * nothing fetches. `grid` (default) stacks media over text, `list` is a compact
 * horizontal row, `featured` enlarges the media. Colors come exclusively from
 * the compiled theme via `useXenitionTheme()`; tints use a token-derived alpha.
 * Pass `loading` for a recap.
 */
export declare function ListingCard({ title, priceCents, currency, compareAtCents, imageUrl, condition, subtitle, watched, onToggleWatch, onPress, variant, loading, style, }: ListingCardProps): React.ReactElement;
//# sourceMappingURL=ListingCard.d.ts.map