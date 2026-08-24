"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCard = ProductCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Button_1 = require("../primitives/Button");
const PriceTag_1 = require("./PriceTag");
const GenerativeCover_1 = require("./GenerativeCover");
/**
 * Catalog product tile — the native mirror of the web `ProductCard`: media
 * (image, or a seeded {@link GenerativeCover} when `imageUrl` is absent),
 * title, {@link PriceTag}, and an optional add button. The whole card is
 * pressable via `onPress` (native's `href`). Token-only.
 */
function ProductCard({ title, priceCents, currency = 'USD', compareAtCents, imageUrl, imageAlt, slug, onPress, onAdd, addLabel = 'Add to cart', formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const media = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { aspectRatio: 4 / 5, width: '100%', backgroundColor: tokens.ramps.neutral[100] }, children: imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: true, accessibilityLabel: imageAlt ?? title, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(GenerativeCover_1.GenerativeCover, { seed: slug ?? title, label: title, style: { width: '100%', height: '100%' } })) }));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.sm, padding: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: title }), (0, jsx_runtime_1.jsx)(PriceTag_1.PriceTag, { cents: priceCents, currency: currency, compareAtCents: compareAtCents, formatMoney: formatMoney }), onAdd ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", onPress: onAdd, style: { marginTop: tokens.spacing.xs }, children: addLabel })) : null] }));
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [media, body] }));
    const containerStyle = [
        {
            flex: 1,
            overflow: 'hidden',
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
        },
        style,
    ];
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, style: ({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : 1 }], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: inner });
}
//# sourceMappingURL=ProductCard.js.map