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
exports.ProductCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Button_1 = require("../primitives/Button");
const GenerativeCover_1 = require("../marketing/GenerativeCover");
const PriceTag_1 = require("./PriceTag");
/**
 * ProductCard — design variant **V3**: a **minimal, borderless** editorial
 * treatment. No card chrome at all: a tiny round thumbnail sits beside a small
 * muted, letter-spaced title, and the **price is the hero** (large PriceTag).
 * Separation comes from spacing, not a box. Same props as
 * {@link ProductCardProps}. Token-only.
 */
exports.ProductCardV3 = React.forwardRef(function ProductCardV3({ title, priceCents, currency = 'USD', compareAtCents, imageUrl, imageAlt, slug, href, onAdd, addLabel = 'Add to cart', formatMoney, className, ...rest }, ref) {
    const media = imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: imageAlt ?? title, loading: "lazy", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)(GenerativeCover_1.GenerativeCover, { seed: slug ?? title, label: title, className: "h-full w-full" }));
    const thumb = ((0, jsx_runtime_1.jsx)("div", { className: "h-11 w-11 shrink-0 overflow-hidden rounded-[var(--xen-radius-full)] bg-neutral-100", children: media }));
    const titleNode = ((0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 text-sm font-semibold tracking-wide text-muted", children: title }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-product-card": "", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)] bg-transparent py-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [href ? ((0, jsx_runtime_1.jsx)("a", { href: href, className: "block shrink-0", "aria-label": title, children: thumb })) : (thumb), href ? ((0, jsx_runtime_1.jsx)("a", { href: href, className: "min-w-0 flex-1 hover:text-primary", children: titleNode })) : ((0, jsx_runtime_1.jsx)("div", { className: "min-w-0 flex-1", children: titleNode }))] }), (0, jsx_runtime_1.jsx)(PriceTag_1.PriceTag, { cents: priceCents, currency: currency, compareAtCents: compareAtCents, formatMoney: formatMoney, size: "lg" }), onAdd ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { type: "button", size: "sm", variant: "link", onClick: onAdd, className: "self-start px-0", children: addLabel })) : null] }));
});
//# sourceMappingURL=ProductCardV3.js.map