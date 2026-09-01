"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartLineV4 = CartLineV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
/**
 * CartLine — **V4** "register" design. The tactile checkout take on a ticket
 * line: product name + modifiers on the left, a **big bold line total** in
 * `tabular-nums` weight on the right (the number a busy counter scans), and a
 * chunky ≥44px −/+ qty stepper with a satisfying press. A `voided` line strikes
 * through and mutes (state by text + style, never color alone). One accent =
 * **primary**; money is integer **cents** via `formatMoney`. Same props/behavior
 * as {@link CartLineProps}; token-only via `useXenitionTheme()`.
 */
function CartLineV4({ name, quantity, unitPriceCents, currency = 'USD', modifiers, note, discountCents, onQuantityChange, min = 1, max, onVoid, voidLabel, voided = false, onPress, variant = 'default', testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const accent = (0, internal_1.toneColor)(colors, 'primary');
    const gross = (0, internal_1.safeCents)(unitPriceCents) * quantity;
    const discount = Math.min((0, internal_1.safeCents)(discountCents), gross);
    const lineTotal = gross - discount;
    const nameColor = voided ? colors.muted : colors.onSurface;
    const atMin = quantity <= min;
    const atMax = typeof max === 'number' && quantity >= max;
    const StepButton = ({ glyph, label, disabled, onPress: onStep, }) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, accessibilityState: { disabled }, disabled: disabled, onPress: onStep, style: ({ pressed }) => ({
            width: 44,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.md,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: pressed ? (0, internal_1.withAlpha)(accent, 0.12) : colors.surface,
            opacity: disabled ? 0.4 : 1,
        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: glyph }) }));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: tokens.spacing.md,
                paddingVertical: compact ? tokens.spacing.sm : tokens.spacing.md,
                opacity: voided ? 0.6 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            color: nameColor,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '700',
                            textDecorationLine: voided ? 'line-through' : 'none',
                        }, children: name }), !compact && modifiers && modifiers.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: modifiers.join(' · ') })) : null, !compact && note ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontStyle: 'italic' }, children: ["\u201C", note, "\u201D"] })) : null, onQuantityChange && !voided ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "adjustable", accessibilityLabel: `Quantity for ${name}`, style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(StepButton, { glyph: "\u2212", label: "Decrease quantity", disabled: atMin, onPress: () => onQuantityChange(quantity - 1) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { minWidth: 28, textAlign: 'center', color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: quantity }), (0, jsx_runtime_1.jsx)(StepButton, { glyph: "+", label: "Increase quantity", disabled: atMax, onPress: () => onQuantityChange(quantity + 1) })] })) : ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [quantity, " \u00D7 ", (0, internal_1.formatMoney)(unitPriceCents, currency)] }))] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: nameColor,
                            fontSize: tokens.typography.scale.lg,
                            fontWeight: '800',
                            textDecorationLine: voided ? 'line-through' : 'none',
                        }, children: (0, internal_1.formatMoney)(lineTotal, currency) }), discount > 0 && !voided ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: ["\u2212", (0, internal_1.formatMoney)(discount, currency)] })) : null, onVoid ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: voidLabel ?? `Void ${name}`, onPress: onVoid, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.danger, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: voided ? 'Voided' : 'Void' }) })) : null] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}, ${quantity} for ${(0, internal_1.formatMoney)(lineTotal, currency)}`, onPress: onPress, testID: testID, children: body }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: body });
}
//# sourceMappingURL=CartLineV4.js.map