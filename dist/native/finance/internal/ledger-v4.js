"use strict";
/**
 * The `finance` module's own V4 vocabulary (native) — the twin of
 * `finance/internal/ledger-v4.ts`.
 *
 * Nothing here is exported from the package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TABULAR = exports.BADGE_V4 = exports.IDENTITY_TONE = exports.toneInk = exports.toneFill = exports.skeletonFill = exports.signParts = exports.ratePrecision = exports.pctText = exports.onPair = exports.meterParts = exports.lineTotal = void 0;
exports.moneyInk = moneyInk;
exports.placeholderGround = placeholderGround;
exports.spokenLine = spokenLine;
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "onPair", { enumerable: true, get: function () { return tone_v4_1.onPair; } });
Object.defineProperty(exports, "skeletonFill", { enumerable: true, get: function () { return tone_v4_1.skeletonFill; } });
Object.defineProperty(exports, "toneFill", { enumerable: true, get: function () { return tone_v4_1.toneFill; } });
Object.defineProperty(exports, "toneInk", { enumerable: true, get: function () { return tone_v4_1.toneInk; } });
const money_v4_1 = require("../../../finance/money-v4");
Object.defineProperty(exports, "lineTotal", { enumerable: true, get: function () { return money_v4_1.lineTotal; } });
Object.defineProperty(exports, "meterParts", { enumerable: true, get: function () { return money_v4_1.meterParts; } });
Object.defineProperty(exports, "pctText", { enumerable: true, get: function () { return money_v4_1.pctText; } });
Object.defineProperty(exports, "ratePrecision", { enumerable: true, get: function () { return money_v4_1.ratePrecision; } });
Object.defineProperty(exports, "signParts", { enumerable: true, get: function () { return money_v4_1.signParts; } });
/**
 * Money as the contrast-corrected **ink**.
 *
 * The native twin already draws money with the `*Text` slots. What it does
 * **not** do is use `mutedText`: `colors.muted` appears as a text colour in
 * thirteen native files, and `muted` carries no contrast promise — the theme
 * added `mutedText` for exactly this. `MoneyAmount`'s `tone="muted"` means a
 * real balance is drawn in it.
 */
function moneyInk(theme, tone) {
    return (0, tone_v4_1.toneInk)(theme, tone);
}
/**
 * An account type, a card network and a payment default are **identity**.
 *
 * `AccountCard` gave a savings account `success` — a savings account is not
 * "healthy" — and `PaymentMethodRow` gave its "Default" badge `success` too.
 * Both sat next to a `MoneyAmount` whose green means income.
 */
exports.IDENTITY_TONE = 'neutral';
/** One badge shape for the whole module. */
exports.BADGE_V4 = { variant: 'soft', size: 'sm' };
/** Every figure in this module stacks in a column. */
exports.TABULAR = { fontVariant: ['tabular-nums'] };
/** The ground behind a skeleton — never `border`, never a ramp step. */
function placeholderGround(theme) {
    return (0, tone_v4_1.skeletonFill)(theme);
}
/**
 * Build the one accessible name an interactive finance row should carry.
 *
 * Six components put a short label on the interactive root, which **replaces**
 * the subtree — and in every case the pruned content was the numeric payload
 * the component exists to display. A reader heard "Whole Foods, button" and
 * never learned it was −$84.12.
 */
function spokenLine(parts) {
    return parts
        .filter((part) => part != null && part !== '')
        .map(String)
        .join(', ');
}
//# sourceMappingURL=ledger-v4.js.map