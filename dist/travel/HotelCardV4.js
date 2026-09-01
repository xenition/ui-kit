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
exports.HotelCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Rating_1 = require("../primitives/Rating");
const Badge_1 = require("../primitives/Badge");
const PriceTag_1 = require("../commerce/PriceTag");
/**
 * HotelCard — **V4** "journey" design (web parity of the native V4). The
 * boarding-pass take on a hotel result: an elevated clean card with a small
 * brand-gradient disc behind the leading hotel glyph (the signature V4 touch),
 * the property name/location, guest star rating, amenity chips, and the nightly
 * fare sitting below a dashed boarding-pass tear line. Same props/behavior as
 * {@link HotelCardProps}; all colors from `--xen-*` token classes (no literal
 * colors). `variant="row"` tightens the layout into a horizontal row.
 */
exports.HotelCardV4 = React.forwardRef(function HotelCardV4({ name, location, rating, reviewCount, priceCents, currency = 'USD', tags = [], compareAtCents, variant = 'stacked', onClick, className, ...rest }, ref) {
    const row = variant === 'row';
    const interactive = typeof onClick === 'function';
    const a11yLabel = `${name}${location ? `, ${location}` : ''}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-hotel-card": "", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)] shadow-lg', interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, ...(interactive
            ? {
                role: 'button',
                tabIndex: 0,
                'aria-label': a11yLabel,
                onClick,
                onKeyDown: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onClick?.();
                    }
                },
            }
            : {}), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700 text-2xl leading-none text-primary-50", children: "\uD83C\uDFE8" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-[2px]", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: name }), location ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: location }) : null] }), typeof rating === 'number' ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex shrink-0 items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(Rating_1.Rating, { value: rating, size: "sm" }), typeof reviewCount === 'number' ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["(", reviewCount, ")"] })) : null] })) : null] }), tags.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-[var(--xen-space-xs)]", children: tags.map((t, i) => ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "neutral", children: t }, `${t}-${i}`))) })) : null, typeof priceCents === 'number' ? ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex items-baseline justify-between gap-[var(--xen-space-sm)] border-t border-dashed border-border pt-[var(--xen-space-md)]', row && 'mt-0'), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Nightly from" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(PriceTag_1.PriceTag, { cents: priceCents, currency: currency, compareAtCents: compareAtCents, size: "md" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "/ night" })] })] })) : null] }));
});
//# sourceMappingURL=HotelCardV4.js.map