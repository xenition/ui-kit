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
exports.CheckoutSummaryV2 = exports.OrderSummaryV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const StatusBadge_1 = require("./StatusBadge");
const money_1 = require("./money");
/**
 * OrderSummary — design variant **V2**: an **elevated receipt**. Where the base
 * is a flat bordered recap, V2 floats on a shadow, prefixes each line with a
 * neutral **`×qty` chip**, separates items from totals with a **dashed
 * perforation**, and drops the grand total into a primary-tinted band. Same
 * props as {@link OrderSummaryProps}. Read-only; token-only; integer cents.
 */
exports.OrderSummaryV2 = React.forwardRef(function OrderSummaryV2({ items, subtotalCents, shippingCents, taxCents, totalCents, currency = 'USD', status, orderNumber, title = 'Order summary', formatMoney: format = money_1.formatMoney, className, ...rest }, ref) {
    const totalRow = (label, value, key) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between text-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-muted", children: label }), (0, jsx_runtime_1.jsx)("span", { className: "tabular-nums text-on-surface", children: value })] }, key));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-order-summary": "", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] bg-surface p-[var(--xen-space-lg)] shadow-lg', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-col", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-heading text-lg font-bold text-on-surface", children: title }), orderNumber ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["#", orderNumber] }) : null] }), status ? (0, jsx_runtime_1.jsx)(StatusBadge_1.StatusBadge, { status: status }) : null] }), (0, jsx_runtime_1.jsx)("ul", { className: "flex flex-col gap-[var(--xen-space-sm)]", children: items.map((item, i) => ((0, jsx_runtime_1.jsxs)("li", { "data-xen-order-line": "", className: "flex items-start gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsxs)("span", { className: "shrink-0 rounded-[var(--xen-radius-sm)] bg-neutral-100 px-[var(--xen-space-xs)] py-0.5 text-xs font-semibold tabular-nums text-muted", children: ["\u00D7", item.quantity] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-on-surface", children: item.title }), item.variantTitle ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: item.variantTitle })) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-sm tabular-nums text-on-surface", children: format(item.unitPriceCents * item.quantity, currency) })] }, i))) }), (0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "border-t border-dashed border-border" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [totalRow('Subtotal', format(subtotalCents, currency), 'subtotal'), typeof shippingCents === 'number'
                        ? totalRow('Shipping', shippingCents === 0 ? 'Free' : format(shippingCents, currency), 'shipping')
                        : null, typeof taxCents === 'number' ? totalRow('Tax', format(taxCents, currency), 'tax') : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between rounded-[var(--xen-radius-md)] bg-primary/10 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-heading text-base font-semibold text-on-surface", children: "Total" }), (0, jsx_runtime_1.jsx)("span", { "data-xen-order-total": "", className: "font-heading text-lg font-bold tabular-nums text-primary", children: format(totalCents, currency) })] })] }));
});
exports.CheckoutSummaryV2 = exports.OrderSummaryV2;
//# sourceMappingURL=OrderSummaryV2.js.map