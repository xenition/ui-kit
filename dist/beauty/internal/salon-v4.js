"use strict";
/**
 * The `beauty` module's own V4 vocabulary (web) — the twin of
 * `native/beauty/internal/salon-v4.ts`.
 *
 * The tone tables live in `primitives/internal/tone-v4`, promoted out of
 * `agriculture` once three verticals needed them. What stays here is the
 * price-comparison rule, which is this module's own.
 *
 * Nothing here is exported from the package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toneGround = exports.TONE_VAR = exports.TONE_ON = exports.TONE_INK = exports.TONE_BG = exports.SKELETON_CLASS = exports.ratingParts = exports.metaLine = exports.clampPercent = void 0;
exports.compareAtCents = compareAtCents;
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "clampPercent", { enumerable: true, get: function () { return tone_v4_1.clampPercent; } });
Object.defineProperty(exports, "metaLine", { enumerable: true, get: function () { return tone_v4_1.metaLine; } });
Object.defineProperty(exports, "ratingParts", { enumerable: true, get: function () { return tone_v4_1.ratingParts; } });
Object.defineProperty(exports, "SKELETON_CLASS", { enumerable: true, get: function () { return tone_v4_1.SKELETON_CLASS; } });
Object.defineProperty(exports, "TONE_BG", { enumerable: true, get: function () { return tone_v4_1.TONE_BG; } });
Object.defineProperty(exports, "TONE_INK", { enumerable: true, get: function () { return tone_v4_1.TONE_INK; } });
Object.defineProperty(exports, "TONE_ON", { enumerable: true, get: function () { return tone_v4_1.TONE_ON; } });
Object.defineProperty(exports, "TONE_VAR", { enumerable: true, get: function () { return tone_v4_1.TONE_VAR; } });
Object.defineProperty(exports, "toneGround", { enumerable: true, get: function () { return tone_v4_1.toneGround; } });
/**
 * The struck "was" price in cents, or `null`.
 *
 * `PriceListRow` and `ProductRecommendation` both carry a compare-at and
 * neither drew it. The rule is the one `PlanSelectorV4` settled: a compare-at
 * that is **not higher** than the price is a fabricated discount, and the
 * component declines to draw one.
 */
function compareAtCents(price, compareAt) {
    if (typeof price !== 'number' || typeof compareAt !== 'number')
        return null;
    if (!Number.isFinite(price) || !Number.isFinite(compareAt))
        return null;
    return compareAt > price ? compareAt : null;
}
//# sourceMappingURL=salon-v4.js.map