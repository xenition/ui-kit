"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRecommendation = ProductRecommendation;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const primitives_1 = require("../primitives");
const money_1 = require("../commerce/money");
/**
 * A retail product recommendation row for after-service upsell: thumbnail,
 * brand + name, a star rating, a highlighted "reason" line, the price, and an
 * add-to-bag CTA. `added` swaps the CTA to a done state; `soldOut` disables it
 * (state, not color alone). Missing image degrades to a token-tinted square.
 * Prices are integer cents via {@link formatMoney}. Token-only colors.
 */
function ProductRecommendation({ name, priceCents, currency = 'USD', brand, rating, imageUrl, reason, added = false, soldOut = false, formatMoney: format = money_1.formatMoney, addLabel = 'Add', onAdd, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const priceText = format(priceCents, currency);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: onPress ? 'button' : undefined, accessibilityLabel: `${brand ? `${brand} ` : ''}${name}, ${priceText}${soldOut ? ', sold out' : ''}${added ? ', in bag' : ''}`, disabled: !onPress, onPress: onPress, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                gap: tokens.spacing.md,
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.md,
                opacity: pressed && onPress ? 0.94 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 64, height: 64, borderRadius: tokens.radius.md, overflow: 'hidden', backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.14), alignItems: 'center', justifyContent: 'center' }, children: imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: "\uD83E\uDDF4" })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [brand ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }, children: brand })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), rating != null ? (0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating, size: "sm" }) : null, reason ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.accent, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: reason })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: priceText }), onAdd ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: added ? 'soft' : 'primary', size: "sm", onPress: onAdd, disabled: soldOut, children: soldOut ? 'Sold out' : added ? '✓ Added' : addLabel })) : null] })] })] }));
}
//# sourceMappingURL=ProductRecommendation.js.map