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
exports.RestaurantCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const OPEN_LABEL = {
    open: 'Open',
    closed: 'Closed',
    busy: 'Busy',
};
/**
 * RestaurantCard, alternate design **V2** — a *cover-hero* card. A tall
 * full-bleed cover photo carries two overlaid chips: the open-state badge top-
 * left and a frosted rating badge top-right. The name and details sit on a
 * solid surface footer beneath the image (never over it), so contrast is safe
 * while the card still reads as a big, tappable hero — the opposite of the
 * compact base row. Same props as the base; token-only, elevated with a hover
 * lift.
 */
exports.RestaurantCardV2 = React.forwardRef(function RestaurantCardV2({ name, cuisine, rating, ratingCount, priceLevel, etaText, feeText, imageUrl, openState = 'open', onClick, className, ...rest }, ref) {
    const dimmed = openState !== 'open';
    const metaBits = [];
    if (priceLevel)
        metaBits.push('$'.repeat(Math.min(4, Math.max(1, priceLevel))));
    if (cuisine)
        metaBits.push(cuisine);
    const hero = ((0, jsx_runtime_1.jsxs)("div", { className: "relative h-[176px] w-full overflow-hidden bg-neutral-100", children: [imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: name, loading: "lazy", className: (0, cn_1.cn)('h-full w-full object-cover', dimmed && 'opacity-70') })) : null, (0, jsx_runtime_1.jsx)("span", { className: "absolute left-[var(--xen-space-sm)] top-[var(--xen-space-sm)]", children: (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: openState === 'open' ? 'success' : 'neutral', children: OPEN_LABEL[openState] }) }), typeof rating === 'number' ? ((0, jsx_runtime_1.jsxs)("span", { className: "absolute right-[var(--xen-space-sm)] top-[var(--xen-space-sm)] inline-flex items-center gap-0.5 rounded-full bg-surface/90 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] shadow-sm backdrop-blur-sm", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2605", size: "sm", color: "warn" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-surface tabular-nums", children: rating.toFixed(1) }), typeof ratingCount === 'number' ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["(", ratingCount, ")"] })) : null] })) : null] }));
    const footer = ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)] p-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate font-heading text-lg font-bold text-on-surface", children: name }), metaBits.length > 0 ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: metaBits.join(' · ') }) : null, etaText || feeText ? ((0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-on-surface", children: [etaText, feeText].filter(Boolean).join(' · ') })) : null] }));
    const containerClass = (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-lg)] bg-surface shadow-md', dimmed && 'opacity-80', className);
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [hero, footer] }));
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)(containerClass, interactive &&
            'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none motion-reduce:hover:transform-none'), ...rest, ...(interactive
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
//# sourceMappingURL=RestaurantCardV2.js.map