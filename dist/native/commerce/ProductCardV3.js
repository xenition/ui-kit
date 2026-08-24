"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCardV3 = ProductCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Button_1 = require("../primitives/Button");
const PriceTag_1 = require("./PriceTag");
const GenerativeCover_1 = require("./GenerativeCover");
/**
 * ProductCard — design variant **V3**: a **minimal, borderless** editorial
 * treatment. No card chrome at all: a tiny rounded thumbnail sits beside a small
 * muted, letter-spaced title, and the **price is the hero** (large PriceTag).
 * Separation comes from spacing, not a box. Same props as
 * {@link ProductCardProps}. Token-only.
 */
function ProductCardV3({ title, priceCents, currency = 'USD', compareAtCents, imageUrl, imageAlt, slug, onPress, onAdd, addLabel = 'Add to cart', formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const thumb = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: 44,
            height: 44,
            overflow: 'hidden',
            borderRadius: tokens.radius.full,
            backgroundColor: tokens.ramps.neutral[100],
        }, children: imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: true, accessibilityLabel: imageAlt ?? title, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(GenerativeCover_1.GenerativeCover, { seed: slug ?? title, label: title, style: { width: '100%', height: '100%' } })) }));
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [thumb, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: {
                            flex: 1,
                            minWidth: 0,
                            color: colors.muted,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '600',
                            letterSpacing: 0.5,
                        }, children: title })] }), (0, jsx_runtime_1.jsx)(PriceTag_1.PriceTag, { cents: priceCents, currency: currency, compareAtCents: compareAtCents, formatMoney: formatMoney, size: "lg" }), onAdd ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "link", onPress: onAdd, style: { alignSelf: 'flex-start', paddingHorizontal: 0 }, children: addLabel })) : null] }));
    const containerStyle = [
        {
            gap: tokens.spacing.sm,
            paddingVertical: tokens.spacing.sm,
            backgroundColor: 'transparent',
            borderWidth: 0,
        },
        style,
    ];
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, style: ({ pressed }) => [containerStyle, { opacity: pressed ? 0.7 : 1 }], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: inner });
}
//# sourceMappingURL=ProductCardV3.js.map