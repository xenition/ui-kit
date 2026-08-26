"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DishCardV2 = DishCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Rating_1 = require("../primitives/Rating");
const commerce_1 = require("../commerce");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
/**
 * DishCard, alternate design **V2** — an *image-hero* tile. Where the classic
 * card is a horizontal thumb-plus-text row, V2 leads with a full-width photo
 * that fills the top of the card, floats the {@link PriceTag} in a frosted pill
 * over the bottom-left of the image, and hangs a circular add button off the
 * bottom-right so it reads like a delivery-app feature card. Text lives below
 * on the solid surface (never over the photo) so contrast holds in both
 * schemes. `soldOut`, `loading`, and every prop behave exactly as the classic.
 */
function DishCardV2({ name, description, priceCents, currency = 'USD', imageUrl, rating, badges, soldOut = false, loading = false, onPress, onAdd, addLabel = 'Add', soldOutLabel = 'Sold out', formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const containerStyle = [
        {
            overflow: 'hidden',
            borderRadius: tokens.radius.lg,
            backgroundColor: colors.surface,
            opacity: soldOut ? 0.6 : 1,
            ...(0, elevation_1.shadow)('md', tokens),
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading dish", style: containerStyle, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: '100%', height: 168, backgroundColor: tokens.ramps.neutral[200] } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm, padding: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 14, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '85%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } })] })] }));
    }
    const hero = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: '100%', height: 168, backgroundColor: tokens.ramps.neutral[100] }, children: [imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: true, accessibilityLabel: name, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : null, typeof priceCents === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    left: tokens.spacing.sm,
                    bottom: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.sm,
                    paddingVertical: tokens.spacing.xs,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, color_1.withAlpha)(colors.surface, 0.92),
                }, children: (0, jsx_runtime_1.jsx)(commerce_1.PriceTag, { cents: priceCents, currency: currency, formatMoney: formatMoney, size: "sm" }) })) : null, soldOut ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    top: tokens.spacing.sm,
                    left: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.sm,
                    paddingVertical: tokens.spacing.xs,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, color_1.withAlpha)(colors.danger, 0.16),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.dangerText, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: soldOutLabel }) })) : null] }));
    const floatingAdd = !soldOut && onAdd ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: addLabel, onPress: onAdd, style: ({ pressed }) => ({
            position: 'absolute',
            right: tokens.spacing.md,
            top: 168 - 22,
            minWidth: 44,
            height: 44,
            paddingHorizontal: tokens.spacing.md,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.primary,
            opacity: pressed ? 0.85 : 1,
            ...(0, elevation_1.shadow)('md', tokens),
        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onPrimary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: addLabel }) })) : null;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs, padding: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: name }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: description })) : null, typeof rating === 'number' ? (0, jsx_runtime_1.jsx)(Rating_1.Rating, { value: rating, size: "sm", showValue: true }) : null, badges ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }, children: badges })) : null] }));
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [hero, floatingAdd] }), body] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, accessibilityState: { disabled: soldOut }, onPress: onPress, style: ({ pressed }) => [containerStyle, { opacity: pressed ? 0.92 : soldOut ? 0.6 : 1 }], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: inner });
}
//# sourceMappingURL=DishCardV2.js.map