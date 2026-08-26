import * as React from 'react';
import type { MoneyFormatter } from '../commerce';
/** Layout variants for a menu item tile. */
export type DishCardVariant = 'list' | 'grid' | 'featured';
export interface DishCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Dish name. */
    name: string;
    /** Short description / ingredients line. */
    description?: string;
    /** Price in integer cents. Omit for an unpriced dish — a recipe, a saved
     * dish, a menu line that carries no price — and the price element is left
     * out entirely rather than reading `$0.00`. */
    priceCents?: number;
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
    /** Whole-card activation handler (native `onPress`). */
    onClick?: () => void;
    /** Add-to-cart handler; renders an add button when provided. */
    onAdd?: () => void;
    /** Add button label (default `Add`). */
    addLabel?: string;
    /** Sold-out label (default `Sold out`). */
    soldOutLabel?: string;
    /** Override the cents → string formatter. */
    formatMoney?: MoneyFormatter;
}
/**
 * A single menu item — the food-domain sibling of `ProductCard`. Renders a
 * photo (or a token-tinted placeholder), name, description, an optional star
 * rating and dietary `badges`, a {@link PriceTag}, and an optional add button.
 * `variant` switches between a horizontal `list` row, a vertical `grid` tile,
 * and a larger `featured` hero. `soldOut` dims the card and disables adding;
 * `loading` shows a token-only skeleton. Web parity of the native `DishCard`.
 * When `onClick` is set the root is a keyboard-operable `role="button"` so the
 * nested add button stays independently focusable. Token-only.
 */
export declare const DishCard: React.ForwardRefExoticComponent<DishCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DishCard.d.ts.map