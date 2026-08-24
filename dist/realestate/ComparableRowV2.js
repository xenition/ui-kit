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
exports.ComparableRowV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
const STATUS = {
    active: { label: 'Active', tone: 'success' },
    pending: { label: 'Pending', tone: 'warn' },
    sold: { label: 'Sold', tone: 'neutral' },
};
/**
 * ComparableRow, redesigned (v2): an **elevated comp card**. The address leads
 * with a status badge, the price is a hero figure, and beds·baths·sqft·$/sqft
 * render as tinted stat chips with the distance trailing. Distinct from v1's flat
 * row. Same props, token-only.
 */
exports.ComparableRowV2 = React.forwardRef(function ComparableRowV2({ address, priceCents, currency = 'USD', sqft, beds, baths, distance, status, className, ...rest }, ref) {
    const st = status ? STATUS[status] : undefined;
    const perSqft = sqft && sqft > 0 ? Math.round(priceCents / sqft) : null;
    const chips = [
        typeof beds === 'number' ? `${beds} bd` : null,
        typeof baths === 'number' ? `${baths} ba` : null,
        typeof sqft === 'number' ? `${sqft.toLocaleString()} sqft` : null,
        perSqft ? `${(0, commerce_1.formatMoney)(perSqft, currency)}/sqft` : null,
    ].filter((s) => !!s);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-comparable-row": "", className: (0, cn_1.cn)('flex flex-col gap-2 rounded-lg bg-surface p-3 shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-2", children: [(0, jsx_runtime_1.jsx)("p", { className: "min-w-0 flex-1 truncate text-sm font-semibold text-on-surface", children: address }), st ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: st.tone, children: st.label }) : null] }), (0, jsx_runtime_1.jsx)("p", { className: "text-xl font-bold text-on-surface", children: (0, commerce_1.formatMoney)(priceCents, currency) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-1.5", children: [chips.map((c, i) => ((0, jsx_runtime_1.jsx)("span", { className: "rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-on-surface", children: c }, i))), distance ? (0, jsx_runtime_1.jsx)("span", { className: "ml-auto text-xs text-muted", children: distance }) : null] })] }));
});
//# sourceMappingURL=ComparableRowV2.js.map