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
exports.PaymentMethodTile = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * A selectable tender tile for the payment screen — the DOM parity of the native
 * `PaymentMethodTile`. A real `<button>`: glyph + word (never color alone) with
 * an optional amount. Selection is carried in `aria-pressed` and drawn as an
 * accent ring + token-tinted fill. `grid` is a compact square; `list` is a
 * labelled full-width row. Money is integer **cents**. Token-only: accent from
 * the method tone.
 */
exports.PaymentMethodTile = React.forwardRef(function PaymentMethodTile({ method, label, selected = false, amountCents, currency = 'USD', variant = 'grid', disabled = false, testID, className, ...rest }, ref) {
    const meta = internal_1.PAYMENT_METHOD_META[method];
    const isList = variant === 'list';
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "aria-pressed": selected, "aria-label": label ?? meta.label, disabled: disabled, "data-xen-payment-method-tile": "", "data-testid": testID, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border p-[var(--xen-space-md)] text-left transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', 'disabled:pointer-events-none disabled:opacity-45', isList ? 'min-h-[56px] flex-row justify-start' : 'min-h-[88px] flex-col justify-center', selected
            ? (0, cn_1.cn)('border-2', internal_1.TONE_BORDER[meta.tone], internal_1.TONE_SOFT_BG[meta.tone])
            : 'border-border bg-surface hover:bg-neutral-100', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-2xl", children: meta.glyph }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('flex flex-col', isList ? 'flex-1 items-start' : 'items-center'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-sm font-semibold', selected ? internal_1.TONE_TEXT[meta.tone] : 'text-on-surface'), children: label ?? meta.label }), typeof amountCents === 'number' ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs tabular-nums text-muted", children: (0, internal_1.formatMoney)(amountCents, currency) })) : null] }), selected ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-sm font-bold', internal_1.TONE_TEXT[meta.tone]), children: "\u2713" })) : null] }));
});
//# sourceMappingURL=PaymentMethodTile.js.map