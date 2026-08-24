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
exports.ListingCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const ConditionBadge_1 = require("./ConditionBadge");
const internal_1 = require("./internal");
const MEDIA_CLASS = {
    grid: 'aspect-[4/3] w-full',
    list: 'h-24 w-24 shrink-0',
    featured: 'aspect-video w-full',
};
/**
 * A single marketplace listing summary — hero media, price (with optional
 * compare-at), title, condition chip, and a location/seller line, plus an
 * optional ♥ watch toggle. Presentational: shaped data + callbacks only, nothing
 * fetches. `grid` (default) stacks media over text, `list` is a compact
 * horizontal row, `featured` enlarges the media. Colors come exclusively from
 * the `--xen-*` token classes. Pass `loading` for a recap. The watch toggle is a
 * real `<button>` outside the card press target, so watching never also
 * navigates.
 */
exports.ListingCard = React.forwardRef(function ListingCard({ title, priceCents, currency = 'USD', compareAtCents, imageUrl, condition, subtitle, watched = false, onToggleWatch, variant = 'grid', loading = false, onClick, className, ...rest }, ref) {
    const horizontal = variant === 'list';
    const interactive = onClick != null;
    const watchChip = onToggleWatch != null ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": watched ? `Unwatch ${title}` : `Watch ${title}`, "aria-pressed": watched, onClick: (e) => {
            e.stopPropagation();
            onToggleWatch(!watched);
        }, className: (0, cn_1.cn)('absolute right-[var(--xen-space-sm)] top-[var(--xen-space-sm)] inline-flex h-8 w-8 items-center justify-center', 'rounded-[var(--xen-radius-full)] bg-surface/85 text-base leading-none shadow-sm', watched ? 'text-danger' : 'text-muted'), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: watched ? '♥' : '♡' }) })) : null;
    const media = ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100', MEDIA_CLASS[variant]), children: imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: "", className: "h-full w-full object-cover", loading: "lazy" })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "No photo" })) }));
    const info = ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-1 flex-col justify-center gap-0.5", children: loading ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "Loading listing\u2026" })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(commerce_1.PriceTag, { cents: priceCents, currency: currency, compareAtCents: compareAtCents, size: variant === 'featured' ? 'lg' : 'md' }), (0, jsx_runtime_1.jsx)("p", { className: "line-clamp-2 text-base font-semibold text-on-surface", children: title }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-[var(--xen-space-sm)]", children: [condition ? (0, jsx_runtime_1.jsx)(ConditionBadge_1.ConditionBadge, { condition: condition, size: "sm" }) : null, subtitle ? (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 truncate text-sm text-muted", children: subtitle }) : null] })] })) }));
    const priceLabel = (0, commerce_1.formatMoney)(priceCents, currency);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, ...(interactive
            ? {
                role: 'button',
                tabIndex: 0,
                onClick,
                onKeyDown: internal_1.activateOnKey,
                'aria-label': `${title}, ${priceLabel}${condition ? `, ${condition}` : ''}`,
            }
            : {}), className: (0, cn_1.cn)('relative gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)]', horizontal ? 'flex flex-row' : 'flex flex-col', interactive && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...rest, children: [media, info, watchChip] }));
});
//# sourceMappingURL=ListingCard.js.map