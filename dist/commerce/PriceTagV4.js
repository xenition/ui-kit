"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceTagV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const money_1 = require("./money");
/**
 * The price's own step, one up from the base at every size.
 *
 * A price is the number a shopper decides on, and the base topped out at
 * `text-base` for `md` — a caption size for the most important figure on a
 * product card. §6 puts hierarchy before styling: the fix is a bigger number,
 * not a decorated one.
 */
const PRICE = { sm: 'text-base', md: 'text-lg', lg: 'text-2xl' };
/**
 * The struck "was" price, always one step under the price it is struck
 * against. The base pinned it at `text-sm` regardless, so beside a large price
 * it read as an orphan rather than as the same fact, demoted.
 */
const WAS = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' };
/**
 * **V4 price tag** — the web twin of the native `PriceTagV4`, same props as
 * {@link PriceTag}, a different design line.
 *
 * The other component in the kit where a number is the hero. Every amount
 * still goes through {@link formatMoney} — integer cents in, a localized
 * currency string out, overridable per call — because a hand-written formatter
 * is how a kit ends up with `$1204.5` on one screen and `$1,204.50` on the
 * next.
 *
 * Four changes:
 *
 * 1. **Tabular figures.** A list of prices only reads as a list if the digits
 *    line up; with proportional figures `$9.99` and `$11.11` are different
 *    widths and the column has no edge to scan down (§33).
 * 2. **The display face, on both twins.** This twin already set
 *    `font-heading`; its native counterpart did not, so the same price was a
 *    different typeface on the two platforms. Fixed on the native side, kept
 *    here.
 * 3. **A price that reads as the decision.** One step up the scale at every
 *    size — `md` goes from `text-base` to `text-lg` — because the base was
 *    setting the most important figure on a product card at caption size (§6).
 * 4. **The "was" price is announced, not just struck through.** It becomes an
 *    `<s>` (semantically "no longer accurate", which is exactly what it is)
 *    carrying a `Was …` label, so a screen reader given two prices knows which
 *    is which instead of reading them as a pair. §46 puts that ahead of the
 *    design line.
 *
 * **A discounted price does not turn red.** §35.4 — semantic colours are not
 * brand colours, `danger` means danger, and a sale price painted in the error
 * tone teaches the reader to distrust the tone everywhere else in the app.
 *
 * **No badge, no container.** The percentage off is derivable from the two
 * props and deliberately not drawn: a price tag's job is the price, it is
 * composed inside cards and rows that have their own layout, and §7 gets the
 * last word on adding a second coloured element to a two-line component.
 */
exports.PriceTagV4 = React.forwardRef(function PriceTagV4({ cents, currency = 'USD', compareAtCents, formatMoney: format = money_1.formatMoney, size = 'md', className, ...rest }, ref) {
    const hasCompare = typeof compareAtCents === 'number' && compareAtCents > cents;
    const was = hasCompare ? format(compareAtCents, currency) : null;
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, "data-xen-price-tag": "", className: (0, cn_1.cn)('inline-flex items-baseline gap-[var(--xen-space-xs)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "data-xen-price": "", className: (0, cn_1.cn)('font-heading font-bold text-on-surface [font-variant-numeric:tabular-nums]', PRICE[size]), children: format(cents, currency) }), was !== null ? ((0, jsx_runtime_1.jsx)("s", { "data-xen-compare-at": "", "aria-label": `Was ${was}`, className: (0, cn_1.cn)('text-muted [font-variant-numeric:tabular-nums]', WAS[size]), children: was })) : null] }));
});
//# sourceMappingURL=PriceTagV4.js.map