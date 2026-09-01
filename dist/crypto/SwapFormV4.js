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
exports.SwapFormV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const ButtonV4_1 = require("../primitives/ButtonV4");
const InputV4_1 = require("../primitives/InputV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const amount_v4_1 = require("./amount-v4");
const market_v4_1 = require("./internal/market-v4");
const format_1 = require("./internal/format");
/** The one panel both money fields sit in — a card, not a ramp step. */
const PANEL_CLASS = 'flex flex-col gap-xs rounded-[var(--xen-radius-md)] border border-border bg-card p-md';
/** 44 on both axes. `MIN_TAP_CLASS` supplies the height; this the width. */
const FLIP_WIDTH_CLASS = 'min-w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]';
/**
 * **V4 swap form** — the web twin of the native `SwapFormV4`, same props as
 * {@link SwapForm} plus `maxDecimals`, `flipLabel` and `loadingLabel`.
 *
 * ## Seven changes
 *
 * 1. **A decimal amount can finally be typed.** The field was fully controlled
 *    off a *number*: `value={String(fromAmount)}` with
 *    `onChange={(e) => emit(parseAmount(e.target.value))}`. `parseFloat('1.')`
 *    is `1`, so the instant the user typed the decimal point the parent was
 *    handed `1`, the field re-rendered as `"1"`, and the point vanished from
 *    under the caret; a leading `0` collapsed to `''` and disappeared outright.
 *    Only whole token units could ever be entered — in the one component whose
 *    submit hands a value to a chain transaction. Someone swapping 0.25 typed
 *    `0`, saw nothing, typed `.`, saw nothing, typed `2`, and submitted **2**.
 *    The field now binds to `useAmountField`, which holds the draft as text and
 *    emits the parsed number.
 * 2. **The pay field has a visible focus indicator.** The base set `border-0`
 *    *and* `focus:ring-0` on the form's only editable control, so a keyboard
 *    user tabbing into the amount got no indication of where they were.
 * 3. **Both money figures are tabular.** Only the receive side was, so the two
 *    large stacked numbers did not line up digit for digit.
 * 4. **The receive amount is not replaced by its own label.** `aria-label`
 *    sat on the very element whose text *was* the quote, so a reader heard
 *    "Receive amount" and never the number.
 * 5. **The flip control clears 44** — it was a 32px disc — and its disabled
 *    state is M3's 0.38, not a guessed 0.5.
 * 6. **`loading` says so.** It disabled the button and nothing else, so a
 *    quote in flight was indistinguishable from an invalid form.
 * 7. **The same-token hint is not `role="alert"`.** It is present from first
 *    render rather than arriving as an urgent update, and interrupting a
 *    reader with a condition that was already true teaches them to ignore the
 *    channel.
 */
exports.SwapFormV4 = React.forwardRef(function SwapFormV4({ from, to, fromAmount = 0, rate, onChange, onFlip, onSubmit, submitLabel = 'Swap', loading = false, maxDecimals = 18, flipLabel = 'Flip direction', loadingLabel = 'Fetching quote', className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const emit = React.useCallback((next) => {
        onChange?.({ fromSymbol: from.symbol, toSymbol: to.symbol, fromAmount: next });
    }, [onChange, from.symbol, to.symbol]);
    const amount = (0, amount_v4_1.useAmountField)(fromAmount, emit, maxDecimals);
    // Read the draft rather than the prop, so the form still works for a caller
    // who mounts it without `onChange` — the base's own barrel doc shows exactly
    // that usage, and it could never produce a positive amount.
    const typed = (0, amount_v4_1.amountValue)(amount.text);
    const toAmount = rate != null ? typed * rate : undefined;
    const sameToken = from.symbol === to.symbol;
    const canSubmit = typed > 0 && !sameToken;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: PANEL_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted-text", children: "You pay" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(InputV4_1.InputV4, { "aria-label": "Pay amount", inputMode: "decimal", value: amount.text, placeholder: "0.0", onChange: (event) => amount.setText(event.target.value), containerClassName: "min-w-0 flex-1", 
                                // Borderless inside the panel, but `InputV4`'s focus halo is a
                                // box-shadow rather than a border swap, so dropping the border
                                // costs nothing and the focus indicator survives.
                                className: (0, cn_1.cn)('border-0 bg-transparent px-0 text-xl font-bold', market_v4_1.TABULAR_CLASS) }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-card", children: from.symbol })] })] }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": flipLabel, onClick: onFlip, disabled: !onFlip, "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)'), className: (0, cn_1.cn)('flex items-center justify-center self-center rounded-[var(--xen-radius-full)]', 'border border-border bg-surface text-on-surface', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', chrome_v4_1.MIN_TAP_CLASS, FLIP_WIDTH_CLASS, v4_state_1.V4_DISABLED_CLASS), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u21C5" }) }), (0, jsx_runtime_1.jsxs)("div", { className: PANEL_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted-text", children: "You receive" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex-1 text-xl font-bold', market_v4_1.TABULAR_CLASS, toAmount != null ? 'text-on-card' : 'text-muted-text'), children: toAmount != null ? (0, format_1.formatToken)(toAmount, { decimals: to.decimals ?? 4 }) : '—' }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-card", children: to.symbol })] })] }), rate != null ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs text-muted-text', market_v4_1.TABULAR_CLASS), children: `1 ${from.symbol} ≈ ${(0, format_1.formatToken)(rate, { decimals: to.decimals ?? 4 })} ${to.symbol}` })) : null, sameToken ? ((0, jsx_runtime_1.jsx)("p", { className: "text-xs text-danger-text", children: "Choose two different tokens." })) : null, loading ? ((0, jsx_runtime_1.jsx)("span", { role: "status", "aria-live": "polite", className: "text-xs text-muted-text", children: loadingLabel })) : null, (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { onClick: () => onSubmit?.({ fromSymbol: from.symbol, toSymbol: to.symbol, fromAmount: typed }), disabled: !canSubmit || loading, children: submitLabel })] }));
});
//# sourceMappingURL=SwapFormV4.js.map