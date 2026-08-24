import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type MoneyFormatter } from '../commerce';
/** Layout variants for a menu item tile. */
export type DishCardVariant = 'list' | 'grid' | 'featured';
export interface DishCardProps {
    /** Dish name. */
    name: string;
    /** Short description / ingredients line. */
    description?: string;
    /** Price in integer cents. */
    priceCents: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Dish photo URL. When absent a token-tinted placeholder is drawn. */
    imageUrl?: string;
    /** Average rating (0–5); renders a compact star row when provided. */
    rating?: number;
    /** Optional dietary / cuisine chip slot (e.g. `NutritionBadge`s). */
    badges?: React.ReactNode;
    /** Layout variant (default `list`). */
    variant?: DishCardVariant;
    /** When true the dish is out of stock: dimmed and the add button disabled. */
    soldOut?: boolean;
    /** Loading placeholder — renders a token-tinted skeleton, no content. */
    loading?: boolean;
    /** Press handler for the whole card. */
    onPress?: () => void;
    /** Add-to-cart handler; renders an add button when provided. */
    onAdd?: () => void;
    /** Add button label (default `Add`). */
    addLabel?: string;
    /** Sold-out label (default `Sold out`). */
    soldOutLabel?: string;
    /** Override the cents → string formatter. */
    formatMoney?: MoneyFormatter;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single menu item — the food-domain sibling of `ProductCard`. Renders a
 * photo (or a token-tinted placeholder), name, description, an optional star
 * rating and dietary `badges`, a {@link PriceTag}, and an optional add button.
 * `variant` switches between a horizontal `list` row, a vertical `grid` tile,
 * and a larger `featured` hero. `soldOut` dims the card and disables adding;
 * `loading` shows a token-only skeleton. Colors come only from theme tokens.
 */
export declare function DishCard({ name, description, priceCents, currency, imageUrl, rating, badges, variant, soldOut, loading, onPress, onAdd, addLabel, soldOutLabel, formatMoney, style, }: DishCardProps): React.ReactElement;
//# sourceMappingURL=DishCard.d.ts.map