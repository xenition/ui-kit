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
exports.DishCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Button_1 = require("../primitives/Button");
const Rating_1 = require("../primitives/Rating");
const commerce_1 = require("../commerce");
/**
 * A single menu item — the food-domain sibling of `ProductCard`. Renders a
 * photo (or a token-tinted placeholder), name, description, an optional star
 * rating and dietary `badges`, a {@link PriceTag}, and an optional add button.
 * `variant` switches between a horizontal `list` row, a vertical `grid` tile,
 * and a larger `featured` hero. `soldOut` dims the card and disables adding;
 * `loading` shows a token-only skeleton. Web parity of the native `DishCard`.
 * When `onClick` is set the root is a keyboard-operable `role="button"` so the
 * nested add button stays independently focusable. Token-only.
 */
exports.DishCard = React.forwardRef(function DishCard({ name, description, priceCents, currency = 'USD', imageUrl, rating, badges, variant = 'list', soldOut = false, loading = false, onClick, onAdd, addLabel = 'Add', soldOutLabel = 'Sold out', formatMoney, className, ...rest }, ref) {
    const horizontal = variant === 'list';
    const containerClass = (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface', horizontal
        ? 'flex flex-row gap-[var(--xen-space-md)] p-[var(--xen-space-md)]'
        : 'flex flex-col', soldOut && 'opacity-60', className);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-busy": "true", "aria-label": "Loading dish", className: containerClass, ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('rounded-[var(--xen-radius-md)] bg-neutral-200', horizontal ? 'h-[88px] w-[88px] shrink-0' : 'h-[140px] w-full') }), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-1 flex-col gap-[var(--xen-space-sm)]', !horizontal && 'p-[var(--xen-space-md)]'), children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3.5 w-3/5 rounded-[var(--xen-radius-sm)] bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-11/12 rounded-[var(--xen-radius-sm)] bg-neutral-100" })] })] }));
    }
    const mediaHeight = horizontal ? 'h-[88px] w-[88px] shrink-0' : variant === 'featured' ? 'h-[180px] w-full' : 'h-[140px] w-full';
    const media = ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100', mediaHeight), children: imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: name, loading: "lazy", className: "h-full w-full object-cover" })) : null }));
    const body = ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-1 flex-col gap-[var(--xen-space-xs)]', !horizontal && 'p-[var(--xen-space-md)]'), children: [(0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('font-heading font-semibold text-on-surface', horizontal ? 'truncate' : 'line-clamp-2'), children: name }), description ? (0, jsx_runtime_1.jsx)("p", { className: "line-clamp-2 text-sm text-muted", children: description }) : null, typeof rating === 'number' ? (0, jsx_runtime_1.jsx)(Rating_1.Rating, { value: rating, size: "sm", showValue: true }) : null, badges ? (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-[var(--xen-space-xs)]", children: badges }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-xs)] flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)(commerce_1.PriceTag, { cents: priceCents, currency: currency, formatMoney: formatMoney }), soldOut ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-danger", children: soldOutLabel })) : onAdd ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", onClick: onAdd, disabled: soldOut, children: addLabel })) : null] })] }));
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [media, body] }));
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)(containerClass, interactive &&
            'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'), ...rest, ...(interactive
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
//# sourceMappingURL=DishCard.js.map