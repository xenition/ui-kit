import * as React from 'react';
export type RestaurantCardVariant = 'list' | 'grid' | 'hero';
export type RestaurantOpenState = 'open' | 'closed' | 'busy';
export interface RestaurantCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
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
    /** Whole-card activation handler (native `onPress`). */
    onClick?: () => void;
}
/**
 * A restaurant / vendor tile — image, name, cuisine, star rating with count,
 * price level, and a delivery ETA line, plus an availability `Badge`. `variant`
 * switches a horizontal `list` row, a `grid` tile, and a full-bleed `hero`.
 * `closed`/`busy` states dim the card and are labelled in text (not color
 * alone). Reuses the `Rating` and `Badge` primitives. Web parity of the native
 * `RestaurantCard`; token-only. When `onClick` is set the root is a
 * keyboard-operable `role="button"`.
 */
export declare const RestaurantCard: React.ForwardRefExoticComponent<RestaurantCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RestaurantCard.d.ts.map