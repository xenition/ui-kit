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
exports.RestaurantCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Rating_1 = require("../primitives/Rating");
const OPEN_LABEL = {
    open: 'Open',
    closed: 'Closed',
    busy: 'Busy',
};
const DOT_CLASS = {
    open: 'bg-success',
    busy: 'bg-warn',
    closed: 'bg-neutral-400',
};
/**
 * RestaurantCard, alternate design **V3** — a *compact list row*. Borderless
 * and dense: a small rounded thumbnail, then a two-line stack (name with an
 * inline status dot, meta + rating + ETA), meant to be repeated tightly in a
 * search or nearby list. No hero, no card chrome — the inverse of V2's cover.
 * Availability is a coloured dot *and* a word (never colour alone). Same props
 * as the base; token-only.
 */
exports.RestaurantCardV3 = React.forwardRef(function RestaurantCardV3({ name, cuisine, rating, ratingCount, priceLevel, etaText, feeText, imageUrl, openState = 'open', onClick, className, ...rest }, ref) {
    const dimmed = openState !== 'open';
    const metaBits = [];
    if (priceLevel)
        metaBits.push('$'.repeat(Math.min(4, Math.max(1, priceLevel))));
    if (cuisine)
        metaBits.push(cuisine);
    const metaLine = [OPEN_LABEL[openState], ...metaBits, etaText, feeText]
        .concat(typeof ratingCount === 'number' ? [`(${ratingCount})`] : [])
        .filter(Boolean)
        .join(' · ');
    const media = ((0, jsx_runtime_1.jsx)("div", { className: "h-12 w-12 shrink-0 overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100", children: imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: name, loading: "lazy", className: (0, cn_1.cn)('h-full w-full object-cover', dimmed && 'opacity-70') })) : null }));
    const body = ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-block h-2 w-2 shrink-0 rounded-full', DOT_CLASS[openState]), "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("p", { className: "min-w-0 flex-1 truncate font-heading font-bold text-on-surface", children: name }), typeof rating === 'number' ? (0, jsx_runtime_1.jsx)(Rating_1.Rating, { value: rating, size: "sm", showValue: true }) : null] }), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: metaLine })] }));
    const containerClass = (0, cn_1.cn)('flex flex-row items-center gap-[var(--xen-space-md)] border-b border-border bg-transparent py-[var(--xen-space-sm)]', dimmed && 'opacity-75', className);
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [media, body] }));
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)(containerClass, interactive &&
            'cursor-pointer transition-colors duration-200 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none'), ...rest, ...(interactive
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
//# sourceMappingURL=RestaurantCardV3.js.map