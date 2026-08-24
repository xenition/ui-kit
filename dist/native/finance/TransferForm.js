"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferForm = TransferForm;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * A controlled money-transfer form: from/to account {@link Select}s, a
 * {@link CurrencyInput} amount (major units on screen, integer **cents** in the
 * value bag — converted with a single round, no float drift), and an optional
 * note. Every edit emits the full {@link TransferValues} via `onChange`; submit
 * is blocked (and the button disabled) until both accounts differ and the
 * amount is positive. A `danger`-toned validation line appears when the same
 * account is picked twice. Token-bound throughout.
 */
function TransferForm({ accounts, fromAccountId = '', toAccountId = '', amountCents = 0, note = '', currencySymbol = '$', onChange, onSubmit, submitLabel = 'Transfer', loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const options = accounts.map((a) => ({ label: a.label, value: a.id }));
    const emit = (patch) => {
        onChange?.({ fromAccountId, toAccountId, amountCents, note, ...patch });
    };
    const sameAccount = fromAccountId !== '' && fromAccountId === toAccountId;
    const canSubmit = fromAccountId !== '' && toAccountId !== '' && !sameAccount && amountCents > 0;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsx)(primitives_1.Field, { label: "From", children: (0, jsx_runtime_1.jsx)(primitives_1.Select, { options: options, value: fromAccountId || undefined, placeholder: "Select account", onValueChange: (v) => emit({ fromAccountId: v }), accessibilityLabel: "From account" }) }), (0, jsx_runtime_1.jsx)(primitives_1.Field, { label: "To", children: (0, jsx_runtime_1.jsx)(primitives_1.Select, { options: options, value: toAccountId || undefined, placeholder: "Select account", invalid: sameAccount, onValueChange: (v) => emit({ toAccountId: v }), accessibilityLabel: "To account" }) }), sameAccount ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.danger, fontSize: tokens.typography.scale.xs }, children: "Choose two different accounts." })) : null, (0, jsx_runtime_1.jsx)(primitives_1.Field, { label: "Amount", children: (0, jsx_runtime_1.jsx)(primitives_1.CurrencyInput, { value: amountCents === 0 ? null : amountCents / 100, symbol: currencySymbol, onChange: (n) => emit({ amountCents: n == null ? 0 : Math.round(n * 100) }), accessibilityLabel: "Transfer amount" }) }), (0, jsx_runtime_1.jsx)(primitives_1.Field, { label: "Note", children: (0, jsx_runtime_1.jsx)(primitives_1.Input, { value: note, placeholder: "What's this for?", onChangeText: (t) => emit({ note: t }), accessibilityLabel: "Transfer note" }) }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { onPress: () => onSubmit?.({ fromAccountId, toAccountId, amountCents, note }), disabled: !canSubmit, loading: loading, children: submitLabel })] }));
}
//# sourceMappingURL=TransferForm.js.map