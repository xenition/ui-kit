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
exports.StylistCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
/**
 * StylistCard, redesigned (v3): a **compact directory row**. A small avatar, the
 * name over a role·rating line, the from-price, and a quiet Book button — hairline-
 * bordered for a team list. The opposite of v2's banner. Same props, token-only.
 */
exports.StylistCardV3 = React.forwardRef(function StylistCardV3({ name, role, specialties, avatarUrl, rating, reviewCount, priceFromCents, currency = 'USD', formatMoney, availability, fullyBooked = false, variant, loading = false, bookLabel = 'Book', onBook, onClick, className, ...rest }, ref) {
    void variant;
    void specialties;
    void reviewCount;
    void availability;
    const fmt = formatMoney ?? commerce_1.formatMoney;
    if (loading) {
        return (0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-stylist-card": "", "aria-label": "Loading stylist", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-9 w-9 animate-pulse rounded-full bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-1/3 animate-pulse rounded-sm bg-neutral-100" })] });
    }
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-stylist-card": "", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', className), ...rest, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": interactive ? `${name} profile` : name, onClick: interactive ? () => onClick?.() : undefined, disabled: !interactive, className: "shrink-0", children: (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: name, size: "sm" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: name }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1.5", children: [typeof rating === 'number' ? (0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating, size: "sm", showValue: true }) : null, role ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: role }) : null] })] }), typeof priceFromCents === 'number' ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["from ", (0, jsx_runtime_1.jsx)("span", { className: "font-bold text-on-surface", children: fmt(priceFromCents, currency) })] }) : null, onBook ? (0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "outline", disabled: fullyBooked, onClick: onBook, children: fullyBooked ? 'Booked' : bookLabel }) : null] }));
});
//# sourceMappingURL=StylistCardV3.js.map