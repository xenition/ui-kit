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
exports.ProductGridTileV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
const CHIP = {
    neutral: 'bg-neutral-100 text-on-surface', primary: 'bg-primary/15 text-primary', success: 'bg-success/15 text-success',
    warn: 'bg-warn/15 text-warn', danger: 'bg-danger/15 text-danger', accent: 'bg-accent/15 text-accent',
};
/**
 * ProductGridTile, redesigned (v3): a **color-block chip**. A compact tone-filled
 * square with the name and price stacked — no photo — for a dense quick-key grid.
 * Selected draws an accent ring; sold-out dims + flags. The opposite of v2's
 * image tile. Same props, token-only.
 */
exports.ProductGridTileV3 = React.forwardRef(function ProductGridTileV3({ name, priceCents, currency = 'USD', imageUrl, seed, tone = 'neutral', soldOut = false, selected = false, onLongPress, variant, testID, className, ...rest }, ref) {
    void seed;
    void variant;
    void imageUrl;
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "data-xen-product-grid-tile": "", "data-testid": testID, "aria-pressed": selected, "aria-label": `${name}${soldOut ? ', sold out' : ''}`, disabled: soldOut, onContextMenu: onLongPress ? (e) => { e.preventDefault(); onLongPress(); } : undefined, className: (0, cn_1.cn)('flex aspect-square flex-col items-center justify-center gap-0.5 rounded-md p-2 text-center transition-colors', CHIP[tone], selected && 'ring-2 ring-accent', soldOut ? 'opacity-50' : 'hover:opacity-90', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 text-xs font-bold", children: name }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs opacity-80", children: soldOut ? 'Sold out' : typeof priceCents === 'number' ? (0, internal_1.formatMoney)(priceCents, currency) : '' })] }));
});
//# sourceMappingURL=ProductGridTileV3.js.map