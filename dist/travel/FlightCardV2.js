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
exports.FlightCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const PriceTag_1 = require("../commerce/PriceTag");
/**
 * FlightCard, redesigned (v2): a **bold boarding-style card**. The airline heads
 * the card; a large FROM code/time — a duration/stops connector with a plane — TO
 * code/time forms the route, and the fare sits prominent beneath. Elevated.
 * Distinct from v1's row. Same props, token-only.
 */
exports.FlightCardV2 = React.forwardRef(function FlightCardV2({ airline, flightNumber, from, to, duration, stops = 0, priceCents, currency = 'USD', variant, onClick, loading = false, className, ...rest }, ref) {
    void variant;
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-flight-card": "", "aria-label": "Loading flight", className: (0, cn_1.cn)('h-32 animate-pulse rounded-lg bg-neutral-100', className), ...rest });
    }
    const interactive = typeof onClick === 'function';
    const stopsLabel = stops === 0 ? 'Nonstop' : `${stops} stop${stops === 1 ? '' : 's'}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-flight-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${airline} ${from.code} to ${to.code}`, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
        } } : undefined, className: (0, cn_1.cn)('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-sm', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("p", { className: "text-xs font-semibold text-muted", children: [airline, flightNumber ? ` · ${flightNumber}` : ''] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold text-on-surface", children: from.code }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: from.time })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: duration }), (0, jsx_runtime_1.jsxs)("div", { className: "my-1 flex w-full items-center gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "h-px flex-1 bg-border" }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: "\u2708\uFE0F" }), (0, jsx_runtime_1.jsx)("span", { className: "h-px flex-1 bg-border" })] }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: stopsLabel })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold text-on-surface", children: to.code }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: to.time })] })] }), typeof priceCents === 'number' ? ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-end border-t border-border pt-2", children: (0, jsx_runtime_1.jsx)(PriceTag_1.PriceTag, { cents: priceCents, currency: currency, size: "lg" }) })) : null] }));
});
//# sourceMappingURL=FlightCardV2.js.map