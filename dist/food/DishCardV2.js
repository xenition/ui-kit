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
exports.DishCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Rating_1 = require("../primitives/Rating");
const commerce_1 = require("../commerce");
/**
 * DishCard, alternate design **V2** — an *image-hero* tile. Where the base card
 * is a horizontal thumb-plus-text row, V2 leads with a full-width photo that
 * fills the top of the card, floats the {@link PriceTag} in a frosted pill over
 * the bottom-left of the image, and hangs a circular add button off the bottom-
 * right so it reads like a delivery-app feature card. Text lives below on the
 * solid surface (never over the photo) so contrast holds. `soldOut`, `loading`,
 * and every prop behave exactly as the base. Token-only, elevated with a soft
 * hover lift.
 */
exports.DishCardV2 = React.forwardRef(function DishCardV2({ name, description, priceCents, currency = 'USD', imageUrl, rating, badges, soldOut = false, loading = false, onClick, onAdd, addLabel = 'Add', soldOutLabel = 'Sold out', formatMoney, className, ...rest }, ref) {
    const containerClass = (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-lg)] bg-surface shadow-md', soldOut && 'opacity-60', className);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-busy": "true", "aria-label": "Loading dish", className: containerClass, ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-[168px] w-full bg-neutral-200" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3.5 w-3/5 rounded-[var(--xen-radius-sm)] bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-11/12 rounded-[var(--xen-radius-sm)] bg-neutral-100" })] })] }));
    }
    const hero = ((0, jsx_runtime_1.jsxs)("div", { className: "relative h-[168px] w-full overflow-visible", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-full w-full overflow-hidden bg-neutral-100", children: imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: name, loading: "lazy", className: "h-full w-full object-cover" })) : null }), (0, jsx_runtime_1.jsx)("span", { className: "absolute bottom-[var(--xen-space-sm)] left-[var(--xen-space-sm)] rounded-full bg-surface/90 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] shadow-sm backdrop-blur-sm", children: (0, jsx_runtime_1.jsx)(commerce_1.PriceTag, { cents: priceCents, currency: currency, formatMoney: formatMoney, size: "sm" }) }), soldOut ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute left-[var(--xen-space-sm)] top-[var(--xen-space-sm)] rounded-full bg-danger/10 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-bold text-danger", children: soldOutLabel })) : null, !soldOut && onAdd ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": addLabel, onClick: (e) => {
                    e.stopPropagation();
                    onAdd();
                }, className: "absolute bottom-0 right-[var(--xen-space-md)] inline-flex h-11 min-w-11 translate-y-1/2 items-center justify-center rounded-full bg-primary px-[var(--xen-space-md)] text-sm font-bold text-on-primary shadow-md transition duration-200 hover:shadow-lg active:scale-[.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none", children: addLabel })) : null] }));
    const body = ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)] px-[var(--xen-space-md)] pb-[var(--xen-space-md)] pt-[var(--xen-space-lg)]", children: [(0, jsx_runtime_1.jsx)("p", { className: "line-clamp-2 font-heading text-lg font-bold text-on-surface", children: name }), description ? (0, jsx_runtime_1.jsx)("p", { className: "line-clamp-2 text-sm text-muted", children: description }) : null, typeof rating === 'number' ? (0, jsx_runtime_1.jsx)(Rating_1.Rating, { value: rating, size: "sm", showValue: true }) : null, badges ? (0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-xs)] flex flex-wrap gap-[var(--xen-space-xs)]", children: badges }) : null] }));
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [hero, body] }));
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)(containerClass, interactive &&
            'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none motion-reduce:hover:transform-none'), ...rest, ...(interactive
            ? {
                role: 'button',
                tabIndex: soldOut ? -1 : 0,
                'aria-label': name,
                'aria-disabled': soldOut || undefined,
                onClick,
                onKeyDown: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onClick?.();
                    }
                },
            }
            : {}), children: inner }));
});
//# sourceMappingURL=DishCardV2.js.map