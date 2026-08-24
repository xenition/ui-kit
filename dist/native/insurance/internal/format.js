"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMoney = void 0;
exports.withAlpha = withAlpha;
exports.formatPct = formatPct;
/**
 * Shared internals for the native insurance module. Money re-uses the single
 * kit-wide `formatMoney` home (integer **cents** → two-decimal localized string,
 * no float drift), and `withAlpha` derives a translucent tint from a token hex
 * so tints never introduce a literal color (mirrors the primitives' pattern).
 */
const money_1 = require("../../commerce/money");
Object.defineProperty(exports, "formatMoney", { enumerable: true, get: function () { return money_1.formatMoney; } });
/**
 * Token-derived translucent tint. Takes a resolved token hex (from
 * `colors.*` or `tokens.ramps.*`) and returns an `rgba()` string — never a
 * hardcoded literal, so the token-purity invariant holds.
 */
function withAlpha(hex, alpha) {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
/** Format a whole percentage (0–100) with no decimals; guards non-finite. */
function formatPct(value) {
    const v = Number.isFinite(value) ? Math.round(value) : 0;
    return `${v}%`;
}
//# sourceMappingURL=format.js.map