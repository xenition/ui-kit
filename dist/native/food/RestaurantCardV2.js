"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantCardV2 = RestaurantCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const OPEN_LABEL = {
    open: 'Open',
    closed: 'Closed',
    busy: 'Busy',
};
/**
 * RestaurantCard, alternate design **V2** — a *cover-hero* card. A tall
 * full-bleed cover photo carries two overlaid chips: the open-state badge top-
 * left and a frosted rating badge top-right. The name and details sit on a
 * solid surface footer beneath the image (never over it), so contrast is safe
 * in both schemes while the card still reads as a big, tappable hero — the
 * opposite of the compact classic row. Same props as the classic.
 */
function RestaurantCardV2({ name, cuisine, rating, ratingCount, priceLevel, etaText, feeText, imageUrl, openState = 'open', onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const dimmed = openState !== 'open';
    const metaBits = [];
    if (priceLevel)
        metaBits.push('$'.repeat(Math.min(4, Math.max(1, priceLevel))));
    if (cuisine)
        metaBits.push(cuisine);
    const containerStyle = [
        {
            overflow: 'hidden',
            borderRadius: tokens.radius.lg,
            backgroundColor: colors.surface,
            opacity: dimmed ? 0.8 : 1,
            ...(0, elevation_1.shadow)('md', tokens),
        },
        style,
    ];
    const hero = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: '100%', height: 176, backgroundColor: tokens.ramps.neutral[100] }, children: [imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: true, accessibilityLabel: name, resizeMode: "cover", style: { width: '100%', height: '100%', opacity: dimmed ? 0.7 : 1 } })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: openState === 'open' ? 'success' : 'neutral', children: OPEN_LABEL[openState] }) }), typeof rating === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    position: 'absolute',
                    top: tokens.spacing.sm,
                    right: tokens.spacing.sm,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 2,
                    paddingHorizontal: tokens.spacing.sm,
                    paddingVertical: tokens.spacing.xs,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, color_1.withAlpha)(colors.surface, 0.92),
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.warnText, fontSize: tokens.typography.scale.sm }, children: "\u2605" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: rating.toFixed(1) }), typeof ratingCount === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["(", ratingCount, ")"] })) : null] })) : null] }));
    const footer = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs, padding: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: name }), metaBits.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: metaBits.join(' · ') })) : null, etaText || feeText ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: [etaText, feeText].filter(Boolean).join(' · ') })) : null] }));
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [hero, footer] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}${cuisine ? `, ${cuisine}` : ''}, ${OPEN_LABEL[openState]}`, onPress: onPress, style: ({ pressed }) => [containerStyle, { opacity: pressed ? 0.92 : dimmed ? 0.8 : 1 }], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: inner });
}
//# sourceMappingURL=RestaurantCardV2.js.map