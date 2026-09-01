"use strict";
/**
 * The `food` module's own V4 vocabulary (web) — the twin of
 * `native/food/internal/menu-v4.ts`.
 *
 * Nothing here is exported from the package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLACEHOLDER_CLASS = exports.TABULAR_CLASS = exports.BADGE_V4 = exports.TONE_ON = exports.TONE_INK = exports.stepQuantity = exports.stageIndex = exports.SKELETON_CLASS = exports.ORDER_STAGES = exports.DIET_TONE = exports.deliveryWindow = void 0;
exports.spokenLine = spokenLine;
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "SKELETON_CLASS", { enumerable: true, get: function () { return tone_v4_1.SKELETON_CLASS; } });
Object.defineProperty(exports, "TONE_INK", { enumerable: true, get: function () { return tone_v4_1.TONE_INK; } });
Object.defineProperty(exports, "TONE_ON", { enumerable: true, get: function () { return tone_v4_1.TONE_ON; } });
const order_v4_1 = require("../order-v4");
Object.defineProperty(exports, "deliveryWindow", { enumerable: true, get: function () { return order_v4_1.deliveryWindow; } });
Object.defineProperty(exports, "DIET_TONE", { enumerable: true, get: function () { return order_v4_1.DIET_TONE; } });
Object.defineProperty(exports, "ORDER_STAGES", { enumerable: true, get: function () { return order_v4_1.ORDER_STAGES; } });
Object.defineProperty(exports, "stageIndex", { enumerable: true, get: function () { return order_v4_1.stageIndex; } });
Object.defineProperty(exports, "stepQuantity", { enumerable: true, get: function () { return order_v4_1.stepQuantity; } });
/** One badge shape for the whole module. */
exports.BADGE_V4 = { variant: 'soft', size: 'sm' };
/** Prices, deltas and bucket counts all stack in a column. */
exports.TABULAR_CLASS = 'tabular-nums';
/** The ground behind a skeleton or an unloaded photo — never a ramp step. */
exports.PLACEHOLDER_CLASS = tone_v4_1.SKELETON_CLASS;
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