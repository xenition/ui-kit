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
exports.ProductGridTileV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
const PLATE = {
    neutral: 'bg-neutral-100 text-on-surface', primary: 'bg-primary/10 text-primary', success: 'bg-success/10 text-success',
    warn: 'bg-warn/10 text-warn', danger: 'bg-danger/10 text-danger', accent: 'bg-accent/10 text-accent',
};
/**
 * ProductGridTile, redesigned (v2): an **image-forward tile**. The photo (or a
 * tone-tinted initials plate) fills the top of a square card; the name + price
 * sit on a surface footer. Selected draws an accent ring; sold-out dims and flags
 * "Sold out" (text, not color). Distinct from v1. Same props, token-only.
 */
exports.ProductGridTileV2 = React.forwardRef(function ProductGridTileV2({ name, priceCents, currency = 'USD', imageUrl, seed, tone = 'neutral', soldOut = false, selected = false, onLongPress, variant, testID, className, ...rest }, ref) {
    void seed;
    void variant;
    const initials = name.trim().slice(0, 2).toUpperCase();
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "data-xen-product-grid-tile": "", "data-testid": testID, "aria-pressed": selected, "aria-label": `${name}${soldOut ? ', sold out' : ''}`, disabled: soldOut, onContextMenu: onLongPress ? (e) => { e.preventDefault(); onLongPress(); } : undefined, className: (0, cn_1.cn)('flex flex-col overflow-hidden rounded-lg bg-surface text-left shadow-sm transition-transform', selected && 'ring-2 ring-accent', soldOut ? 'opacity-50' : 'hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex aspect-square items-center justify-center', imageUrl ? 'bg-neutral-100' : PLATE[tone]), children: imageUrl ? (0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: "", className: "h-full w-full object-cover" }) : (0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-bold", children: initials }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5 p-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-surface", children: name }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: soldOut ? 'Sold out' : typeof priceCents === 'number' ? (0, internal_1.formatMoney)(priceCents, currency) : '' })] })] }));
});
//# sourceMappingURL=ProductGridTileV2.js.map