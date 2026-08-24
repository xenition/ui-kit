import * as React from 'react';
export type SellerCardVariant = 'card' | 'inline';
export interface SellerCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Seller display name / shop name. */
    name: string;
    /** Avatar image URL (falls back to initials). */
    avatarUrl?: string;
    /** Average rating (0–5). Renders a `Rating` row when provided. */
    rating?: number;
    /** Number of ratings/reviews backing the average. */
    reviewCount?: number;
    /** Total completed sales; shown in the meta line. */
    salesCount?: number;
    /** Optional location line. */
    location?: string;
    /** Verified/trusted seller flag → a primary badge. */
    verified?: boolean;
    /** Label for the primary action button (default "Contact"). */
    actionLabel?: string;
    /** Fires when the action button is pressed. Omit to hide the button. */
    onContact?: () => void;
    /** Compact inline layout vs. the full card. Default `card`. */
    variant?: SellerCardVariant;
    /**
     * Fires when the identity block is activated (open the seller profile). When
     * set, that block becomes a `role="button"` with keyboard support; the contact
     * button stays outside it so contacting never also navigates.
     */
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}
/**
 * A seller / shop identity block — avatar, name, an optional verified badge, a
 * star rating with review count, and a sales/location meta line, plus an
 * optional contact action. Presentational: shaped data + callbacks only. The
 * contact `Button` is kept outside the card's press target so contacting never
 * also navigates. Reuses `Avatar`, `Rating`, `Badge`, `Button`; token-only
 * colors via `--xen-*` classes.
 */
export declare const SellerCard: React.ForwardRefExoticComponent<SellerCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SellerCard.d.ts.map