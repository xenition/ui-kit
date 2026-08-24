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
exports.CartSummaryV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Button_1 = require("../primitives/Button");
const money_1 = require("./money");
/**
 * CartSummary — design variant **V2**: an **elevated receipt** with a
 * highlighted total band. Where the base is a flat bordered list, V2 floats on a
 * drop-shadow, separates the running lines from the total with a **dashed
 * perforation**, and drops the grand total into a primary-tinted band so the
 * amount owed is unmistakable. Same props as {@link CartSummaryProps}.
 * Token-only; money is integer cents.
 */
exports.CartSummaryV2 = React.forwardRef(function CartSummaryV2({ subtotalCents, shippingCents, taxCents, discountCents, totalCents, currency = 'USD', onCheckout, checkoutLabel = 'Checkout', formatMoney: format = money_1.formatMoney, className, ...rest }, ref) {
    const row = (label, value, key) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between text-sm text-on-surface", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-muted", children: label }), (0, jsx_runtime_1.jsx)("span", { className: "tabular-nums", children: value })] }, key));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-cart-summary": "", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] bg-surface p-[var(--xen-space-lg)] shadow-lg', className), ...rest, children: [row('Subtotal', format(subtotalCents, currency), 'subtotal'), typeof shippingCents === 'number'
                ? row('Shipping', shippingCents === 0 ? 'Free' : format(shippingCents, currency), 'shipping')
                : null, typeof taxCents === 'number' ? row('Tax', format(taxCents, currency), 'tax') : null, typeof discountCents === 'number' && discountCents > 0
                ? row('Discount', `−${format(discountCents, currency)}`, 'discount')
                : null, (0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "my-[var(--xen-space-xs)] border-t border-dashed border-border" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between rounded-[var(--xen-radius-md)] bg-primary/10 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-heading text-base font-semibold text-on-surface", children: "Total" }), (0, jsx_runtime_1.jsx)("span", { "data-xen-cart-total": "", className: "font-heading text-lg font-bold tabular-nums text-primary", children: format(totalCents, currency) })] }), onCheckout ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { type: "button", size: "md", onClick: onCheckout, className: "mt-[var(--xen-space-xs)] w-full", children: checkoutLabel })) : null] }));
});
//# sourceMappingURL=CartSummaryV2.js.map