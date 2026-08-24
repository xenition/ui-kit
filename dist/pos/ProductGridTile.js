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
exports.ProductGridTile = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * A tappable catalog tile for the register grid — the DOM parity of the native
 * `ProductGridTile`. A real `<button>`. With an `imageUrl` it shows the
 * thumbnail; otherwise a deterministic token-tinted plate with the product's
 * initials (the kit ships no image loader — a missing image never blanks). Price
 * is integer **cents** via `formatMoney`. `soldOut` dims and flags by word (not
 * color alone); `selected` draws an accent ring reflected in `aria-pressed`.
 * Token-only tints from a theme ramp.
 */
exports.ProductGridTile = React.forwardRef(function ProductGridTile({ name, priceCents, currency = 'USD', imageUrl, seed, tone = 'primary', soldOut = false, selected = false, onLongPress, variant = 'default', testID, className, onContextMenu, ...rest }, ref) {
    const compact = variant === 'compact';
    const plateTint = (0, internal_1.rampBgClass)((0, internal_1.seedRampStep)(seed ?? name));
    const plate = imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: name, loading: "lazy", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex h-full w-full items-center justify-center', plateTint), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xl font-bold text-on-surface", children: (0, internal_1.initials)(name) }) }));
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "aria-pressed": selected, "aria-label": `${name}${typeof priceCents === 'number' ? `, ${(0, internal_1.formatMoney)(priceCents, currency)}` : ''}${soldOut ? ', sold out' : ''}`, disabled: soldOut, "data-xen-product-grid-tile": "", "data-testid": testID, onContextMenu: (e) => {
            onContextMenu?.(e);
            if (onLongPress) {
                e.preventDefault();
                onLongPress();
            }
        }, className: (0, cn_1.cn)('flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] border text-left transition-opacity', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', soldOut ? 'pointer-events-none opacity-50' : 'hover:opacity-90', selected ? (0, cn_1.cn)('border-2', internal_1.TONE_BORDER[tone], internal_1.TONE_SOFT_BG[tone]) : 'border-border bg-surface', className), ...rest, children: [!compact ? ((0, jsx_runtime_1.jsx)("div", { className: "h-[72px] w-full overflow-hidden", children: plate })) : ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-1 w-full', internal_1.TONE_SOFT_BG[tone]) })), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5 p-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold text-on-surface', compact ? 'truncate' : 'line-clamp-2'), children: name }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [typeof priceCents === 'number' ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs tabular-nums text-muted", children: (0, internal_1.formatMoney)(priceCents, currency) })) : ((0, jsx_runtime_1.jsx)("span", {})), soldOut ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-danger", children: "Sold out" })) : null] })] })] }));
});
//# sourceMappingURL=ProductGridTile.js.map