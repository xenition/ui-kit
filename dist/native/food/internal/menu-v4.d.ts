/**
 * The `food` module's own V4 vocabulary (native) — the twin of
 * `food/internal/menu-v4.ts`.
 *
 * Nothing here is exported from the package.
 */
import type { XenitionNativeTheme } from '../../theme';
import { onPair, skeletonFill, toneFill, toneInk, type ToneV4 } from '../../primitives/internal/tone-v4';
import { deliveryWindow, DIET_TONE, ORDER_STAGES, stageIndex, stepQuantity } from '../../../food/order-v4';
export { deliveryWindow, DIET_TONE, onPair, ORDER_STAGES, skeletonFill, stageIndex, stepQuantity, toneFill, toneInk, };
export type { ToneV4 };
/** One badge shape for the whole module. */
export declare const BADGE_V4: {
    readonly variant: "soft";
    readonly size: "sm";
};
/**
 * Prices, deltas and bucket counts all stack in a column.
 *
 * There is not one tabular figure anywhere in the native twin today, against
 * seven on web — including the cart total, which re-renders as the cart
 * changes, and the rating buckets, which sit in a fixed-width column.
 */
export declare const TABULAR: {
    fontVariant: "tabular-nums"[];
};
/**
 * The ground behind a skeleton or an unloaded photo.
 *
 * Eight of the thirteen reach for `tokens.ramps.neutral[*]`, which the theme
 * output copies to native **without inverting** — so every placeholder in this
 * module is a near-white block on a dark page, and the two twins are different
 * colours in dark mode.
 */
export declare function placeholderGround(theme: XenitionNativeTheme): string;
/**
 * Build the one accessible name a menu row or card should carry.
 *
 * This is the module's most consequential helper. Six components put a short
 * label on a `role="button"` / `checkbox` / `radio` root, and all three roles
 * are **children-presentational** — so the price, the rating, the items
 * summary, the modifier's price delta and, in `DishCard`, the **allergen and
 * dietary badges** were removed from the accessibility tree entirely. A
 * screen-reader user browsing a menu heard one thing per dish: its name.
 *
 * Everything a sighted user can see about a dish goes in here.
 */
export declare function spokenLine(parts: ReadonlyArray<string | number | undefined | null>): string;
//# sourceMappingURL=menu-v4.d.ts.map