"use strict";
/**
 * The `crypto` module's own V4 vocabulary (native) — the twin of
 * `crypto/internal/market-v4.ts`.
 *
 * The base module already had `internal/format.ts`, which is mostly good and
 * stays untouched. This file corrects the two things it got wrong and adds
 * what the V4 line needs.
 *
 * Nothing here is exported from the package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BADGE_V4 = exports.TABULAR = exports.toneInk = exports.toneFill = exports.skeletonFill = exports.onPair = exports.changeParts = void 0;
exports.changeInk = changeInk;
exports.spokenLine = spokenLine;
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "onPair", { enumerable: true, get: function () { return tone_v4_1.onPair; } });
Object.defineProperty(exports, "skeletonFill", { enumerable: true, get: function () { return tone_v4_1.skeletonFill; } });
Object.defineProperty(exports, "toneFill", { enumerable: true, get: function () { return tone_v4_1.toneFill; } });
Object.defineProperty(exports, "toneInk", { enumerable: true, get: function () { return tone_v4_1.toneInk; } });
const amount_v4_1 = require("../../../crypto/amount-v4");
Object.defineProperty(exports, "changeParts", { enumerable: true, get: function () { return amount_v4_1.changeParts; } });
/**
 * A change tone as the contrast-corrected **ink**.
 *
 * `internal/format.ts`'s `changeToneKey()` returns `keyof SemanticColors` — a
 * raw **fill** slot — which twelve native call sites then use as a text
 * colour. The theme ships `*Text` slots for exactly this and a rendered audit
 * measured the fill-as-text case at 1.32:1. The V2/V3 lines already fixed it;
 * the base line is the regression.
 */
function changeInk(theme, tone) {
    return (0, tone_v4_1.toneInk)(theme, tone);
}
/** Money and every figure that stacks in a column. */
exports.TABULAR = { fontVariant: ['tabular-nums'] };
/**
 * One badge shape for the whole module.
 *
 * Web took `Badge`'s `solid` default while native passed `variant="soft"
 * size="sm"`, so a hardware wallet was a filled green pill on web and a small
 * neutral chip on native.
 */
exports.BADGE_V4 = { variant: 'soft', size: 'sm' };
/**
 * Build the one accessible name an interactive crypto row should carry.
 *
 * Seven components put a short label — `ETH holding`, `BTC price`,
 * `Transaction 0x12…cdef` — on the interactive root, which **replaces** the
 * subtree. No number in this module was ever announced: not the quantity, not
 * the fiat value, not the change, not the gas price. Commas, not a middle dot,
 * because a reader either says "middle dot" out loud or swallows the pause.
 */
function spokenLine(parts) {
    return parts
        .filter((part) => part != null && part !== '')
        .map(String)
        .join(', ');
}
//# sourceMappingURL=market-v4.js.map