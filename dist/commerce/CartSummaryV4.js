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
exports.CartSummaryV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const TextV4_1 = require("../primitives/TextV4");
const cn_1 = require("../primitives/cn");
const money_1 = require("./money");
const money_v4_1 = require("./internal/money-v4");
/**
 * **V4 cart summary** — the web twin of the native `CartSummaryV4`, the base
 * {@link CartSummary}'s props plus {@link CartSummaryV4Props.itemCount} and
 * {@link CartSummaryV4Props.note}, a different design line.
 *
 * With `OrderSummaryV4` this is the densest money surface in the kit: a label
 * column, a figure column, one rule, a total. Five changes.
 *
 * 1. **The row metric.** Every line takes the row family's one-line height
 *    (M3's 56) and its 16 gutters, imported from
 *    `dashboard/internal/row-v4.ts` via `internal/money-v4.ts` rather than
 *    restated — so the `Subtotal` line and the `CartLineItemV4` above it are
 *    the same object at two settings, which is what makes a cart read as one
 *    list instead of a list and then a box.
 * 2. **One rule, above the total, and nothing else.** The V4 data line keeps
 *    exactly one horizontal rule and lets spacing do the rest
 *    (`primitives/internal/v4-data.ts`, §9). The base drew its rule as a
 *    `border-t` plus a `mt-xs` on a wrapper, which is two decisions for one
 *    hairline.
 * 3. **The total is one step up the type scale, not a colour.** `base` → `lg`.
 *    The base set the total at `text-base` — the same size as the tax line
 *    above it — so the one figure the surface exists to deliver had no more
 *    weight than its own inputs (§6: hierarchy before styling). It is
 *    emphatically **not** tinted: brief §1.3 reserves `success`/`warn`/`danger`
 *    for good, caution and bad, and a total is none of the three.
 * 4. **Tabular figures.** Every amount, via `TextV4 numeric="tabular"`. A
 *    column of prices only reads as a column if the digits line up; with
 *    proportional figures `$9.99` and `$11.11` are different widths and there
 *    is no edge to scan down (brief §1.2, §33).
 * 5. **The ground is `card`, not `surface`** (brief §1.4). The base painted the
 *    page colour and leaned on a border, which is why a summary on a dark page
 *    read as a flat rectangle with a line round it.
 *
 * **The discount line is not green and not red.** It is the same `base`
 * `onSurface` figure as every other row, carrying a minus sign. A discount is
 * *emphasis*, not status — the same call `PriceTagV4` makes about a sale price,
 * for the same reason: spending the status palette on good news teaches the
 * reader to distrust it when it is actually bad news (§35.4).
 *
 * Money still goes through {@link formatMoney}, overridable per call, and
 * nowhere else.
 */
exports.CartSummaryV4 = React.forwardRef(function CartSummaryV4({ subtotalCents, shippingCents, taxCents, discountCents, totalCents, currency = 'USD', onCheckout, checkoutLabel = 'Checkout', formatMoney: format = money_1.formatMoney, itemCount, note, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(money_v4_1.MONEY_V4_STYLE_ID, money_v4_1.MONEY_V4_CSS);
    const row = (key, label, value) => ((0, jsx_runtime_1.jsxs)("div", { "data-xen-summary-row": key, className: money_v4_1.SUMMARY_ROW_CLASS, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: money_v4_1.MONEY_LABEL_SIZE, tone: "mutedText", children: label }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: money_v4_1.MONEY_VALUE_SIZE, tone: "onSurface", numeric: "tabular", children: value })] }, key));
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, variant: "elevated", radius: "lg", 
        // The card never pays the padding — the rows do, from the row metric's
        // own `padX`. That is what lets the one rule run flush edge to edge
        // while the labels still line up with the total underneath it.
        padding: "none", "data-xen-cart-summary": "", "data-xen-v4-money-ground": "card", className: (0, cn_1.cn)('flex flex-col py-sm', className), ...rest, children: [row('subtotal', (0, money_v4_1.subtotalLabel)(itemCount), format(subtotalCents, currency)), typeof shippingCents === 'number'
                ? row('shipping', 'Shipping', shippingCents === 0 ? 'Free' : format(shippingCents, currency))
                : null, typeof taxCents === 'number' ? row('tax', 'Tax', format(taxCents, currency)) : null, typeof discountCents === 'number' && discountCents > 0
                ? // A minus sign and the ordinary figure treatment. Not `success`,
                    // not `danger` — see the component doc.
                    row('discount', 'Discount', `−${format(discountCents, currency)}`)
                : null, (0, jsx_runtime_1.jsx)("div", { "data-xen-summary-rule": "", role: "presentation", className: money_v4_1.SUMMARY_RULE_CLASS }), (0, jsx_runtime_1.jsxs)("div", { "data-xen-summary-row": "total", className: money_v4_1.SUMMARY_ROW_CLASS, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: money_v4_1.MONEY_TOTAL_SIZE, weight: "semibold", tone: "onSurface", children: "Total" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { "data-xen-cart-total": "", size: money_v4_1.MONEY_TOTAL_SIZE, weight: "bold", tone: "onSurface", numeric: "tabular", children: format(totalCents, currency) })] }), note != null && note !== '' ? ((0, jsx_runtime_1.jsx)("div", { "data-xen-summary-note": "", className: "px-md pb-sm", children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: note }) })) : null, onCheckout ? (
            // Inset by the row gutter so the CTA lines up with the column of
            // figures above it rather than running to the card's own edge (HIG:
            // a full-width button is inset, aligned with adjacent margins).
            (0, jsx_runtime_1.jsx)("div", { className: "px-md pb-sm pt-xs", children: (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { type: "button", size: "md", onClick: onCheckout, className: "w-full", children: checkoutLabel }) })) : null] }));
});
//# sourceMappingURL=CartSummaryV4.js.map