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
exports.SwapForm = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Button_1 = require("../primitives/Button");
const Input_1 = require("../primitives/Input");
const format_1 = require("./internal/format");
/** Parse a user-typed amount to a non-negative float; blank/garbage → 0. */
function parseAmount(text) {
    const cleaned = text.replace(/[^0-9.]/g, '');
    const n = Number.parseFloat(cleaned);
    return Number.isFinite(n) && n >= 0 ? n : 0;
}
/**
 * A controlled token-swap panel: an editable `from` amount, a flip control, a
 * derived (read-only) `to` amount computed as `fromAmount * rate` with stable
 * fixed-precision formatting (no float drift on screen), and the effective rate
 * line. Submit is blocked (button disabled) until the amount is positive and
 * the two tokens differ. Every edit emits the full {@link SwapValues}. Web
 * parity of the native `SwapForm`.
 */
exports.SwapForm = React.forwardRef(function SwapForm({ from, to, fromAmount = 0, rate, onChange, onFlip, onSubmit, submitLabel = 'Swap', loading = false, className, ...rest }, ref) {
    const toAmount = rate != null ? fromAmount * rate : undefined;
    const sameToken = from.symbol === to.symbol;
    const canSubmit = fromAmount > 0 && !sameToken;
    const emit = (amount) => {
        onChange?.({ fromSymbol: from.symbol, toSymbol: to.symbol, fromAmount: amount });
    };
    const panel = 'flex flex-col gap-1 rounded-[var(--xen-radius-md)] border border-border bg-neutral-100 p-[var(--xen-space-md)]';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: panel, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: "You pay" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(Input_1.Input, { "aria-label": "Pay amount", inputMode: "decimal", value: fromAmount === 0 ? '' : String(fromAmount), placeholder: "0.0", onChange: (event) => emit(parseAmount(event.target.value)), className: "flex-1 border-0 bg-transparent px-0 text-xl font-bold focus:ring-0" }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: from.symbol })] })] }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Flip swap direction", onClick: onFlip, disabled: !onFlip, className: (0, cn_1.cn)('flex h-8 w-8 items-center justify-center self-center rounded-full border border-border bg-surface text-on-surface', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', 'disabled:pointer-events-none disabled:opacity-50'), children: "\u21C5" }), (0, jsx_runtime_1.jsxs)("div", { className: panel, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: "You receive" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-label": "Receive amount", className: (0, cn_1.cn)('flex-1 text-xl font-bold tabular-nums', toAmount != null ? 'text-on-surface' : 'text-muted'), children: toAmount != null ? (0, format_1.formatToken)(toAmount, { decimals: to.decimals ?? 4 }) : '—' }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: to.symbol })] })] }), rate != null ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs tabular-nums text-muted", children: `1 ${from.symbol} ≈ ${(0, format_1.formatToken)(rate, { decimals: to.decimals ?? 4 })} ${to.symbol}` })) : null, sameToken ? ((0, jsx_runtime_1.jsx)("p", { className: "text-xs text-danger", role: "alert", children: "Choose two different tokens." })) : null, (0, jsx_runtime_1.jsx)(Button_1.Button, { onClick: () => onSubmit?.({ fromSymbol: from.symbol, toSymbol: to.symbol, fromAmount }), disabled: !canSubmit || loading, children: submitLabel })] }));
});
//# sourceMappingURL=SwapForm.js.map