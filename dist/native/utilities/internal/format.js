"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMoney = void 0;
exports.withAlpha = withAlpha;
exports.formatPct = formatPct;
exports.formatUsage = formatUsage;
exports.clamp = clamp;
/**
 * Shared internals for the native utilities (energy / bill-pay) module. Money
 * re-uses the single kit-wide `formatMoney` home (integer **cents** →
 * two-decimal localized string, no float drift), and `withAlpha` derives a
 * translucent tint from a resolved token hex so tints never introduce a literal
 * color (mirrors the primitives' pattern). `formatUsage` renders a metered
 * quantity + unit stably (fixed decimals, no `NaN` leak).
 */
const money_1 = require("../../commerce/money");
Object.defineProperty(exports, "formatMoney", { enumerable: true, get: function () { return money_1.formatMoney; } });
/**
 * Token-derived translucent tint. Takes a resolved token hex (from `colors.*`
 * or `tokens.ramps.*`) and returns an `rgba()` string — never a hardcoded
 * literal, so the token-purity invariant holds.
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
/**
 * Format a metered quantity with a unit suffix (e.g. `"842 kWh"`, `"3.40 m³"`).
 * Non-finite input collapses to `0`; `decimals` defaults to `0` for whole-unit
 * meters. The value never renders `NaN`/`Infinity`.
 */
function formatUsage(value, unit, decimals = 0) {
    const safe = Number.isFinite(value) ? value : 0;
    const d = Math.max(0, Math.trunc(decimals));
    return `${safe.toFixed(d)} ${unit}`;
}
/** Clamp a number into `[min, max]`, guarding non-finite input to `min`. */
function clamp(value, min, max) {
    if (!Number.isFinite(value))
        return min;
    return Math.min(Math.max(value, min), max);
}
//# sourceMappingURL=format.js.map