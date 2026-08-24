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
exports.DestinationCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const PriceTag_1 = require("../commerce/PriceTag");
/**
 * Web parity of the native `DestinationCard`: a destination discovery tile — a
 * token-styled media placeholder (no image dependency) with an overlaid glyph,
 * the place name/country, an optional tagline, a "from" price, and an optional
 * badge ribbon. Data + `onClick` only. Token-only colors.
 */
exports.DestinationCard = React.forwardRef(function DestinationCard({ name, country, tagline, glyph = '🌍', fromCents, currency = 'USD', badge, variant = 'default', onClick, className, ...rest }, ref) {
    const wide = variant === 'wide';
    const interactive = typeof onClick === 'function';
    const a11yLabel = `${name}${country ? `, ${country}` : ''}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-destination-card": "", className: (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface', wide ? 'w-full' : 'w-[220px]', interactive &&
            'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, ...(interactive
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
            : {}), children: [(0, jsx_runtime_1.jsxs)("div", { "aria-hidden": "true", className: (0, cn_1.cn)('relative flex items-center justify-center bg-neutral-100', wide ? 'h-[120px]' : 'h-[140px]'), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-3xl text-muted", children: glyph }), badge ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute left-[var(--xen-space-sm)] top-[var(--xen-space-sm)]", children: (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", children: badge }) })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)] p-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-shrink truncate text-lg font-bold text-on-surface", children: name }), country ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: country }) : null] }), tagline ? (0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 text-sm text-muted", children: tagline }) : null, typeof fromCents === 'number' ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "from" }), (0, jsx_runtime_1.jsx)(PriceTag_1.PriceTag, { cents: fromCents, currency: currency, size: "sm" })] })) : null] })] }));
});
//# sourceMappingURL=DestinationCard.js.map