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
exports.ProductCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Button_1 = require("../primitives/Button");
const GenerativeCover_1 = require("../marketing/GenerativeCover");
const PriceTag_1 = require("./PriceTag");
/**
 * ProductCard — design variant **V2**: a horizontal, media-left **list card**
 * with drop-shadow elevation and no border. Where the base is a vertical
 * image-top tile, V2 puts a square thumbnail on the left and stacks title →
 * price + add-button in a right-hand column, so it reads as a row in a scrolling
 * list. Lifts on hover. Same props as {@link ProductCardProps}; only the layout
 * differs. Token-only.
 */
exports.ProductCardV2 = React.forwardRef(function ProductCardV2({ title, priceCents, currency = 'USD', compareAtCents, imageUrl, imageAlt, slug, href, onAdd, addLabel = 'Add to cart', formatMoney, className, ...rest }, ref) {
    const media = imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: imageAlt ?? title, loading: "lazy", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)(GenerativeCover_1.GenerativeCover, { seed: slug ?? title, label: title, className: "h-full w-full" }));
    const mediaBox = ((0, jsx_runtime_1.jsx)("div", { className: "h-24 w-24 shrink-0 overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100", children: media }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-product-card": "", className: (0, cn_1.cn)('group flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] bg-surface p-[var(--xen-space-md)] shadow-md', 'transition duration-200 hover:-translate-y-0.5 hover:shadow-lg', 'motion-reduce:transition-none motion-reduce:hover:transform-none', className), ...rest, children: [href ? ((0, jsx_runtime_1.jsx)("a", { href: href, className: "block shrink-0", "aria-label": title, children: mediaBox })) : (mediaBox), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("h3", { className: "line-clamp-2 font-heading text-base font-semibold leading-snug text-on-surface", children: href ? ((0, jsx_runtime_1.jsx)("a", { href: href, className: "hover:text-primary", children: title })) : (title) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(PriceTag_1.PriceTag, { cents: priceCents, currency: currency, compareAtCents: compareAtCents, formatMoney: formatMoney }), onAdd ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { type: "button", size: "sm", variant: "soft", onClick: onAdd, children: addLabel })) : null] })] })] }));
});
//# sourceMappingURL=ProductCardV2.js.map