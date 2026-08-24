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
exports.ProductRecommendation = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
/**
 * A retail product recommendation row for after-service upsell: thumbnail,
 * brand + name, a star rating, a highlighted "reason" line, the price, and an
 * add-to-bag CTA. `added` swaps the CTA to a done state; `soldOut` disables it
 * (state + label, not color alone). Missing image degrades to a token-tinted
 * square. Prices are integer cents via {@link formatMoney}. Token-only colors.
 */
exports.ProductRecommendation = React.forwardRef(function ProductRecommendation({ name, priceCents, currency = 'USD', brand, rating, imageUrl, reason, added = false, soldOut = false, formatMoney: format = commerce_1.formatMoney, addLabel = 'Add', onAdd, onClick, className, ...rest }, ref) {
    const priceText = format(priceCents, currency);
    const interactive = !!onClick;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-product-recommendation": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${brand ? `${brand} ` : ''}${name}, ${priceText}${soldOut ? ', sold out' : ''}${added ? ', in bag' : ''}`, onClick: onClick, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.currentTarget.click();
                }
            }
            : undefined, className: (0, cn_1.cn)('flex gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] text-on-surface', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', interactive && 'cursor-pointer transition-opacity hover:opacity-95', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100", children: imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: name, className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xl", children: "\uD83E\uDDF4" })) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [brand ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold uppercase text-muted", children: brand })) : null, (0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: name }), rating != null ? (0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating, size: "sm" }) : null, reason ? ((0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 text-xs font-semibold text-accent", children: reason })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-xs)] flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: priceText }), onAdd ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: added ? 'secondary' : 'primary', size: "sm", disabled: soldOut, onClick: (e) => {
                                    e.stopPropagation();
                                    onAdd();
                                }, children: soldOut ? 'Sold out' : added ? '✓ Added' : addLabel })) : null] })] })] }));
});
//# sourceMappingURL=ProductRecommendation.js.map