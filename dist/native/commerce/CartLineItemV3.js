"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartLineItemV3 = CartLineItemV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const QuantityStepper_1 = require("./QuantityStepper");
const GenerativeCover_1 = require("./GenerativeCover");
const money_1 = require("./money");
/**
 * CartLineItem — design variant **V3**: a **compact, dense single line**. Where
 * V1 gives each field its own stacked column and V2 is a card, V3 packs a small
 * thumbnail, the title with an inline · variant, the stepper (or a `×qty` chip),
 * and the line total onto one tight row separated only by a hairline underline.
 * Built for long, scannable carts. Same props as {@link CartLineItemProps}.
 * Token-only; money is integer cents.
 */
function CartLineItemV3({ title, variantTitle, quantity, unitPriceCents, currency = 'USD', imageUrl, imageAlt, slug, onQuantityChange, onRemove, min = 1, max, removeLabel, formatMoney: format = money_1.formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const lineTotal = unitPriceCents * quantity;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 36,
                    height: 36,
                    overflow: 'hidden',
                    borderRadius: tokens.radius.sm,
                    backgroundColor: tokens.ramps.neutral[100],
                }, children: imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: true, accessibilityLabel: imageAlt ?? title, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(GenerativeCover_1.GenerativeCover, { seed: slug ?? title, label: title, style: { width: '100%', height: '100%' } })) }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, minWidth: 0, color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontWeight: '600' }, children: title }), variantTitle ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [" \u00B7 ", variantTitle] })) : null] }), onQuantityChange ? ((0, jsx_runtime_1.jsx)(QuantityStepper_1.QuantityStepper, { value: quantity, min: min, max: max, onChange: onQuantityChange, label: `Quantity for ${title}` })) : ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\u00D7", quantity] })), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600', minWidth: 56, textAlign: 'right' }, children: format(lineTotal, currency) }), onRemove ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: removeLabel ?? `Remove ${title}`, onPress: onRemove, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: "\u00D7" }) })) : null] }));
}
//# sourceMappingURL=CartLineItemV3.js.map