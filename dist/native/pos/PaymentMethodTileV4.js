"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodTileV4 = PaymentMethodTileV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
/**
 * PaymentMethodTile — **V4** "register" design. A tactile tender tile: the method
 * glyph sits in a **soft-tint disc**, the word beside/under it (never color
 * alone), with an optional amount. A big (≥44px) tap target; `selected` lifts
 * with an accent ring + token-tinted fill and a `✓`, all carried in
 * `accessibilityState.selected`. Same props/behavior as
 * {@link PaymentMethodTileProps}; token-only: accent from the method tone, tints
 * via `withAlpha` (no literals).
 */
function PaymentMethodTileV4({ method, label, selected = false, disabled = false, amountCents, currency = 'USD', onPress, variant = 'grid', testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = internal_1.PAYMENT_METHOD_META[method];
    const accent = (0, internal_1.toneColor)(colors, meta.tone);
    const isList = variant === 'list';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected, disabled }, accessibilityLabel: label ?? meta.label, disabled: disabled, onPress: onPress, testID: testID, style: ({ pressed }) => [
            {
                flexDirection: isList ? 'row' : 'column',
                alignItems: 'center',
                justifyContent: isList ? 'flex-start' : 'center',
                gap: tokens.spacing.sm,
                minHeight: isList ? 56 : 96,
                padding: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                borderWidth: selected ? 2 : 1,
                borderColor: selected ? accent : colors.border,
                backgroundColor: selected ? (0, internal_1.withAlpha)(accent, 0.12) : colors.surface,
                opacity: disabled ? 0.45 : pressed ? 0.85 : 1,
                ...(selected
                    ? { shadowColor: accent, shadowOpacity: 0.18, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 3 }
                    : {}),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, internal_1.withAlpha)(accent, selected ? 0.2 : 0.1),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['2xl'] }, children: meta.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: isList ? 1 : undefined, alignItems: isList ? 'flex-start' : 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            color: selected ? accent : colors.onSurface,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '700',
                        }, children: label ?? meta.label }), typeof amountCents === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: (0, internal_1.formatMoney)(amountCents, currency) })) : null] }), selected ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: accent, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: "\u2713" })) : null] }));
}
//# sourceMappingURL=PaymentMethodTileV4.js.map