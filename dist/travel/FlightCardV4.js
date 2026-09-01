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
exports.FlightCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const PriceTag_1 = require("../commerce/PriceTag");
/**
 * FlightCard — **V4** "journey" design (web parity of the native V4). The
 * boarding-pass take on a bookable flight: an elevated clean card, the
 * origin→destination route drawn as a rail with a small brand-gradient plane
 * disc at its midpoint (the signature V4 touch), and the fare sitting below a
 * dashed boarding-pass tear line. Same props/behavior as {@link FlightCardProps};
 * all colors from `--xen-*` token classes (no literal colors). Pass `loading`
 * for a placeholder recap and `variant="compact"` for a denser row.
 */
exports.FlightCardV4 = React.forwardRef(function FlightCardV4({ airline, flightNumber, from, to, duration, stops = 0, priceCents, currency = 'USD', variant = 'default', onClick, loading = false, className, ...rest }, ref) {
    const compact = variant === 'compact';
    const stopLabel = stops <= 0 ? 'Nonstop' : `${stops} stop${stops > 1 ? 's' : ''}`;
    const interactive = typeof onClick === 'function';
    const a11yLabel = `${airline} ${from.code} to ${to.code}, ${duration}, ${stopLabel}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-flight-card": "", className: (0, cn_1.cn)('flex flex-col rounded-[var(--xen-radius-lg)] border border-border bg-surface shadow-lg', compact ? 'gap-[var(--xen-space-sm)] p-[var(--xen-space-md)]' : 'gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]', interactive &&
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
            : {}), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 truncate text-sm font-bold text-on-surface", children: airline }), flightNumber ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: flightNumber }) : null] }), loading ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "Loading flight\u2026" })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-start", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-extrabold text-on-surface", children: from.code }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: from.time })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col items-center gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: duration }), (0, jsx_runtime_1.jsxs)("div", { className: "flex w-full items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-0.5 flex-1 rounded-full bg-border" }), (0, jsx_runtime_1.jsx)("span", { className: "mx-1.5 flex h-[26px] w-[26px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-700 text-sm leading-none text-primary-50", children: "\u2708" }), (0, jsx_runtime_1.jsx)("div", { className: "h-0.5 flex-1 rounded-full bg-border" })] }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: stopLabel })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-extrabold text-on-surface", children: to.code }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: to.time })] })] })), typeof priceCents === 'number' && !loading ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-xs)] flex items-center justify-between border-t border-dashed border-border pt-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Fare from" }), (0, jsx_runtime_1.jsx)(PriceTag_1.PriceTag, { cents: priceCents, currency: currency, size: compact ? 'sm' : 'md' })] })) : null] }));
});
//# sourceMappingURL=FlightCardV4.js.map