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
exports.PropertyCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
const internal_1 = require("./internal");
const STATUS = {
    active: { label: 'Active', tone: 'success' },
    pending: { label: 'Pending', tone: 'warn' },
    sold: { label: 'Sold', tone: 'neutral' },
    new: { label: 'New', tone: 'primary' },
};
/**
 * PropertyCard, redesigned (v2): a **full-bleed listing hero**. The photo fills
 * the card; the status chip floats top-left and the price + address + beds·baths·
 * sqft sit on a gradient scrim at the bottom. Elevated, hover-lift. Same props as
 * {@link PropertyCard}, token-only.
 */
exports.PropertyCardV2 = React.forwardRef(function PropertyCardV2({ address, locality, priceCents, currency = 'USD', variant = 'sale', beds, baths, sqft, imageUrl, status, loading = false, className, onClick, ...rest }, ref) {
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-property-card": "", "aria-label": "Loading listing", className: (0, cn_1.cn)('h-56 animate-pulse rounded-lg bg-neutral-100', className), ...rest });
    }
    const st = status ? STATUS[status] : undefined;
    const price = `${(0, commerce_1.formatMoney)(priceCents, currency)}${variant === 'rent' ? '/mo' : ''}`;
    const meta = [
        typeof beds === 'number' ? `${beds} bd` : null,
        typeof baths === 'number' ? `${baths} ba` : null,
        typeof sqft === 'number' ? `${sqft.toLocaleString()} sqft` : null,
    ].filter((s) => !!s);
    const click = (0, internal_1.clickableProps)(onClick, address);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-property-card": "", onClick: onClick, ...click, className: (0, cn_1.cn)('relative flex h-56 flex-col justify-end overflow-hidden rounded-lg bg-neutral-100 shadow-md transition-transform', onClick && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0', className), ...rest, children: [imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: "", className: "absolute inset-0 h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 flex items-center justify-center text-4xl", children: "\uD83C\uDFE0" })), st ? (0, jsx_runtime_1.jsx)("div", { className: "absolute left-2 top-2", children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: st.tone, children: st.label }) }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "relative bg-gradient-to-t from-neutral-900/75 to-transparent p-3 pt-10", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-lg font-bold text-neutral-50", children: price }), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-neutral-100", children: address }), locality ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-neutral-300", children: locality }) : null, meta.length > 0 ? (0, jsx_runtime_1.jsx)("p", { className: "mt-0.5 text-xs text-neutral-200", children: meta.join(' · ') }) : null] })] }));
});
//# sourceMappingURL=PropertyCardV2.js.map