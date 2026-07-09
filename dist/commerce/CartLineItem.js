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
exports.CartLineItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const GenerativeCover_1 = require("../marketing/GenerativeCover");
const QuantityStepper_1 = require("./QuantityStepper");
const money_1 = require("./money");
/**
 * One line in a cart: thumbnail (image or seeded cover), title + variant, a
 * {@link QuantityStepper}, the line total (`unitPrice × quantity`), and a
 * remove control. Token-only. Money is integer cents throughout.
 */
exports.CartLineItem = React.forwardRef(function CartLineItem({ title, variantTitle, quantity, unitPriceCents, currency = 'USD', imageUrl, imageAlt, slug, onQuantityChange, onRemove, min = 1, max, removeLabel, formatMoney: format = money_1.formatMoney, className, ...rest }, ref) {
    const lineTotal = unitPriceCents * quantity;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-cart-line-item": "", className: (0, cn_1.cn)('flex items-start gap-[var(--xen-space-md)] py-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-16 w-16 shrink-0 overflow-hidden rounded-[var(--xen-radius-md)] border border-border bg-neutral-100", children: imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: imageAlt ?? title, loading: "lazy", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)(GenerativeCover_1.GenerativeCover, { seed: slug ?? title, label: title, className: "h-full w-full" })) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate font-heading text-sm font-semibold text-on-surface", children: title }), variantTitle ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: variantTitle })) : null] }), onQuantityChange ? ((0, jsx_runtime_1.jsx)(QuantityStepper_1.QuantityStepper, { value: quantity, min: min, max: max, onChange: onQuantityChange, label: `Quantity for ${title}` })) : ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["Qty ", quantity] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { "data-xen-line-total": "", className: "font-heading text-sm font-semibold text-on-surface", children: format(lineTotal, currency) }), onRemove ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onRemove, "aria-label": removeLabel ?? `Remove ${title}`, className: "text-xs text-muted underline-offset-2 hover:text-danger hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger", children: "Remove" })) : null] })] }));
});
//# sourceMappingURL=CartLineItem.js.map