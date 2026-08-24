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
exports.CartSummaryV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Button_1 = require("../primitives/Button");
const money_1 = require("./money");
/**
 * CartSummary — design variant **V3**: **minimal and total-first**. Where the
 * base and V2 build up subtotal → … → total, V3 leads with the grand total set
 * large under a small tracked caption, then lists the muted breakdown lines
 * beneath it as fine print. No box, no shadow — just type hierarchy and a
 * full-width checkout. Same props as {@link CartSummaryProps}. Token-only;
 * money is integer cents.
 */
exports.CartSummaryV3 = React.forwardRef(function CartSummaryV3({ subtotalCents, shippingCents, taxCents, discountCents, totalCents, currency = 'USD', onCheckout, checkoutLabel = 'Checkout', formatMoney: format = money_1.formatMoney, className, ...rest }, ref) {
    const line = (label, value, key) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between text-xs text-muted", children: [(0, jsx_runtime_1.jsx)("span", { children: label }), (0, jsx_runtime_1.jsx)("span", { className: "tabular-nums", children: value })] }, key));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-cart-summary": "", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold uppercase tracking-wide text-muted", children: "Total" }), (0, jsx_runtime_1.jsx)("span", { "data-xen-cart-total": "", className: "font-heading text-3xl font-bold tabular-nums text-on-surface", children: format(totalCents, currency) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [line('Subtotal', format(subtotalCents, currency), 'subtotal'), typeof shippingCents === 'number'
                        ? line('Shipping', shippingCents === 0 ? 'Free' : format(shippingCents, currency), 'shipping')
                        : null, typeof taxCents === 'number' ? line('Tax', format(taxCents, currency), 'tax') : null, typeof discountCents === 'number' && discountCents > 0
                        ? line('Discount', `−${format(discountCents, currency)}`, 'discount')
                        : null] }), onCheckout ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { type: "button", size: "lg", onClick: onCheckout, className: "w-full", children: checkoutLabel })) : null] }));
});
//# sourceMappingURL=CartSummaryV3.js.map