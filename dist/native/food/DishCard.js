"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DishCard = DishCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Button_1 = require("../primitives/Button");
const Rating_1 = require("../primitives/Rating");
const commerce_1 = require("../commerce");
/**
 * A single menu item — the food-domain sibling of `ProductCard`. Renders a
 * photo (or a token-tinted placeholder), name, description, an optional star
 * rating and dietary `badges`, a {@link PriceTag} when `priceCents` is given,
 * and an optional add button.
 * `variant` switches between a horizontal `list` row, a vertical `grid` tile,
 * and a larger `featured` hero. `soldOut` dims the card and disables adding;
 * `loading` shows a token-only skeleton. Colors come only from theme tokens.
 */
function DishCard({ name, description, priceCents, currency = 'USD', imageUrl, rating, badges, variant = 'list', soldOut = false, loading = false, onPress, onAdd, addLabel = 'Add', soldOutLabel = 'Sold out', formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const horizontal = variant === 'list';
    const mediaSize = variant === 'featured' ? undefined : horizontal ? 88 : undefined;
    const containerStyle = [
        {
            flexDirection: horizontal ? 'row' : 'column',
            gap: tokens.spacing.md,
            overflow: 'hidden',
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
            padding: horizontal ? tokens.spacing.md : 0,
            opacity: soldOut ? 0.6 : 1,
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading dish", style: containerStyle, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: mediaSize ?? '100%',
                        height: mediaSize ?? 140,
                        borderRadius: tokens.radius.md,
                        backgroundColor: tokens.ramps.neutral[200],
                    } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.sm, padding: horizontal ? 0 : tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 14, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '90%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } })] })] }));
    }
    const media = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: mediaSize ?? '100%',
            height: mediaSize ?? (variant === 'featured' ? 180 : 140),
            borderRadius: tokens.radius.md,
            overflow: 'hidden',
            backgroundColor: tokens.ramps.neutral[100],
        }, children: imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: true, accessibilityLabel: name, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : null }));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs, padding: horizontal ? 0 : tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: horizontal ? 1 : 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: name }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: description })) : null, typeof rating === 'number' ? (0, jsx_runtime_1.jsx)(Rating_1.Rating, { value: rating, size: "sm", showValue: true }) : null, badges ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: badges })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.xs,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }, children: [typeof priceCents === 'number' ? ((0, jsx_runtime_1.jsx)(commerce_1.PriceTag, { cents: priceCents, currency: currency, formatMoney: formatMoney })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), soldOut ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.danger, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: soldOutLabel })) : onAdd ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", onPress: onAdd, disabled: soldOut, children: addLabel })) : null] })] }));
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [media, body] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, accessibilityState: { disabled: soldOut }, onPress: onPress, style: ({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : soldOut ? 0.6 : 1 }], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: inner });
}
//# sourceMappingURL=DishCard.js.map