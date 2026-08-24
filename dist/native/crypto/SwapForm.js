"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapForm = SwapForm;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
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
 * fixed-precision formatting (no float drift on screen), and the effective
 * rate line. Submit is blocked until the amount is positive and the two tokens
 * differ. Token-bound throughout; every edit emits the full {@link SwapValues}.
 */
function SwapForm({ from, to, fromAmount = 0, rate, onChange, onFlip, onSubmit, submitLabel = 'Swap', loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const toAmount = rate != null ? fromAmount * rate : undefined;
    const sameToken = from.symbol === to.symbol;
    const canSubmit = fromAmount > 0 && !sameToken;
    const emit = (amount) => {
        onChange?.({ fromSymbol: from.symbol, toSymbol: to.symbol, fromAmount: amount });
    };
    const panelStyle = {
        gap: tokens.spacing.xs,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: tokens.radius.md,
        backgroundColor: tokens.ramps.neutral[100],
        padding: tokens.spacing.md,
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: panelStyle, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "You pay" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.TextInput, { accessibilityLabel: "Pay amount", keyboardType: "decimal-pad", value: fromAmount === 0 ? '' : String(fromAmount), placeholder: "0.0", placeholderTextColor: colors.muted, onChangeText: (t) => emit(parseAmount(t)), style: {
                                    flex: 1,
                                    color: colors.onSurface,
                                    fontSize: tokens.typography.scale.xl,
                                    fontWeight: '700',
                                    padding: 0,
                                } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: from.symbol })] })] }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Flip swap direction", onPress: onFlip, disabled: !onFlip, style: ({ pressed }) => ({
                    alignSelf: 'center',
                    width: 32,
                    height: 32,
                    borderRadius: tokens.radius.full,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: pressed ? 0.7 : 1,
                }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base }, children: "\u21C5" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: panelStyle, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "You receive" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: "Receive amount", style: { flex: 1, color: toAmount != null ? colors.onSurface : colors.muted, fontSize: tokens.typography.scale.xl, fontWeight: '700', fontVariant: ['tabular-nums'] }, children: toAmount != null ? (0, format_1.formatToken)(toAmount, { decimals: to.decimals ?? 4 }) : '—' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: to.symbol })] })] }), rate != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }, children: `1 ${from.symbol} ≈ ${(0, format_1.formatToken)(rate, { decimals: to.decimals ?? 4 })} ${to.symbol}` })) : null, sameToken ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.danger, fontSize: tokens.typography.scale.xs }, children: "Choose two different tokens." })) : null, (0, jsx_runtime_1.jsx)(primitives_1.Button, { onPress: () => onSubmit?.({ fromSymbol: from.symbol, toSymbol: to.symbol, fromAmount }), disabled: !canSubmit, loading: loading, children: submitLabel })] }));
}
//# sourceMappingURL=SwapForm.js.map