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
exports.DestinationCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const PriceTag_1 = require("../commerce/PriceTag");
/**
 * DestinationCard — **V4** "journey" design (web parity of the native V4). The
 * boarding-pass take on a destination tile: a decorative accent→primary
 * "horizon" gradient cover carries the destination name in near-white ink (the
 * signature V4 touch), with the "from" price sitting in a frosted glass tile
 * overlaid on the gradient. The overlaid glyph/emoji and optional badge ribbon
 * are preserved, and the country/tagline sit on the calm surface below. Same
 * props/behavior as {@link DestinationCardProps}; all colors from `--xen-*`
 * token classes (no literal colors). `variant="wide"` fills the container width.
 */
exports.DestinationCardV4 = React.forwardRef(function DestinationCardV4({ name, country, tagline, glyph = '🌍', fromCents, currency = 'USD', badge, variant = 'default', onClick, className, ...rest }, ref) {
    const wide = variant === 'wide';
    const interactive = typeof onClick === 'function';
    const a11yLabel = `${name}${country ? `, ${country}` : ''}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-destination-card": "", className: (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface shadow-lg', wide ? 'w-full' : 'w-[220px]', interactive &&
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
            : {}), children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('relative flex flex-col justify-end overflow-hidden bg-gradient-to-br from-accent-400 to-primary-600 p-[var(--xen-space-md)]', wide ? 'h-[132px]' : 'h-[148px]'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "absolute right-[var(--xen-space-md)] top-[var(--xen-space-sm)] text-3xl leading-none", children: glyph }), badge ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute left-[var(--xen-space-sm)] top-[var(--xen-space-sm)]", children: (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", children: badge }) })) : null, (0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 text-lg font-bold text-primary-50", children: name }), typeof fromCents === 'number' ? ((0, jsx_runtime_1.jsxs)("span", { className: "mt-[var(--xen-space-sm)] inline-flex items-baseline gap-[var(--xen-space-xs)] self-start rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-sm)] py-[2px]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-primary-100", children: "from" }), (0, jsx_runtime_1.jsx)(PriceTag_1.PriceTag, { cents: fromCents, currency: currency, size: "sm" })] })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)] p-[var(--xen-space-md)]", children: [country ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs font-semibold text-muted", children: country }) : null, tagline ? (0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 text-sm text-muted", children: tagline }) : null] })] }));
});
//# sourceMappingURL=DestinationCardV4.js.map