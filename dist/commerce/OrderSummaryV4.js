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
exports.CheckoutSummaryV4 = exports.OrderSummaryV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const CardV4_1 = require("../primitives/CardV4");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const TextV4_1 = require("../primitives/TextV4");
const cn_1 = require("../primitives/cn");
const row_v4_1 = require("../dashboard/internal/row-v4");
const money_1 = require("./money");
const StatusBadgeV4_1 = require("./StatusBadgeV4");
const money_v4_1 = require("./internal/money-v4");
/**
 * **V4 order summary** — the web twin of the native `OrderSummaryV4`, the base
 * {@link OrderSummary}'s props plus {@link OrderSummaryV4Props.statusLabel} and
 * {@link OrderSummaryV4Props.empty}, a different design line.
 *
 * The read-only half of the money surface `CartSummaryV4` opens: a header, the
 * lines, the totals, one rule, the total. Everything `CartSummaryV4`'s doc says
 * about the row metric, the single rule, the total's type step, tabular figures
 * and the `card` ground applies here verbatim — the two are one recipe, held in
 * `internal/money-v4.ts`, which is the whole point. On top of that:
 *
 * 1. **The `divide-y` between order lines is gone.** The base drew a hairline
 *    between every line *and* a rule under the list *and* a rule above the
 *    total — three weights of separation on a surface whose entire job is one
 *    column of numbers. The V4 data line keeps **exactly one** horizontal rule
 *    and lets spacing do the rest (`primitives/internal/v4-data.ts`, §9), and
 *    that one rule sits above the total, because that is the only boundary a
 *    reader actually needs marked.
 * 2. **The status is `StatusBadgeV4`, not a pill this file drew** (brief §1.6,
 *    §1.7). The base composed the base `StatusBadge`, a tinted pill with a
 *    label and nothing else — so `paid` and `cancelled` differed only by hue.
 *    The V4 badge ships an icon *and* a word, and its status → tone / glyph /
 *    ink table lives in `internal/status-v4.ts` where both twins and every
 *    other component that prints a status read one copy of it.
 * 3. **The empty order renders an empty state**, not a bordered box with a
 *    header and a hole in it (§4.5).
 *
 * `CheckoutSummaryV4` is the same component under its checkout-time name,
 * exported from this file exactly as the base and both variants already do — it
 * has never had a file of its own and does not get one here.
 */
exports.OrderSummaryV4 = React.forwardRef(function OrderSummaryV4({ items, subtotalCents, shippingCents, taxCents, totalCents, currency = 'USD', status, statusLabel, orderNumber, title = 'Order summary', empty, formatMoney: format = money_1.formatMoney, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(money_v4_1.MONEY_V4_STYLE_ID, money_v4_1.MONEY_V4_CSS);
    const row = (key, label, value) => ((0, jsx_runtime_1.jsxs)("div", { "data-xen-summary-row": key, className: money_v4_1.SUMMARY_ROW_CLASS, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: money_v4_1.MONEY_LABEL_SIZE, tone: "mutedText", children: label }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: money_v4_1.MONEY_VALUE_SIZE, tone: "onSurface", numeric: "tabular", children: value })] }, key));
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, variant: "elevated", radius: "lg", padding: "none", "data-xen-order-summary": "", "data-xen-v4-money-ground": "card", className: (0, cn_1.cn)('flex flex-col py-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-md px-md pb-sm pt-xs", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-col gap-xs", children: [typeof title === 'string' ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "semibold", tone: "onSurface", children: title })) : (title), orderNumber ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: `#${orderNumber}` })) : null] }), status ? (
                    // §1.7: a V4 composite composes V4 children. `StatusBadgeV4` owns
                    // the status → tone / glyph / ink table for both twins (it lives in
                    // `internal/status-v4.ts`), so an order recap and an order list
                    // cannot show two different marks for "shipped" — and rule §1.6's
                    // "an icon AND a word" is answered in one place rather than in
                    // every component that happens to print a status.
                    (0, jsx_runtime_1.jsx)(StatusBadgeV4_1.StatusBadgeV4, { status: status, className: "shrink-0", children: statusLabel })) : null] }), items.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { "data-xen-order-empty": "", className: "px-md", children: (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: empty?.title ?? 'No items in this order', description: empty?.description, action: empty?.action }) })) : ((0, jsx_runtime_1.jsx)("ul", { "data-xen-order-lines": "", className: "flex flex-col", children: items.map((item, i) => ((0, jsx_runtime_1.jsxs)("li", { "data-xen-order-line": "", 
                    // The row metric again, two-line because a line carries a
                    // variant and a quantity under its title. No rule between
                    // lines — spacing is the separation (§9).
                    className: (0, cn_1.cn)('flex w-full items-start justify-between gap-md px-md py-sm', (0, row_v4_1.rowHeightClass)(true)), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", numberOfLines: 1, children: item.title }), item.variantTitle ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: item.variantTitle })) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: `Qty ${item.quantity}` })] }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { "data-xen-order-line-total": "", size: money_v4_1.MONEY_VALUE_SIZE, tone: "onSurface", numeric: "tabular", className: "shrink-0", children: format(item.unitPriceCents * item.quantity, currency) })] }, i))) })), row('subtotal', 'Subtotal', format(subtotalCents, currency)), typeof shippingCents === 'number'
                ? row('shipping', 'Shipping', shippingCents === 0 ? 'Free' : format(shippingCents, currency))
                : null, typeof taxCents === 'number' ? row('tax', 'Tax', format(taxCents, currency)) : null, (0, jsx_runtime_1.jsx)("div", { "data-xen-summary-rule": "", role: "presentation", className: money_v4_1.SUMMARY_RULE_CLASS }), (0, jsx_runtime_1.jsxs)("div", { "data-xen-summary-row": "total", className: money_v4_1.SUMMARY_ROW_CLASS, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: money_v4_1.MONEY_TOTAL_SIZE, weight: "semibold", tone: "onSurface", children: "Total" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { "data-xen-order-total": "", size: money_v4_1.MONEY_TOTAL_SIZE, weight: "bold", tone: "onSurface", numeric: "tabular", children: format(totalCents, currency) })] })] }));
});
exports.CheckoutSummaryV4 = exports.OrderSummaryV4;
//# sourceMappingURL=OrderSummaryV4.js.map