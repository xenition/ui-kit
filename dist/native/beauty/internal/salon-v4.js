"use strict";
/**
 * The `beauty` module's own V4 vocabulary.
 *
 * The tone tables live in `primitives/internal/tone-v4`, promoted out of
 * `agriculture` once three verticals needed them. What stays here is the part
 * that is genuinely this module's: the price-comparison rule and the two
 * geometry constants its image components share.
 *
 * Nothing here is exported from the package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DRAG_SLOP = exports.HANDLE_STEP = exports.toneInk = exports.toneFill = exports.skeletonFill = exports.ratingParts = exports.onPair = exports.metaLine = exports.clampPercent = void 0;
exports.compareAtCents = compareAtCents;
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "clampPercent", { enumerable: true, get: function () { return tone_v4_1.clampPercent; } });
Object.defineProperty(exports, "metaLine", { enumerable: true, get: function () { return tone_v4_1.metaLine; } });
Object.defineProperty(exports, "onPair", { enumerable: true, get: function () { return tone_v4_1.onPair; } });
Object.defineProperty(exports, "ratingParts", { enumerable: true, get: function () { return tone_v4_1.ratingParts; } });
Object.defineProperty(exports, "skeletonFill", { enumerable: true, get: function () { return tone_v4_1.skeletonFill; } });
Object.defineProperty(exports, "toneFill", { enumerable: true, get: function () { return tone_v4_1.toneFill; } });
Object.defineProperty(exports, "toneInk", { enumerable: true, get: function () { return tone_v4_1.toneInk; } });
/**
 * The struck "was" price, or `null`.
 *
 * `PriceListRow` and `ProductRecommendation` both carry a compare-at and
 * neither drew it. The rule is the one `PlanSelectorV4` settled: a compare-at
 * that is **not higher** than the price it is compared against is a fabricated
 * discount, and the component declines to draw one. Unlike the plan card these
 * are integer cents, so the comparison is a real one rather than a string
 * equality.
 */
function compareAtCents(price, compareAt) {
    if (typeof price !== 'number' || typeof compareAt !== 'number')
        return null;
    if (!Number.isFinite(price) || !Number.isFinite(compareAt))
        return null;
    return compareAt > price ? compareAt : null;
}
/**
 * The before/after divider's grab width.
 *
 * Wide enough to hit with a thumb, drawn narrow. The visible rule stays a
 * hairline; the *target* is this.
 */
exports.HANDLE_STEP = 1.5;
/** How far a drag must travel before it counts as one rather than a tap. */
exports.DRAG_SLOP = 4;
//# sourceMappingURL=salon-v4.js.map