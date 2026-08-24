"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartLine = CartLine;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const QuantityStepper_1 = require("../commerce/QuantityStepper");
const internal_1 = require("./internal");
/**
 * One line on the register ticket — the POS sibling of the commerce
 * `CartLineItem`: name, an inline {@link QuantityStepper} (or read-only qty),
 * modifiers/notes, an optional per-line discount, the line total, and a void
 * control. A `voided` line strikes through and mutes (state by text + style,
 * never color alone). Money is integer **cents** via `formatMoney`. Token-only.
 */
function CartLine({ name, quantity, unitPriceCents, currency = 'USD', modifiers, note, discountCents, onQuantityChange, min = 1, max, onVoid, voidLabel, voided = false, onPress, variant = 'default', testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const gross = (0, internal_1.safeCents)(unitPriceCents) * quantity;
    const discount = Math.min((0, internal_1.safeCents)(discountCents), gross);
    const lineTotal = gross - discount;
    const nameColor = voided ? colors.muted : colors.onSurface;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: tokens.spacing.md,
                paddingVertical: compact ? tokens.spacing.sm : tokens.spacing.md,
                opacity: voided ? 0.6 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            color: nameColor,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '600',
                            textDecorationLine: voided ? 'line-through' : 'none',
                        }, children: name }), !compact && modifiers && modifiers.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: modifiers.join(' · ') })) : null, !compact && note ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontStyle: 'italic' }, children: ["\u201C", note, "\u201D"] })) : null, onQuantityChange && !voided ? ((0, jsx_runtime_1.jsx)(QuantityStepper_1.QuantityStepper, { value: quantity, min: min, max: max, onChange: onQuantityChange, label: `Quantity for ${name}` })) : ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [quantity, " \u00D7 ", (0, internal_1.formatMoney)(unitPriceCents, currency)] }))] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: nameColor,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '700',
                            textDecorationLine: voided ? 'line-through' : 'none',
                        }, children: (0, internal_1.formatMoney)(lineTotal, currency) }), discount > 0 && !voided ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: ["\u2212", (0, internal_1.formatMoney)(discount, currency)] })) : null, onVoid ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: voidLabel ?? `Void ${name}`, onPress: onVoid, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.danger, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: voided ? 'Voided' : 'Void' }) })) : null] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}, ${quantity} for ${(0, internal_1.formatMoney)(lineTotal, currency)}`, onPress: onPress, testID: testID, children: body }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: body });
}
//# sourceMappingURL=CartLine.js.map