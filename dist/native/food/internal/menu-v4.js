"use strict";
/**
 * The `food` module's own V4 vocabulary (native) — the twin of
 * `food/internal/menu-v4.ts`.
 *
 * Nothing here is exported from the package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TABULAR = exports.BADGE_V4 = exports.toneInk = exports.toneFill = exports.stepQuantity = exports.stageIndex = exports.skeletonFill = exports.ORDER_STAGES = exports.onPair = exports.DIET_TONE = exports.deliveryWindow = void 0;
exports.placeholderGround = placeholderGround;
exports.spokenLine = spokenLine;
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "onPair", { enumerable: true, get: function () { return tone_v4_1.onPair; } });
Object.defineProperty(exports, "skeletonFill", { enumerable: true, get: function () { return tone_v4_1.skeletonFill; } });
Object.defineProperty(exports, "toneFill", { enumerable: true, get: function () { return tone_v4_1.toneFill; } });
Object.defineProperty(exports, "toneInk", { enumerable: true, get: function () { return tone_v4_1.toneInk; } });
const order_v4_1 = require("../../../food/order-v4");
Object.defineProperty(exports, "deliveryWindow", { enumerable: true, get: function () { return order_v4_1.deliveryWindow; } });
Object.defineProperty(exports, "DIET_TONE", { enumerable: true, get: function () { return order_v4_1.DIET_TONE; } });
Object.defineProperty(exports, "ORDER_STAGES", { enumerable: true, get: function () { return order_v4_1.ORDER_STAGES; } });
Object.defineProperty(exports, "stageIndex", { enumerable: true, get: function () { return order_v4_1.stageIndex; } });
Object.defineProperty(exports, "stepQuantity", { enumerable: true, get: function () { return order_v4_1.stepQuantity; } });
/** One badge shape for the whole module. */
exports.BADGE_V4 = { variant: 'soft', size: 'sm' };
/**
 * Prices, deltas and bucket counts all stack in a column.
 *
 * There is not one tabular figure anywhere in the native twin today, against
 * seven on web — including the cart total, which re-renders as the cart
 * changes, and the rating buckets, which sit in a fixed-width column.
 */
exports.TABULAR = { fontVariant: ['tabular-nums'] };
/**
 * The ground behind a skeleton or an unloaded photo.
 *
 * Eight of the thirteen reach for `tokens.ramps.neutral[*]`, which the theme
 * output copies to native **without inverting** — so every placeholder in this
 * module is a near-white block on a dark page, and the two twins are different
 * colours in dark mode.
 */
function placeholderGround(theme) {
    return (0, tone_v4_1.skeletonFill)(theme);
}
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
function spokenLine(parts) {
    return parts
        .filter((part) => part != null && part !== '')
        .map(String)
        .join(', ');
}
//# sourceMappingURL=menu-v4.js.map