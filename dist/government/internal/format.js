"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMoney = void 0;
exports.formatPct = formatPct;
/**
 * Shared internals for the web government / civic module. Money re-uses the
 * single kit-wide `formatMoney` home (integer **cents** → two-decimal localized
 * string, no float drift). Web tints are painted with token utility classes
 * (never an `rgba()` literal), so — unlike the native module — there is no
 * `withAlpha` here; a tone → token-class map lives in `./tint`. Mirror of the
 * native module's `internal/format.ts`.
 */
const money_1 = require("../../commerce/money");
Object.defineProperty(exports, "formatMoney", { enumerable: true, get: function () { return money_1.formatMoney; } });
/** Format a whole percentage (0–100) with no decimals; guards non-finite. */
function formatPct(value) {
    const v = Number.isFinite(value) ? Math.round(value) : 0;
    return `${Math.max(0, Math.min(100, v))}%`;
}
//# sourceMappingURL=format.js.map