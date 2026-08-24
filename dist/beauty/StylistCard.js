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
exports.StylistCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
/**
 * A stylist / practitioner profile card: avatar, name + role, an optional star
 * rating with review count, specialty chips, a "from" price and availability
 * line, plus a "Book" CTA. `variant="compact"` drops the chips and CTA for list
 * rows; `loading` shows a token-tinted skeleton; `fullyBooked` disables the CTA
 * and swaps its label. When `onClick` is set the body is a `role="button"` with
 * keyboard support. Token-only colors.
 */
exports.StylistCard = React.forwardRef(function StylistCard({ name, role, specialties, avatarUrl, rating, reviewCount, priceFromCents, currency = 'USD', formatMoney: format = commerce_1.formatMoney, availability, fullyBooked = false, variant = 'detailed', loading = false, bookLabel = 'Book', onBook, onClick, className, ...rest }, ref) {
    const tags = specialties ?? [];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-stylist-card": "", "aria-label": "Loading stylist", "aria-busy": "true", className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "h-12 w-12 shrink-0 animate-pulse rounded-full bg-neutral-200" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "h-3.5 w-1/2 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" }), (0, jsx_runtime_1.jsx)("span", { className: "h-3 w-3/4 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" })] })] }));
    }
    const compact = variant === 'compact';
    const priceText = priceFromCents != null ? `from ${format(priceFromCents, currency)}` : undefined;
    const interactive = !!onClick;
    const a11yLabel = `${name}${role ? `, ${role}` : ''}${rating != null ? `, rated ${rating} out of 5` : ''}${fullyBooked ? ', fully booked' : ''}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-stylist-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": a11yLabel, onClick: onClick, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.currentTarget.click();
                }
            }
            : undefined, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] text-on-surface', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', interactive && 'cursor-pointer transition-opacity hover:opacity-95', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: name, size: "lg" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: name }), role ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted", children: role }) : null, rating != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating, size: "sm" }), reviewCount != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["(", reviewCount, ")"] })) : null] })) : null] }), priceText ? ((0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-sm font-bold text-on-surface", children: priceText })) : null] }), !compact && tags.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-[var(--xen-space-xs)]", children: tags.map((tag, i) => ((0, jsx_runtime_1.jsx)("span", { className: "rounded-full bg-primary-50 px-[var(--xen-space-sm)] py-0.5 text-xs font-semibold text-primary", children: tag }, `${tag}-${i}`))) })) : null, availability ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', fullyBooked ? 'text-warn' : 'text-success'), children: availability })) : null, !compact && onBook ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", disabled: fullyBooked, onClick: (e) => {
                    e.stopPropagation();
                    onBook();
                }, children: fullyBooked ? 'Fully booked' : bookLabel })) : null] }));
});
//# sourceMappingURL=StylistCard.js.map