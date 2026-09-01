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
exports.ProductGridTileV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * ProductGridTile — **V4** "register" design (web parity of the native V4). The
 * tactile checkout take on a catalog tile: a larger plate/thumbnail, a **bold,
 * prominent price** (the number that matters at the counter), and a satisfying
 * press/selected state — a `selected` tile lifts with an accent ring, soft tint,
 * and shadow. `soldOut` dims and flags by word (not color alone). Same
 * props/behavior as {@link ProductGridTileProps}; all colors from `--xen-*` token
 * classes (no literals).
 */
exports.ProductGridTileV4 = React.forwardRef(function ProductGridTileV4({ name, priceCents, currency = 'USD', imageUrl, seed, tone = 'primary', soldOut = false, selected = false, onLongPress, variant = 'default', testID, className, onContextMenu, ...rest }, ref) {
    const compact = variant === 'compact';
    const plateTint = (0, internal_1.rampBgClass)((0, internal_1.seedRampStep)(seed ?? name));
    const plate = imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: name, loading: "lazy", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex h-full w-full items-center justify-center', plateTint), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-2xl font-extrabold text-on-surface", children: (0, internal_1.initials)(name) }) }));
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "aria-pressed": selected, "aria-label": `${name}${typeof priceCents === 'number' ? `, ${(0, internal_1.formatMoney)(priceCents, currency)}` : ''}${soldOut ? ', sold out' : ''}`, disabled: soldOut, "data-xen-product-grid-tile": "", "data-testid": testID, onContextMenu: (e) => {
            onContextMenu?.(e);
            if (onLongPress) {
                e.preventDefault();
                onLongPress();
            }
        }, className: (0, cn_1.cn)('flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] border text-left transition-all', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', soldOut ? 'pointer-events-none opacity-50' : 'hover:opacity-95 active:scale-[0.98]', selected ? (0, cn_1.cn)('border-2 shadow-md', internal_1.TONE_BORDER[tone], internal_1.TONE_SOFT_BG[tone]) : 'border-border bg-surface shadow-sm', className), ...rest, children: [!compact ? ((0, jsx_runtime_1.jsx)("div", { className: "h-[84px] w-full overflow-hidden", children: plate })) : ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-1 w-full', internal_1.TONE_SOFT_BG[tone]) })), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1 p-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-semibold text-on-surface', compact ? 'truncate' : 'line-clamp-2'), children: name }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [typeof priceCents === 'number' ? ((0, jsx_runtime_1.jsx)("span", { className: "text-base font-extrabold tabular-nums text-on-surface", children: (0, internal_1.formatMoney)(priceCents, currency) })) : ((0, jsx_runtime_1.jsx)("span", {})), soldOut ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-danger", children: "Sold out" }) : null] })] })] }));
});
//# sourceMappingURL=ProductGridTileV4.js.map