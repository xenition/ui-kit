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
exports.FlightCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const PriceTag_1 = require("../commerce/PriceTag");
/**
 * FlightCard, redesigned (v3): a **dense fare line**. Times and codes read
 * `08:15 SFO → 13:55 JFK` on one row over an airline·duration·stops subtitle, with
 * the fare pinned right — hairline-bordered for a results list. The opposite of
 * v2's boarding card. Same props, token-only.
 */
exports.FlightCardV3 = React.forwardRef(function FlightCardV3({ airline, flightNumber, from, to, duration, stops = 0, priceCents, currency = 'USD', variant, onClick, loading = false, className, ...rest }, ref) {
    void variant;
    void flightNumber;
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-flight-card": "", "aria-label": "Loading flight", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-3', className), ...rest, children: (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" }) });
    }
    const interactive = typeof onClick === 'function';
    const stopsLabel = stops === 0 ? 'Nonstop' : `${stops} stop${stops === 1 ? '' : 's'}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-flight-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${airline} ${from.code} to ${to.code}`, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
        } } : undefined, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-3', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("p", { className: "truncate text-sm font-semibold tabular-nums text-on-surface", children: [from.time, " ", from.code, " ", (0, jsx_runtime_1.jsx)("span", { className: "text-muted", children: "\u2192" }), " ", to.time, " ", to.code] }), (0, jsx_runtime_1.jsxs)("p", { className: "truncate text-xs text-muted", children: [airline, " \u00B7 ", duration, " \u00B7 ", stopsLabel] })] }), typeof priceCents === 'number' ? (0, jsx_runtime_1.jsx)(PriceTag_1.PriceTag, { cents: priceCents, currency: currency, size: "md" }) : null] }));
});
//# sourceMappingURL=FlightCardV3.js.map