"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartLineItemV2 = CartLineItemV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const QuantityStepper_1 = require("./QuantityStepper");
const GenerativeCover_1 = require("./GenerativeCover");
const money_1 = require("./money");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
/**
 * CartLineItem — design variant **V2**: a self-contained **elevated card** with
 * a large, prominent thumbnail. Where V1 is a flat row with the stepper on the
 * right, V2 gives the line its own surface: a big cover on the left, the title +
 * variant and a **remove ×** in a header row, and a footer row that pairs the
 * inline {@link QuantityStepper} with a bold line total. Same props as
 * {@link CartLineItemProps}. Token-only; money is integer cents.
 */
function CartLineItemV2({ title, variantTitle, quantity, unitPriceCents, currency = 'USD', imageUrl, imageAlt, slug, onQuantityChange, onRemove, min = 1, max, removeLabel, formatMoney: format = money_1.formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 6 });
    const lineTotal = unitPriceCents * quantity;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [
            {
                opacity: enter.opacity,
                transform: enter.transform,
                flexDirection: 'row',
                gap: tokens.spacing.md,
                padding: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                backgroundColor: colors.surface,
                ...(0, elevation_1.shadow)('md', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 88,
                    height: 88,
                    overflow: 'hidden',
                    borderRadius: tokens.radius.md,
                    backgroundColor: tokens.ramps.neutral[100],
                }, children: imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: true, accessibilityLabel: imageAlt ?? title, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(GenerativeCover_1.GenerativeCover, { seed: slug ?? title, label: title, style: { width: '100%', height: '100%' } })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: title }), variantTitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: variantTitle })) : null] }), onRemove ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: removeLabel ?? `Remove ${title}`, onPress: onRemove, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.lg }, children: "\u00D7" }) })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [onQuantityChange ? ((0, jsx_runtime_1.jsx)(QuantityStepper_1.QuantityStepper, { value: quantity, min: min, max: max, onChange: onQuantityChange, label: `Quantity for ${title}` })) : ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Qty ", quantity] })), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: format(lineTotal, currency) })] })] })] }));
}
//# sourceMappingURL=CartLineItemV2.js.map