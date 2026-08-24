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
exports.HotelCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Rating_1 = require("../primitives/Rating");
const PriceTag_1 = require("../commerce/PriceTag");
/**
 * HotelCard, redesigned (v2): a **media-hero property card**. A tinted media panel
 * (glyph watermark + a floating rating badge) tops the name/location, amenity
 * chips, and a nightly-price footer with any struck compare-at. Elevated,
 * hover-lift. Distinct from v1. Same props, token-only.
 */
exports.HotelCardV2 = React.forwardRef(function HotelCardV2({ name, location, rating, reviewCount, priceCents, currency = 'USD', tags, compareAtCents, variant, onClick, className, ...rest }, ref) {
    void variant;
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-hotel-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": name, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
        } } : undefined, className: (0, cn_1.cn)('flex flex-col overflow-hidden rounded-lg bg-surface shadow-md transition-transform', interactive && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative flex h-28 items-center justify-center bg-primary/10 text-4xl", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: "\uD83C\uDFE8" }), typeof rating === 'number' ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute right-2 top-2 rounded-full bg-surface/90 px-2 py-0.5", children: (0, jsx_runtime_1.jsx)(Rating_1.Rating, { value: rating, size: "sm", showValue: true }) })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-2 p-md", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: name }), location ? (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted", children: [location, typeof reviewCount === 'number' ? ` · ${reviewCount} reviews` : ''] }) : null] }), tags && tags.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-1.5", children: tags.map((t, i) => (0, jsx_runtime_1.jsx)("span", { className: "rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-on-surface", children: t }, i)) })) : null, typeof priceCents === 'number' ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-2 border-t border-border pt-2", children: [(0, jsx_runtime_1.jsx)(PriceTag_1.PriceTag, { cents: priceCents, currency: currency, compareAtCents: compareAtCents, size: "lg" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "/ night" })] })) : null] })] }));
});
//# sourceMappingURL=HotelCardV2.js.map