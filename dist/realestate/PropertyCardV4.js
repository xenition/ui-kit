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
exports.PropertyCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
const internal_1 = require("./internal");
const STATUS_TONE = {
    active: 'success',
    pending: 'warn',
    sold: 'danger',
    new: 'primary',
};
const STATUS_LABEL = {
    active: 'Active',
    pending: 'Pending',
    sold: 'Sold',
    new: 'New',
};
/**
 * PropertyCard — **V4** "listing" design (web parity of the native V4). The
 * image-forward, editorial take on a listing summary: an elevated card with a
 * floating rounded photo, an overlaid status chip, a price-forward header, and
 * the beds/baths/sqft facts as small soft-primary chips. Same props/behavior as
 * {@link PropertyCardProps}; the `sale`/`rent` variant only changes the price
 * suffix. All colors from `--xen-*` token classes (no literals). `loading` shows
 * a recap; when `onClick` is set the card is a keyboard-activatable button.
 */
exports.PropertyCardV4 = React.forwardRef(function PropertyCardV4({ address, locality, priceCents, currency = 'USD', variant = 'sale', beds, baths, sqft, imageUrl, status, loading = false, onClick, className, ...rest }, ref) {
    const facts = [];
    if (typeof beds === 'number')
        facts.push({ glyph: '🛏', value: `${beds} bd` });
    if (typeof baths === 'number')
        facts.push({ glyph: '🛁', value: `${baths} ba` });
    if (typeof sqft === 'number')
        facts.push({ glyph: '📐', value: `${sqft.toLocaleString()} sqft` });
    const priceLabel = `${(0, commerce_1.formatMoney)(priceCents, currency)}${variant === 'rent' ? ' per month' : ''}`;
    const label = `${address}, ${priceLabel}${facts.length ? `, ${facts.map((f) => f.value).join(', ')}` : ''}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, onClick: onClick, className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] border border-border bg-surface p-2 text-on-surface shadow-md', onClick && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...(0, internal_1.clickableProps)(onClick, label), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative flex h-[190px] items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-on-surface/10", children: [imageUrl ? (0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: address, className: "h-full w-full object-cover" }) : (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "No photo" }), status ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute left-2 top-2", children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: STATUS_TONE[status], variant: "soft", children: STATUS_LABEL[status] }) })) : null] }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-1 px-1 pb-1 pt-[var(--xen-space-md)]", children: loading ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "Loading listing\u2026" })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-baseline gap-1", children: [(0, jsx_runtime_1.jsx)(commerce_1.PriceTag, { cents: priceCents, currency: currency, size: "lg" }), variant === 'rent' ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "/mo" }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: address }), locality ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted", children: locality }) : null, facts.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-0.5 flex flex-wrap gap-1", children: facts.map((f) => ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-on-surface", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: f.glyph }), f.value] }, f.value))) })) : null] })) })] }));
});
//# sourceMappingURL=PropertyCardV4.js.map