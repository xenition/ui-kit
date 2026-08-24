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
exports.DishCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Rating_1 = require("../primitives/Rating");
const commerce_1 = require("../commerce");
/**
 * DishCard, alternate design **V3** — a *text-first* menu line. Borderless and
 * dense, separated from its neighbours by a single hairline rule rather than a
 * card. The name and price share the top baseline (name left, price right,
 * bridged by a dotted leader), the description follows, and a small square
 * thumbnail sits on the *right* — the inverse of the base left-thumb row. Adding
 * is a quiet text button, not a filled pill. Same props as the base; token-only.
 */
exports.DishCardV3 = React.forwardRef(function DishCardV3({ name, description, priceCents, currency = 'USD', imageUrl, rating, badges, soldOut = false, loading = false, onClick, onAdd, addLabel = 'Add', soldOutLabel = 'Sold out', formatMoney, className, ...rest }, ref) {
    const containerClass = (0, cn_1.cn)('flex flex-row items-start gap-[var(--xen-space-md)] border-b border-border bg-transparent py-[var(--xen-space-md)]', soldOut && 'opacity-60', className);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-busy": "true", "aria-label": "Loading dish", className: containerClass, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3.5 w-1/2 rounded-[var(--xen-radius-sm)] bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-4/5 rounded-[var(--xen-radius-sm)] bg-neutral-100" })] }), (0, jsx_runtime_1.jsx)("div", { className: "h-14 w-14 shrink-0 rounded-[var(--xen-radius-md)] bg-neutral-200" })] }));
    }
    const body = ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("p", { className: "min-w-0 shrink truncate font-heading font-bold text-on-surface", children: name }), (0, jsx_runtime_1.jsx)("span", { className: "mb-1 h-0 flex-1 self-end border-b border-dotted border-border", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)(commerce_1.PriceTag, { cents: priceCents, currency: currency, formatMoney: formatMoney, size: "sm" })] }), description ? (0, jsx_runtime_1.jsx)("p", { className: "line-clamp-2 text-sm text-muted", children: description }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-xs)] flex flex-wrap items-center gap-[var(--xen-space-md)]", children: [typeof rating === 'number' ? (0, jsx_runtime_1.jsx)(Rating_1.Rating, { value: rating, size: "sm", showValue: true }) : null, badges ? (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-[var(--xen-space-xs)]", children: badges }) : null, soldOut ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-danger", children: soldOutLabel })) : onAdd ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": addLabel, onClick: (e) => {
                            e.stopPropagation();
                            onAdd();
                        }, className: "text-sm font-bold text-primary transition-opacity duration-200 hover:opacity-70 active:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none", children: ["+ ", addLabel] })) : null] })] }));
    const media = ((0, jsx_runtime_1.jsx)("div", { className: "h-14 w-14 shrink-0 overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100", children: imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: name, loading: "lazy", className: "h-full w-full object-cover" })) : null }));
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [body, media] }));
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)(containerClass, interactive &&
            'cursor-pointer transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none'), ...rest, ...(interactive
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
//# sourceMappingURL=DishCardV3.js.map