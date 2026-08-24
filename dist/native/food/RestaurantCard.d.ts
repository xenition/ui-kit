import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type RestaurantCardVariant = 'list' | 'grid' | 'hero';
export type RestaurantOpenState = 'open' | 'closed' | 'busy';
export interface RestaurantCardProps {
    /** Restaurant name. */
    name: string;
    /** Cuisine label(s), e.g. "Thai · Noodles". */
    cuisine?: string;
    /** Average rating (0–5). */
    rating?: number;
    /** Number of ratings (shown in parentheses). */
    ratingCount?: number;
    /** Price level 1–4 → `$`…`$$$$`. */
    priceLevel?: 1 | 2 | 3 | 4;
    /** Short delivery-time text (e.g. "25–35 min"). */
    etaText?: string;
    /** Delivery fee text (e.g. "Free delivery"). */
    feeText?: string;
    /** Hero/thumbnail image URL. */
    imageUrl?: string;
    /** Availability state (default `open`); `closed`/`busy` dim the card. */
    openState?: RestaurantOpenState;
    /** Layout variant (default `list`). */
    variant?: RestaurantCardVariant;
    /** Press handler for the whole card. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A restaurant / vendor tile — image, name, cuisine, star rating with count,
 * price level, and a delivery ETA line, plus an availability `Badge`. `variant`
 * switches a horizontal `list` row, a `grid` tile, and a full-bleed `hero`.
 * `closed`/`busy` states dim the card and are labelled in text (not color
 * alone). Reuses the `Rating` and `Badge` primitives. Token-only.
 */
export declare function RestaurantCard({ name, cuisine, rating, ratingCount, priceLevel, etaText, feeText, imageUrl, openState, variant, onPress, style, }: RestaurantCardProps): React.ReactElement;
//# sourceMappingURL=RestaurantCard.d.ts.map