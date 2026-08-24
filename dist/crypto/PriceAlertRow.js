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
exports.PriceAlertRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Switch_1 = require("../primitives/Switch");
const format_1 = require("./internal/format");
const CONDITION_META = {
    above: { label: 'Above', glyph: '▲', text: 'text-success' },
    below: { label: 'Below', glyph: '▼', text: 'text-danger' },
};
/**
 * One configurable price alert: the watched symbol, a condition line (glyph +
 * `Above`/`Below` label, so direction is not color-only) with the target price,
 * an optional current-price context line, and a {@link Switch} to arm or disarm
 * it. Prices are fixed-precision — no float drift. The row's opacity drops while
 * disabled to reinforce the state beyond the switch alone. Web parity of the
 * native `PriceAlertRow`.
 */
exports.PriceAlertRow = React.forwardRef(function PriceAlertRow({ symbol, condition, targetPrice, currentPrice, currencySymbol = '$', decimals = 2, enabled = false, onToggle, className, ...rest }, ref) {
    const meta = CONDITION_META[condition];
    const target = (0, format_1.formatPrice)(targetPrice, { symbol: currencySymbol, decimals });
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]', enabled ? 'opacity-100' : 'opacity-60', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: symbol }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-sm', meta.text), children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: meta.label }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold tabular-nums text-on-surface", children: target })] }), currentPrice != null ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs tabular-nums text-muted", children: `Now ${(0, format_1.formatPrice)(currentPrice, { symbol: currencySymbol, decimals })}` })) : null] }), (0, jsx_runtime_1.jsx)(Switch_1.Switch, { checked: enabled, onCheckedChange: onToggle, "aria-label": `${symbol} alert ${meta.label.toLowerCase()} ${target}` })] }));
});
//# sourceMappingURL=PriceAlertRow.js.map