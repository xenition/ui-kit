"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCardV2 = ProductCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Button_1 = require("../primitives/Button");
const PriceTag_1 = require("./PriceTag");
const GenerativeCover_1 = require("./GenerativeCover");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
/**
 * ProductCard — design variant **V2**: a horizontal, media-left **list card**
 * with drop-shadow elevation and no border. Where V1 is a vertical image-top
 * tile, V2 puts a square thumbnail on the left and stacks title → price →
 * add-button in a right-hand column, so it reads as a row in a scrolling list.
 * Same props as {@link ProductCardProps}; only the layout differs. Token-only.
 */
function ProductCardV2({ title, priceCents, currency = 'USD', compareAtCents, imageUrl, imageAlt, slug, onPress, onAdd, addLabel = 'Add to cart', formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const enter = (0, motion_1.useEnter)({ translateY: 8 });
    const media = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: 96,
            height: 96,
            overflow: 'hidden',
            borderRadius: tokens.radius.md,
            backgroundColor: tokens.ramps.neutral[100],
        }, children: imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: true, accessibilityLabel: imageAlt ?? title, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(GenerativeCover_1.GenerativeCover, { seed: slug ?? title, label: title, style: { width: '100%', height: '100%' } })) }));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(PriceTag_1.PriceTag, { cents: priceCents, currency: currency, compareAtCents: compareAtCents, formatMoney: formatMoney }), onAdd ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "soft", onPress: onAdd, children: addLabel })) : null] })] }));
    const containerStyle = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            padding: tokens.spacing.md,
            borderRadius: tokens.radius.lg,
            borderWidth: 0,
            backgroundColor: colors.surface,
            ...(0, elevation_1.shadow)('md', tokens),
        },
        style,
    ];
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [media, body] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: containerStyle, children: inner }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [{ opacity: enter.opacity, transform: enter.transform }, containerStyle], children: inner }));
}
//# sourceMappingURL=ProductCardV2.js.map