"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountCard = AccountCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const MoneyAmount_1 = require("./MoneyAmount");
const mask_1 = require("./internal/mask");
const VARIANT_META = {
    checking: { accent: 'primary', glyph: '🏦', label: 'Checking' },
    savings: { accent: 'success', glyph: '🐖', label: 'Savings' },
    credit: { accent: 'accent', glyph: '💳', label: 'Credit' },
};
/**
 * A single account tile: a tinted variant glyph + name/type header over the
 * balance. `variant` selects the accent `SemanticColors` slot (`checking` →
 * primary, `savings` → success, `credit` → accent) and a default glyph; the
 * balance is integer cents rendered through {@link MoneyAmount} (neutral tone,
 * so a positive balance is not colored "income" green). Token-bound throughout.
 */
function AccountCard({ name, variant, balanceCents, currency = 'USD', accountNumber, icon, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = VARIANT_META[variant];
    const body = ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 36,
                            height: 36,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: colors.surface,
                            borderWidth: 1,
                            borderColor: colors[meta.accent],
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon ?? meta.glyph, color: meta.accent, size: "lg" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: name }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: accountNumber != null ? (0, mask_1.maskAccountNumber)(accountNumber) : meta.label })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.md, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Balance" }), (0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: balanceCents, currency: currency, tone: "neutral", size: "lg" })] })] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}, ${meta.label} account`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: body }));
}
//# sourceMappingURL=AccountCard.js.map