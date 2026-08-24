"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantCard = RestaurantCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Rating_1 = require("../primitives/Rating");
const Badge_1 = require("../primitives/Badge");
const OPEN_LABEL = {
    open: 'Open',
    closed: 'Closed',
    busy: 'Busy',
};
/**
 * A restaurant / vendor tile — image, name, cuisine, star rating with count,
 * price level, and a delivery ETA line, plus an availability `Badge`. `variant`
 * switches a horizontal `list` row, a `grid` tile, and a full-bleed `hero`.
 * `closed`/`busy` states dim the card and are labelled in text (not color
 * alone). Reuses the `Rating` and `Badge` primitives. Token-only.
 */
function RestaurantCard({ name, cuisine, rating, ratingCount, priceLevel, etaText, feeText, imageUrl, openState = 'open', variant = 'list', onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const horizontal = variant === 'list';
    const dimmed = openState !== 'open';
    const media = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: horizontal ? 96 : '100%',
            height: horizontal ? 96 : variant === 'hero' ? 180 : 120,
            borderRadius: tokens.radius.md,
            overflow: 'hidden',
            backgroundColor: tokens.ramps.neutral[100],
        }, children: imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: true, accessibilityLabel: name, resizeMode: "cover", style: { width: '100%', height: '100%', opacity: dimmed ? 0.7 : 1 } })) : null }));
    const metaBits = [];
    if (priceLevel)
        metaBits.push('$'.repeat(Math.min(4, Math.max(1, priceLevel))));
    if (cuisine)
        metaBits.push(cuisine);
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs, padding: horizontal ? 0 : tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: openState === 'open' ? 'success' : 'neutral', children: OPEN_LABEL[openState] })] }), metaBits.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: metaBits.join(' · ') })) : null, typeof rating === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Rating_1.Rating, { value: rating, size: "sm", showValue: true }), typeof ratingCount === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["(", ratingCount, ")"] })) : null] })) : null, etaText || feeText ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: [etaText, feeText].filter(Boolean).join(' · ') })) : null] }));
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
            opacity: dimmed ? 0.75 : 1,
        },
        style,
    ];
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [media, body] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}${cuisine ? `, ${cuisine}` : ''}, ${OPEN_LABEL[openState]}`, onPress: onPress, style: ({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : dimmed ? 0.75 : 1 }], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: inner });
}
//# sourceMappingURL=RestaurantCard.js.map