"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartLineItem = CartLineItem;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const QuantityStepper_1 = require("./QuantityStepper");
const GenerativeCover_1 = require("./GenerativeCover");
const money_1 = require("./money");
/**
 * One line in a cart — the native mirror of the web `CartLineItem`: thumbnail
 * (image or seeded cover), title + variant, a {@link QuantityStepper}, the line
 * total (`unitPrice × quantity`), and a remove control. Token-only; money is
 * integer cents throughout.
 */
function CartLineItem({ title, variantTitle, quantity, unitPriceCents, currency = 'USD', imageUrl, imageAlt, slug, onQuantityChange, onRemove, min = 1, max, removeLabel, formatMoney: format = money_1.formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const lineTotal = unitPriceCents * quantity;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 64,
                    height: 64,
                    overflow: 'hidden',
                    borderRadius: tokens.radius.md,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: tokens.ramps.neutral[100],
                }, children: imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: true, accessibilityLabel: imageAlt ?? title, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(GenerativeCover_1.GenerativeCover, { seed: slug ?? title, label: title, style: { width: '100%', height: '100%' } })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: title }), variantTitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: variantTitle })) : null] }), onQuantityChange ? ((0, jsx_runtime_1.jsx)(QuantityStepper_1.QuantityStepper, { value: quantity, min: min, max: max, onChange: onQuantityChange, label: `Quantity for ${title}` })) : ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Qty ", quantity] }))] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: format(lineTotal, currency) }), onRemove ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: removeLabel ?? `Remove ${title}`, onPress: onRemove, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Remove" }) })) : null] })] }));
}
//# sourceMappingURL=CartLineItem.js.map