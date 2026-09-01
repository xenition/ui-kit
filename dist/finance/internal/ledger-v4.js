"use strict";
/**
 * The `finance` module's own V4 vocabulary (web) — the twin of
 * `native/finance/internal/ledger-v4.ts`.
 *
 * Nothing here is exported from the package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLACEHOLDER_CLASS = exports.TABULAR_CLASS = exports.BADGE_V4 = exports.IDENTITY_TONE = exports.TONE_ON = exports.TONE_INK = exports.SKELETON_CLASS = exports.signParts = exports.ratePrecision = exports.pctText = exports.meterParts = exports.lineTotal = void 0;
exports.moneyInkClass = moneyInkClass;
exports.spokenLine = spokenLine;
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "SKELETON_CLASS", { enumerable: true, get: function () { return tone_v4_1.SKELETON_CLASS; } });
Object.defineProperty(exports, "TONE_INK", { enumerable: true, get: function () { return tone_v4_1.TONE_INK; } });
Object.defineProperty(exports, "TONE_ON", { enumerable: true, get: function () { return tone_v4_1.TONE_ON; } });
const money_v4_1 = require("../money-v4");
Object.defineProperty(exports, "lineTotal", { enumerable: true, get: function () { return money_v4_1.lineTotal; } });
Object.defineProperty(exports, "meterParts", { enumerable: true, get: function () { return money_v4_1.meterParts; } });
Object.defineProperty(exports, "pctText", { enumerable: true, get: function () { return money_v4_1.pctText; } });
Object.defineProperty(exports, "ratePrecision", { enumerable: true, get: function () { return money_v4_1.ratePrecision; } });
Object.defineProperty(exports, "signParts", { enumerable: true, get: function () { return money_v4_1.signParts; } });
/**
 * Money as the contrast-corrected **ink**.
 *
 * `MoneyAmount` painted amounts `text-success` / `text-danger` — **fill**
 * tokens, which a rendered audit measured at 1.32:1 as text. The native twin
 * had already migrated to the `*Text` slots and carries a comment saying why;
 * the web twin missed the migration wholesale, and because every component in
 * the module routes its figures through `MoneyAmount`, all thirteen inherited
 * it.
 */
function moneyInkClass(tone) {
    return tone_v4_1.TONE_INK[tone];
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
exports.TABULAR_CLASS = 'tabular-nums';
/** The ground behind a skeleton — never `border`, never a ramp step. */
exports.PLACEHOLDER_CLASS = tone_v4_1.SKELETON_CLASS;
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