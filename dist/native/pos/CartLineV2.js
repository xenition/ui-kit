"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartLineV2 = CartLineV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const QuantityStepper_1 = require("../commerce/QuantityStepper");
const elevation_1 = require("../primitives/internal/elevation");
const internal_1 = require("./internal");
/**
 * CartLine — design variant **V2**: an **elevated card** with a token-tinted
 * thumbnail plate. Where V1 is a flat row, V2 gives the line its own floating
 * surface — a rounded plate carrying the item's initials (the kit ships no image
 * loader, so a line never blanks), a title + modifiers/note header, and a footer
 * that pairs the inline {@link QuantityStepper} with a bold line total and a
 * per-line discount. `voided` strikes + mutes (state by text, not color alone).
 * Same props as {@link CartLineProps}. Token-only; money is integer cents.
 */
function CartLineV2({ name, quantity, unitPriceCents, currency = 'USD', modifiers, note, discountCents, onQuantityChange, min = 1, max, onVoid, voidLabel, voided = false, onPress, variant = 'default', testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const gross = (0, internal_1.safeCents)(unitPriceCents) * quantity;
    const discount = Math.min((0, internal_1.safeCents)(discountCents), gross);
    const lineTotal = gross - discount;
    const nameColor = voided ? colors.muted : colors.onSurface;
    const plateTint = tokens.ramps.neutral[(0, internal_1.seedRampStep)(name)];
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'flex-start' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 56,
                    height: 56,
                    borderRadius: tokens.radius.md,
                    backgroundColor: plateTint,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: (0, internal_1.initials)(name) }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                            color: nameColor,
                                            fontSize: tokens.typography.scale.base,
                                            fontWeight: '600',
                                            textDecorationLine: voided ? 'line-through' : 'none',
                                        }, children: name }), !compact && modifiers && modifiers.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: modifiers.join(' · ') })) : null, !compact && note ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontStyle: 'italic' }, children: ["\u201C", note, "\u201D"] })) : null] }), onVoid ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: voidLabel ?? `Void ${name}`, onPress: onVoid, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.danger, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: voided ? 'Voided' : 'Void' }) })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [onQuantityChange && !voided ? ((0, jsx_runtime_1.jsx)(QuantityStepper_1.QuantityStepper, { value: quantity, min: min, max: max, onChange: onQuantityChange, label: `Quantity for ${name}` })) : ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [quantity, " \u00D7 ", (0, internal_1.formatMoney)(unitPriceCents, currency)] })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                            color: nameColor,
                                            fontSize: tokens.typography.scale.base,
                                            fontWeight: '700',
                                            textDecorationLine: voided ? 'line-through' : 'none',
                                        }, children: (0, internal_1.formatMoney)(lineTotal, currency) }), discount > 0 && !voided ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: ["\u2212", (0, internal_1.formatMoney)(discount, currency)] })) : null] })] })] })] }));
    const cardStyle = {
        padding: tokens.spacing.md,
        borderRadius: tokens.radius.lg,
        backgroundColor: colors.surface,
        opacity: voided ? 0.6 : 1,
        ...(0, elevation_1.shadow)('md', tokens),
    };
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}, ${quantity} for ${(0, internal_1.formatMoney)(lineTotal, currency)}`, onPress: onPress, testID: testID, style: [cardStyle, style], children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, style: [cardStyle, style], children: body }));
}
//# sourceMappingURL=CartLineV2.js.map