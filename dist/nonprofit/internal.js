"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMoney = void 0;
exports.goalPct = goalPct;
/**
 * Shared internals for the `@xenition/ui/nonprofit` (web) module — the DOM
 * parity of `@xenition/ui/native/nonprofit`. No external deps: a re-export of
 * the single `formatMoney` home (so every nonprofit component prints money from
 * integer **cents** with a stable 2-decimal representation) and the
 * divide-by-zero-guarded `goalPct` helper shared by the progress meters.
 *
 * Unlike the native module there is no `withAlpha` here: on the web every color
 * traces to a `--xen-*` Tailwind token class, so translucent tints are drawn
 * with ramp classes (`bg-primary-50`, …) rather than an authored `rgba()`.
 */
var money_1 = require("../commerce/money");
Object.defineProperty(exports, "formatMoney", { enumerable: true, get: function () { return money_1.formatMoney; } });
/** Percent of `value` toward `goal`, guarded against a zero/negative goal, clamped to [0, 100]. */
function goalPct(value, goal) {
    if (!(goal > 0))
        return 0;
    return Math.max(0, Math.min(100, (value / goal) * 100));
}
//# sourceMappingURL=internal.js.map