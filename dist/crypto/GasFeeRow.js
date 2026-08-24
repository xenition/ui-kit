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
exports.GasFeeRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const MoneyAmount_1 = require("../finance/MoneyAmount");
const format_1 = require("./internal/format");
const SPEED_META = {
    slow: { label: 'Slow', glyph: '🐢' },
    average: { label: 'Average', glyph: '🚶' },
    fast: { label: 'Fast', glyph: '⚡' },
};
/**
 * One selectable gas-fee tier: a glyph + speed label (so the tier is not
 * distinguished by color alone), the gwei price, an optional ETA, and a fiat
 * cost estimate (via {@link MoneyAmount} — no float drift). When `selected` the
 * row gains a primary-ramp tint and `aria-checked`; when `onSelect` is set it
 * becomes a keyboard-operable `radio`. Web parity of the native `GasFeeRow`.
 */
exports.GasFeeRow = React.forwardRef(function GasFeeRow({ speed, gwei, costCents, currency = 'USD', eta, selected = false, onSelect, className, ...rest }, ref) {
    const meta = SPEED_META[speed];
    const interactive = onSelect != null;
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onSelect?.(speed);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: interactive ? 'radio' : undefined, "aria-checked": interactive ? selected : undefined, "aria-label": interactive ? `${meta.label} gas` : undefined, tabIndex: interactive ? 0 : undefined, onClick: interactive ? () => onSelect?.(speed) : undefined, onKeyDown: interactive ? handleKeyDown : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] border px-[var(--xen-space-sm)] py-[var(--xen-space-sm)]', selected ? 'border-primary bg-primary-50' : 'border-border bg-surface', interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-lg", children: meta.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: meta.label }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs tabular-nums text-muted", children: [(0, format_1.formatToken)(gwei, { decimals: 2, symbol: 'gwei' }), eta != null ? ` · ${eta}` : ''] })] }), costCents != null ? ((0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: costCents, currency: currency, tone: "neutral", size: "sm" })) : null] }));
});
//# sourceMappingURL=GasFeeRow.js.map