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
exports.RestaurantCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Rating_1 = require("../primitives/Rating");
const Badge_1 = require("../primitives/Badge");
const OPEN_LABEL = {
    open: 'Open',
    closed: 'Closed',
    busy: 'Busy',
};
/**
 * A restaurant / vendor tile — image, name, cuisine, star rating with count,
 * price level, and a delivery ETA line, plus an availability `Badge`. `variant`
 * switches a horizontal `list` row, a `grid` tile, and a full-bleed `hero`.
 * `closed`/`busy` states dim the card and are labelled in text (not color
 * alone). Reuses the `Rating` and `Badge` primitives. Web parity of the native
 * `RestaurantCard`; token-only. When `onClick` is set the root is a
 * keyboard-operable `role="button"`.
 */
exports.RestaurantCard = React.forwardRef(function RestaurantCard({ name, cuisine, rating, ratingCount, priceLevel, etaText, feeText, imageUrl, openState = 'open', variant = 'list', onClick, className, ...rest }, ref) {
    const horizontal = variant === 'list';
    const dimmed = openState !== 'open';
    const mediaSize = horizontal ? 'h-24 w-24 shrink-0' : variant === 'hero' ? 'h-[180px] w-full' : 'h-[120px] w-full';
    const media = ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100', mediaSize), children: imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: name, loading: "lazy", className: (0, cn_1.cn)('h-full w-full object-cover', dimmed && 'opacity-70') })) : null }));
    const metaBits = [];
    if (priceLevel)
        metaBits.push('$'.repeat(Math.min(4, Math.max(1, priceLevel))));
    if (cuisine)
        metaBits.push(cuisine);
    const body = ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-1 flex-col gap-[var(--xen-space-xs)]', !horizontal && 'p-[var(--xen-space-md)]'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("p", { className: "min-w-0 flex-1 truncate font-heading font-bold text-on-surface", children: name }), (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: openState === 'open' ? 'success' : 'neutral', children: OPEN_LABEL[openState] })] }), metaBits.length > 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: metaBits.join(' · ') })) : null, typeof rating === 'number' ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(Rating_1.Rating, { value: rating, size: "sm", showValue: true }), typeof ratingCount === 'number' ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["(", ratingCount, ")"] })) : null] })) : null, etaText || feeText ? ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-on-surface", children: [etaText, feeText].filter(Boolean).join(' · ') })) : null] }));
    const containerClass = (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface', horizontal ? 'flex flex-row gap-[var(--xen-space-md)] p-[var(--xen-space-md)]' : 'flex flex-col', dimmed && 'opacity-75', className);
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [media, body] }));
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)(containerClass, interactive &&
            'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'), ...rest, ...(interactive
            ? {
                role: 'button',
                tabIndex: 0,
                'aria-label': `${name}${cuisine ? `, ${cuisine}` : ''}, ${OPEN_LABEL[openState]}`,
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
//# sourceMappingURL=RestaurantCard.js.map