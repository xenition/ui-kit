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
exports.TokenRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const MoneyAmount_1 = require("../finance/MoneyAmount");
const format_1 = require("./internal/format");
const pressable_1 = require("./internal/pressable");
/** Static `text-*` token class per icon color slot (literal classes for JIT). */
const ICON_TEXT = {
    onSurface: 'text-on-surface',
    onPrimary: 'text-on-primary',
    primary: 'text-primary',
    muted: 'text-muted',
    success: 'text-success',
    onSuccess: 'text-on-success',
    warn: 'text-warn',
    onWarn: 'text-on-warn',
    danger: 'text-danger',
    onDanger: 'text-on-danger',
};
/**
 * One holding in a token list: a tinted token disc, symbol/name, the held
 * quantity (fixed-precision — no float drift), and a right-aligned fiat value
 * over a token-toned 24h change (gain = `success`, loss = `danger`, each with a
 * ▲/▼ glyph so it is not color-only). Becomes a keyboard-operable button when
 * `onClick` is set. Web parity of the native `TokenRow`.
 */
exports.TokenRow = React.forwardRef(function TokenRow({ symbol, name, amount, decimals = 4, valueCents, currency = 'USD', changePct, icon, iconColor = 'primary', onClick, className, ...rest }, ref) {
    const hasChange = changePct != null;
    const toneKey = (0, format_1.changeToneKey)(changePct ?? 0);
    const interactive = (0, pressable_1.pressableProps)(onClick);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": interactive ? `${symbol} holding` : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]', interactive &&
            'cursor-pointer rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-neutral-100", children: icon != null ? ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: icon, color: iconColor, size: "lg" })) : ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-bold', ICON_TEXT[iconColor]), children: symbol.slice(0, 3).toUpperCase() })) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-surface", children: symbol }), name != null ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted", children: name }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold tabular-nums text-on-surface", children: (0, format_1.formatToken)(amount, { decimals, symbol }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [valueCents != null ? ((0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: valueCents, currency: currency, tone: "neutral", size: "sm" })) : null, hasChange ? ((0, jsx_runtime_1.jsxs)("span", { "aria-label": `${(changePct ?? 0) >= 0 ? 'up' : 'down'} ${(0, format_1.formatPct)(Math.abs(changePct ?? 0))}`, className: (0, cn_1.cn)('text-xs font-semibold tabular-nums', (0, format_1.changeToneClass)(toneKey)), children: [(0, format_1.changeGlyph)(changePct ?? 0), " ", (0, format_1.formatPct)(changePct ?? 0)] })) : null] })] })] }));
});
//# sourceMappingURL=TokenRow.js.map