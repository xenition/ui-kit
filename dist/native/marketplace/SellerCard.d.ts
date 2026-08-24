import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type SellerCardVariant = 'card' | 'inline';
export interface SellerCardProps {
    /** Seller display name / shop name. */
    name: string;
    /** Avatar image URI (falls back to initials). */
    avatarUrl?: string;
    /** Average rating (0–5). Renders a `Rating` row when provided. */
    rating?: number;
    /** Number of ratings/reviews backing the average. */
    reviewCount?: number;
    /** Total completed sales; shown in the meta line. */
    salesCount?: number;
    /** Optional location line. */
    location?: string;
    /** Verified/trusted seller flag → an accent badge. */
    verified?: boolean;
    /** Label for the primary action button (default "Contact"). */
    actionLabel?: string;
    /** Fires when the action button is pressed. Omit to hide the button. */
    onContact?: () => void;
    /** Fires when the card body is pressed (open the seller profile). */
    onPress?: () => void;
    /** Compact inline layout vs. the full card. Default `card`. */
    variant?: SellerCardVariant;
    style?: StyleProp<ViewStyle>;
}
/**
 * A seller / shop identity block — avatar, name, an optional verified badge,
 * a star rating with review count, and a sales/location meta line, plus an
 * optional contact action. Presentational: shaped data + callbacks only. The
 * contact `Button` is kept outside the card's press target so contacting never
 * also navigates. Reuses `Avatar`, `Rating`, `Badge`, `Button`; token-only
 * colors via `useXenitionTheme()`.
 */
export declare function SellerCard({ name, avatarUrl, rating, reviewCount, salesCount, location, verified, actionLabel, onContact, onPress, variant, style, }: SellerCardProps): React.ReactElement;
//# sourceMappingURL=SellerCard.d.ts.map