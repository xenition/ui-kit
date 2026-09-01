"use strict";
/**
 * The `crypto` module's own V4 vocabulary (web) — the twin of
 * `native/crypto/internal/market-v4.ts`.
 *
 * The base module already had `internal/format.ts`, which is mostly good and
 * stays untouched. This file corrects the two things it got wrong and adds
 * what the V4 line needs.
 *
 * Nothing here is exported from the package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BADGE_V4 = exports.PLACEHOLDER_CLASS = exports.TABULAR_CLASS = exports.TONE_ON = exports.TONE_INK = exports.SKELETON_CLASS = exports.changeParts = void 0;
exports.changeInkClass = changeInkClass;
exports.spokenLine = spokenLine;
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "SKELETON_CLASS", { enumerable: true, get: function () { return tone_v4_1.SKELETON_CLASS; } });
Object.defineProperty(exports, "TONE_INK", { enumerable: true, get: function () { return tone_v4_1.TONE_INK; } });
Object.defineProperty(exports, "TONE_ON", { enumerable: true, get: function () { return tone_v4_1.TONE_ON; } });
const amount_v4_1 = require("../amount-v4");
Object.defineProperty(exports, "changeParts", { enumerable: true, get: function () { return amount_v4_1.changeParts; } });
/**
 * A change tone as the contrast-corrected **ink** class.
 *
 * `internal/format.ts`'s `changeToneClass()` returns `text-success` /
 * `text-danger` / `text-muted` — **fill** tokens handed back for text. The
 * theme ships `*Text` slots for exactly this and a rendered audit measured the
 * fill-as-text case at 1.32:1. Every price in the module inherited it through
 * one helper, so this is one correction, not twelve.
 */
function changeInkClass(tone) {
    return tone_v4_1.TONE_INK[tone];
}
/** Money and every figure that stacks in a column. */
exports.TABULAR_CLASS = 'tabular-nums';
/** The ground behind a skeleton or an unloaded artwork — never `border`. */
exports.PLACEHOLDER_CLASS = tone_v4_1.SKELETON_CLASS;
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