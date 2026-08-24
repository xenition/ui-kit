"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartLineV3 = CartLineV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const QuantityStepper_1 = require("../commerce/QuantityStepper");
const internal_1 = require("./internal");
/**
 * CartLine — design variant **V3**: a **dense single line**. Where V1 stacks the
 * qty control below the name and V2 is a card, V3 collapses the whole line onto
 * one hairline-separated row — a small `×qty` chip (or the inline stepper), the
 * name with an inline · modifier summary, and a right-aligned line total — for
 * long, scannable tickets. `voided` strikes + mutes. Same props as
 * {@link CartLineProps}. Token-only; money is integer cents.
 */
function CartLineV3({ name, quantity, unitPriceCents, currency = 'USD', modifiers, note, discountCents, onQuantityChange, min = 1, max, onVoid, voidLabel, voided = false, onPress, variant = 'default', testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const gross = (0, internal_1.safeCents)(unitPriceCents) * quantity;
    const discount = Math.min((0, internal_1.safeCents)(discountCents), gross);
    const lineTotal = gross - discount;
    const nameColor = voided ? colors.muted : colors.onSurface;
    const summary = !compact ? [...(modifiers ?? []), note ? `“${note}”` : null].filter(Boolean).join(' · ') : '';
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
                opacity: voided ? 0.6 : 1,
            },
            style,
        ], children: [onQuantityChange && !voided ? ((0, jsx_runtime_1.jsx)(QuantityStepper_1.QuantityStepper, { value: quantity, min: min, max: max, onChange: onQuantityChange, label: `Quantity for ${name}` })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    minWidth: 28,
                    paddingHorizontal: tokens.spacing.xs,
                    paddingVertical: 1,
                    borderRadius: tokens.radius.sm,
                    backgroundColor: tokens.ramps.neutral[100] ?? colors.surface,
                }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600', textAlign: 'center' }, children: ["\u00D7", quantity] }) })), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, minWidth: 0, color: nameColor, fontSize: tokens.typography.scale.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontWeight: '600', textDecorationLine: voided ? 'line-through' : 'none' }, children: name }), summary ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [" \u00B7 ", summary] }) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: nameColor,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '700',
                    minWidth: 60,
                    textAlign: 'right',
                    textDecorationLine: voided ? 'line-through' : 'none',
                }, children: (0, internal_1.formatMoney)(lineTotal, currency) }), onVoid ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: voidLabel ?? `Void ${name}`, onPress: onVoid, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.danger, fontSize: tokens.typography.scale.base }, children: "\u00D7" }) })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}, ${quantity} for ${(0, internal_1.formatMoney)(lineTotal, currency)}`, onPress: onPress, testID: testID, children: body }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: body });
}
//# sourceMappingURL=CartLineV3.js.map