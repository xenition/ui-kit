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
exports.ComparableRowV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const STATUS_DOT = { active: 'bg-success', pending: 'bg-warn', sold: 'bg-neutral-400' };
const STATUS_LABEL = { active: 'Active', pending: 'Pending', sold: 'Sold' };
/**
 * ComparableRow, redesigned (v3): a **dense comp line**. The address over a
 * beds·baths·sqft·distance subtitle with a status dot + word, and the price pinned
 * right — hairline-bordered for a comps table. The opposite of v2's card. Status
 * is dot + word, never color alone. Same props, token-only.
 */
exports.ComparableRowV3 = React.forwardRef(function ComparableRowV3({ address, priceCents, currency = 'USD', sqft, beds, baths, distance, status, className, ...rest }, ref) {
    const sub = [
        status ? STATUS_LABEL[status] : null,
        typeof beds === 'number' ? `${beds} bd` : null,
        typeof baths === 'number' ? `${baths} ba` : null,
        typeof sqft === 'number' ? `${sqft.toLocaleString()} sqft` : null,
        distance,
    ].filter((s) => !!s);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-comparable-row": "", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', className), ...rest, children: [status ? (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-block h-2 w-2 shrink-0 rounded-full', STATUS_DOT[status]), "aria-hidden": true }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-medium text-on-surface", children: address }), sub.length > 0 ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: sub.join(' · ') }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-surface", children: (0, commerce_1.formatMoney)(priceCents, currency) })] }));
});
//# sourceMappingURL=ComparableRowV3.js.map