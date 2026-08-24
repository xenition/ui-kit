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
exports.CheckoutSummaryV3 = exports.OrderSummaryV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const StatusBadge_1 = require("./StatusBadge");
const money_1 = require("./money");
/**
 * OrderSummary — design variant **V3**: **minimal and total-first**. Where the
 * base and V2 lead with a header and itemized rows, V3 opens with the grand
 * total set large (status badge + order number tucked alongside as metadata),
 * then lists the line items and subtotal/shipping/tax beneath as muted fine
 * print. No box, no shadow. Same props as {@link OrderSummaryProps}. Read-only;
 * token-only; integer cents.
 */
exports.OrderSummaryV3 = React.forwardRef(function OrderSummaryV3({ items, subtotalCents, shippingCents, taxCents, totalCents, currency = 'USD', status, orderNumber, title = 'Order summary', formatMoney: format = money_1.formatMoney, className, ...rest }, ref) {
    const line = (label, value, key) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between text-xs text-muted", children: [(0, jsx_runtime_1.jsx)("span", { children: label }), (0, jsx_runtime_1.jsx)("span", { className: "tabular-nums", children: value })] }, key));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-order-summary": "", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [status || orderNumber ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [status ? (0, jsx_runtime_1.jsx)(StatusBadge_1.StatusBadge, { status: status }) : null, orderNumber ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["#", orderNumber] }) : null] })) : null, (0, jsx_runtime_1.jsx)("span", { "data-xen-order-total": "", className: "font-heading text-3xl font-bold tabular-nums text-on-surface", children: format(totalCents, currency) }), typeof title === 'string' ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold uppercase tracking-wide text-muted", children: title })) : (title)] }), (0, jsx_runtime_1.jsx)("ul", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: items.map((item, i) => ((0, jsx_runtime_1.jsxs)("li", { "data-xen-order-line": "", className: "flex items-baseline justify-between gap-[var(--xen-space-sm)] text-xs text-muted", children: [(0, jsx_runtime_1.jsxs)("span", { className: "min-w-0 flex-1 truncate", children: [item.title, item.variantTitle ? ` · ${item.variantTitle}` : '', " \u00D7", item.quantity] }), (0, jsx_runtime_1.jsx)("span", { className: "shrink-0 tabular-nums", children: format(item.unitPriceCents * item.quantity, currency) })] }, i))) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)] border-t border-border pt-[var(--xen-space-sm)]", children: [line('Subtotal', format(subtotalCents, currency), 'subtotal'), typeof shippingCents === 'number'
                        ? line('Shipping', shippingCents === 0 ? 'Free' : format(shippingCents, currency), 'shipping')
                        : null, typeof taxCents === 'number' ? line('Tax', format(taxCents, currency), 'tax') : null] })] }));
});
exports.CheckoutSummaryV3 = exports.OrderSummaryV3;
//# sourceMappingURL=OrderSummaryV3.js.map