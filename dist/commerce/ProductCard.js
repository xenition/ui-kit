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
exports.ProductCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Button_1 = require("../primitives/Button");
const GenerativeCover_1 = require("../marketing/GenerativeCover");
const PriceTag_1 = require("./PriceTag");
/**
 * Catalog product tile: media (image, or a seeded {@link GenerativeCover}
 * fallback when `imageUrl` is absent), title, {@link PriceTag}, and an optional
 * add-to-cart button / `href` link. Token-only; the media box uses the theme
 * radius and a neutral placeholder surface.
 */
exports.ProductCard = React.forwardRef(function ProductCard({ title, priceCents, currency = 'USD', compareAtCents, imageUrl, imageAlt, slug, href, onAdd, addLabel = 'Add to cart', formatMoney, className, ...rest }, ref) {
    const media = imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: imageAlt ?? title, loading: "lazy", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)(GenerativeCover_1.GenerativeCover, { seed: slug ?? title, label: title, className: "h-full w-full" }));
    const mediaBox = ((0, jsx_runtime_1.jsx)("div", { className: "aspect-[4/5] w-full overflow-hidden bg-neutral-100", children: media }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-product-card": "", className: (0, cn_1.cn)('group flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface', className), ...rest, children: [href ? ((0, jsx_runtime_1.jsx)("a", { href: href, className: "block", "aria-label": title, children: mediaBox })) : (mediaBox), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-heading text-base font-semibold leading-snug text-on-surface", children: href ? ((0, jsx_runtime_1.jsx)("a", { href: href, className: "hover:text-primary", children: title })) : (title) }), (0, jsx_runtime_1.jsx)(PriceTag_1.PriceTag, { cents: priceCents, currency: currency, compareAtCents: compareAtCents, formatMoney: formatMoney }), onAdd ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { type: "button", size: "sm", onClick: onAdd, className: "mt-[var(--xen-space-xs)] w-full", children: addLabel })) : null] })] }));
});
//# sourceMappingURL=ProductCard.js.map