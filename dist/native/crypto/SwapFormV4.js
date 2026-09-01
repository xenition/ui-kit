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
exports.SwapFormV4 = SwapFormV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const ButtonV4_1 = require("../primitives/ButtonV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const field_v4_1 = require("../primitives/internal/field-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const amount_v4_1 = require("../../crypto/amount-v4");
const market_v4_1 = require("./internal/market-v4");
const format_1 = require("./internal/format");
/**
 * **V4 swap panel** — same props as {@link SwapForm} plus `maxDecimals`,
 * `flipLabel` and `loadingLabel`.
 *
 * ## Seven changes
 *
 * 1. **A decimal amount can be typed.** This is the whole reason the component
 *    has a V4. The base field was fully controlled off a **number** —
 *    `value={fromAmount === 0 ? '' : String(fromAmount)}` with
 *    `onChangeText={(t) => emit(parseAmount(t))}` — and `parseFloat('1.')` is
 *    `1`, so the instant the user typed the decimal point the parent was
 *    handed `1`, the field re-rendered as `"1"`, and the point vanished from
 *    under the caret. A leading `0` collapsed to `''` and disappeared
 *    outright. Only whole token units could ever be entered, in the one
 *    component in the kit whose submit hands a value to a chain transaction: a
 *    user swapping 0.25 typed `0`, saw nothing, typed `.`, saw nothing, typed
 *    `2`, and submitted **2**. `useAmountField` holds the draft as text, emits
 *    the parsed number, and only overwrites the draft when the parent's value
 *    genuinely disagrees with what is on screen.
 * 2. **The pay field shows focus.** It is the form's only editable control and
 *    the base gave it no focus treatment at all; the panel now takes the
 *    shared field ring and halo while the caret is in it.
 * 3. **Both amounts are tabular.** The receive side was and the pay side was
 *    not, so the two large stacked figures did not line up digit for digit.
 * 4. **The quote is not replaced by its own label.** `accessibilityLabel`
 *    sat on the very `Text` whose content *was* the quote, so a reader heard
 *    "Receive amount" and never the number. The panel is one named element
 *    that contains it.
 * 5. **The flip control is a target.** 32pt became {@link minTap}, and it now
 *    has a disabled state instead of looking identical when there is no
 *    `onFlip` to fire.
 * 6. **`loading` blocks submit** and says so, rather than only spinning.
 * 7. **The same-token hint is announced.** It is a condition present from the
 *    first render, so it is plain text rather than an urgent interruption —
 *    but it is text a reader reaches, which on this twin it was not.
 */
function SwapFormV4({ from, to, fromAmount = 0, rate, maxDecimals = 18, flipLabel = 'Flip direction', loadingLabel = 'Fetching quote', onChange, onFlip, onSubmit, submitLabel = 'Swap', loading = false, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const emit = React.useCallback((amount) => {
        onChange?.({ fromSymbol: from.symbol, toSymbol: to.symbol, fromAmount: amount });
    }, [from.symbol, to.symbol, onChange]);
    const pay = (0, amount_v4_1.useAmountField)(fromAmount, emit, maxDecimals);
    const [focused, setFocused] = React.useState(false);
    // The draft is the truth on screen, so it is the value that submits. When a
    // parent controls `fromAmount` the two agree by construction; when nothing
    // is listening — the barrel's own one-liner — the panel still works.
    const typed = (0, amount_v4_1.amountValue)(pay.text);
    const toAmount = rate != null ? typed * rate : undefined;
    const sameToken = from.symbol === to.symbol;
    const canSubmit = typed > 0 && !sameToken && !loading;
    const toText = toAmount != null ? (0, format_1.formatToken)(toAmount, { decimals: to.decimals ?? 4 }) : '—';
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const panelStyle = {
        gap: tokens.spacing.xs,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: tokens.radius.md,
        backgroundColor: colors.card,
        padding: tokens.spacing.md,
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, field_v4_1.haloStyle)(theme, {
                    showing: focused,
                    accent: (0, field_v4_1.fieldAccent)(theme, false),
                    radius: tokens.radius.md,
                }), children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [panelStyle, { borderColor: focused ? colors.ring : colors.border }], children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "mutedText", children: "You pay" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.TextInput, { accessibilityLabel: "Pay amount", keyboardType: "decimal-pad", value: pay.text, placeholder: "0.0", placeholderTextColor: colors.mutedText, onChangeText: pay.setText, onFocus: () => setFocused(true), onBlur: () => setFocused(false), style: {
                                        flex: 1,
                                        minHeight: tap,
                                        color: colors.onCard,
                                        fontFamily: tokens.typography.fontBody,
                                        fontSize: tokens.typography.scale.xl,
                                        fontWeight: '700',
                                        padding: 0,
                                        ...market_v4_1.TABULAR,
                                    } }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", children: from.symbol })] })] }) }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: flipLabel, accessibilityState: { disabled: !onFlip }, onPress: onFlip, disabled: !onFlip, style: ({ pressed }) => ({
                    alignSelf: 'center',
                    width: tap,
                    height: tap,
                    borderRadius: tokens.radius.full,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: pressed
                        ? (0, state_v4_1.pressOver)(theme, colors.surface, colors.onSurface)
                        : colors.surface,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, !onFlip),
                }), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", tone: "onSurface", accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: "\u21C5" }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: (0, market_v4_1.spokenLine)(['You receive', toText, to.symbol]), children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: panelStyle, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "mutedText", children: "You receive" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xl", weight: "bold", numeric: "tabular", tone: toAmount != null ? 'onCard' : 'mutedText', style: { flex: 1 }, children: toText }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", children: to.symbol })] })] }) }), rate != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: `1 ${from.symbol} ≈ ${(0, format_1.formatToken)(rate, { decimals: to.decimals ?? 4 })} ${to.symbol}` })) : null, sameToken ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "dangerText", children: "Choose two different tokens." })) : null, loading ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", accessibilityLiveRegion: "polite", children: loadingLabel })) : null, (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { onPress: () => onSubmit?.({ fromSymbol: from.symbol, toSymbol: to.symbol, fromAmount: typed }), disabled: !canSubmit, loading: loading, children: submitLabel })] }));
}
//# sourceMappingURL=SwapFormV4.js.map