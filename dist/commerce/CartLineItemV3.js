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
exports.CartLineItemV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const GenerativeCover_1 = require("../marketing/GenerativeCover");
const QuantityStepper_1 = require("./QuantityStepper");
const money_1 = require("./money");
/**
 * CartLineItem — design variant **V3**: a **compact, dense single row**. Where
 * the base stacks each field into its own column and V2 is an elevated card, V3
 * packs a small thumbnail, the title with an inline `·` variant, the stepper (or
 * a `×qty` chip), the line total, and a tiny remove `×` onto one tight line
 * separated only by a hairline underline — built for long, scannable carts.
 * Same props as {@link CartLineItemProps}. Token-only; money is integer cents.
 */
exports.CartLineItemV3 = React.forwardRef(function CartLineItemV3({ title, variantTitle, quantity, unitPriceCents, currency = 'USD', imageUrl, imageAlt, slug, onQuantityChange, onRemove, min = 1, max, removeLabel, formatMoney: format = money_1.formatMoney, className, ...rest }, ref) {
    const lineTotal = unitPriceCents * quantity;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-cart-line-item": "", className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] border-b border-border py-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-9 w-9 shrink-0 overflow-hidden rounded-[var(--xen-radius-sm)] bg-neutral-100", children: imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: imageAlt ?? title, loading: "lazy", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)(GenerativeCover_1.GenerativeCover, { seed: slug ?? title, label: title, className: "h-full w-full" })) }), (0, jsx_runtime_1.jsxs)("p", { className: "min-w-0 flex-1 truncate text-sm text-on-surface", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-semibold", children: title }), variantTitle ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [" \u00B7 ", variantTitle] }) : null] }), onQuantityChange ? ((0, jsx_runtime_1.jsx)(QuantityStepper_1.QuantityStepper, { value: quantity, min: min, max: max, onChange: onQuantityChange, label: `Quantity for ${title}` })) : ((0, jsx_runtime_1.jsxs)("span", { className: "shrink-0 text-xs text-muted", children: ["\u00D7", quantity] })), (0, jsx_runtime_1.jsx)("span", { "data-xen-line-total": "", className: "w-14 shrink-0 text-right text-sm font-semibold tabular-nums text-on-surface", children: format(lineTotal, currency) }), onRemove ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onRemove, "aria-label": removeLabel ?? `Remove ${title}`, className: "shrink-0 rounded-[var(--xen-radius-sm)] px-[var(--xen-space-xs)] text-base leading-none text-muted transition-colors hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u00D7" }) })) : null] }));
});
//# sourceMappingURL=CartLineItemV3.js.map