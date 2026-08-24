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
exports.StylistCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
/**
 * StylistCard, redesigned (v2): a **banner profile card**. An accent-tinted cover
 * carries a large avatar straddling its edge; the name/role, rating, specialty
 * chips, from-price, availability and a Book CTA center beneath. Elevated. Distinct
 * from v1. Same props, token-only.
 */
exports.StylistCardV2 = React.forwardRef(function StylistCardV2({ name, role, specialties, avatarUrl, rating, reviewCount, priceFromCents, currency = 'USD', formatMoney, availability, fullyBooked = false, variant, loading = false, bookLabel = 'Book', onBook, onClick, className, ...rest }, ref) {
    void variant;
    const fmt = formatMoney ?? commerce_1.formatMoney;
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-stylist-card": "", "aria-label": "Loading stylist", className: (0, cn_1.cn)('h-48 animate-pulse rounded-lg bg-neutral-100', className), ...rest });
    }
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-stylist-card": "", className: (0, cn_1.cn)('overflow-hidden rounded-lg bg-surface text-center shadow-md', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-12 bg-accent/20" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-1 px-md pb-md", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": interactive ? `${name} profile` : name, onClick: interactive ? () => onClick?.() : undefined, disabled: !interactive, className: "-mt-9 rounded-full border-4 border-surface", children: (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: name, size: "xl" }) }), (0, jsx_runtime_1.jsx)("p", { className: "text-lg font-bold text-on-surface", children: name }), role ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: role }) : null, typeof rating === 'number' ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1.5", children: [(0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating, size: "sm", showValue: true }), typeof reviewCount === 'number' ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["(", reviewCount, ")"] }) : null] })) : null, specialties && specialties.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-1 flex flex-wrap justify-center gap-1.5", children: specialties.map((s, i) => (0, jsx_runtime_1.jsx)("span", { className: "rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-on-surface", children: s }, i)) })) : null, typeof priceFromCents === 'number' ? (0, jsx_runtime_1.jsxs)("p", { className: "mt-1 text-sm text-muted", children: ["from ", (0, jsx_runtime_1.jsx)("span", { className: "font-bold text-on-surface", children: fmt(priceFromCents, currency) })] }) : null, availability ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-success", children: availability }) : null, onBook ? (0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "md", variant: "primary", className: "mt-1 w-full", disabled: fullyBooked, onClick: onBook, children: fullyBooked ? 'Fully booked' : bookLabel }) : null] })] }));
});
//# sourceMappingURL=StylistCardV2.js.map