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
exports.PriceTicker = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Sparkline_1 = require("../charts/Sparkline");
const format_1 = require("./internal/format");
const pressable_1 = require("./internal/pressable");
/**
 * A single live-price line: symbol/name on the left, price + a token-toned
 * change on the right. Gains read `success`, losses `danger`, and each change
 * is prefixed with a ▲/▼ glyph so direction is never color-only. The
 * `detailed` variant adds the long name and an optional {@link Sparkline}.
 * Prices/percentages are fixed-precision — no float drift. Web parity of the
 * native `PriceTicker`.
 */
exports.PriceTicker = React.forwardRef(function PriceTicker({ symbol, name, price, changePct = 0, currencySymbol = '$', priceDecimals = 2, spark, variant = 'compact', loading = false, onClick, className, ...rest }, ref) {
    const detailed = variant === 'detailed';
    const toneKey = (0, format_1.changeToneKey)(changePct);
    const glyph = (0, format_1.changeGlyph)(changePct);
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": `Loading ${symbol} price`, className: (0, cn_1.cn)('animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-100', detailed ? 'h-14' : 'h-10', className), ...rest }));
    }
    const interactive = (0, pressable_1.pressableProps)(onClick);
    const sparkColor = toneKey === 'muted' ? 'primary' : toneKey;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": interactive ? `${symbol} price` : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]', interactive &&
            'cursor-pointer rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: symbol }), detailed && name != null ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: name })) : null] }), detailed && spark != null && spark.length > 0 ? ((0, jsx_runtime_1.jsx)(Sparkline_1.Sparkline, { data: spark, width: 64, height: 28, color: sparkColor })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold tabular-nums text-on-surface", children: (0, format_1.formatPrice)(price, { symbol: currencySymbol, decimals: priceDecimals }) }), (0, jsx_runtime_1.jsxs)("span", { "aria-label": `${changePct >= 0 ? 'up' : 'down'} ${(0, format_1.formatPct)(Math.abs(changePct))}`, className: (0, cn_1.cn)('text-xs font-semibold tabular-nums', (0, format_1.changeToneClass)(toneKey)), children: [glyph, " ", (0, format_1.formatPct)(changePct)] })] })] }));
});
//# sourceMappingURL=PriceTicker.js.map