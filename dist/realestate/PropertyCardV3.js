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
exports.PropertyCardV3 = void 0;
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
 * PropertyCard, redesigned (v3): a **dense listing row**. A small thumbnail, the
 * price + address over a locality·beds·baths·sqft line, and the status badge on
 * the trailing edge — hairline-bordered for a results list. The opposite of v2's
 * hero. Same props, token-only.
 */
exports.PropertyCardV3 = React.forwardRef(function PropertyCardV3({ address, locality, priceCents, currency = 'USD', variant = 'sale', beds, baths, sqft, imageUrl, status, loading = false, className, onClick, ...rest }, ref) {
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-property-card": "", "aria-label": "Loading listing", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-3', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-14 w-14 animate-pulse rounded-md bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" })] }));
    }
    const st = status ? STATUS[status] : undefined;
    const price = `${(0, commerce_1.formatMoney)(priceCents, currency)}${variant === 'rent' ? '/mo' : ''}`;
    const meta = [
        locality,
        typeof beds === 'number' ? `${beds} bd` : null,
        typeof baths === 'number' ? `${baths} ba` : null,
        typeof sqft === 'number' ? `${sqft.toLocaleString()} sqft` : null,
    ].filter((s) => !!s);
    const click = (0, internal_1.clickableProps)(onClick, address);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-property-card": "", onClick: onClick, ...click, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-3', onClick && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-100 text-xl", children: imageUrl ? (0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: "", className: "h-full w-full object-cover" }) : '🏠' }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-bold text-on-surface", children: price }), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-on-surface", children: address }), meta.length > 0 ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: meta.join(' · ') }) : null] }), st ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: st.tone, children: st.label }) : null] }));
});
//# sourceMappingURL=PropertyCardV3.js.map