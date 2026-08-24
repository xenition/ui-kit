"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantCardV3 = RestaurantCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Rating_1 = require("../primitives/Rating");
const color_1 = require("../primitives/internal/color");
const OPEN_LABEL = {
    open: 'Open',
    closed: 'Closed',
    busy: 'Busy',
};
/**
 * RestaurantCard, alternate design **V3** — a *compact list row*. Borderless
 * and dense: a small rounded thumbnail, then a two-line stack (name with an
 * inline status dot, meta + rating + ETA), meant to be repeated tightly in a
 * search or nearby list. No hero, no card chrome — the inverse of V2's cover.
 * Availability is a coloured dot *and* a word (never colour alone). Same props.
 */
function RestaurantCardV3({ name, cuisine, rating, ratingCount, priceLevel, etaText, feeText, imageUrl, openState = 'open', onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const dimmed = openState !== 'open';
    const dotColor = openState === 'open' ? colors.success : openState === 'busy' ? colors.warnText : colors.muted;
    const metaBits = [];
    if (priceLevel)
        metaBits.push('$'.repeat(Math.min(4, Math.max(1, priceLevel))));
    if (cuisine)
        metaBits.push(cuisine);
    const containerStyle = [
        {
            flexDirection: 'row',
            gap: tokens.spacing.md,
            alignItems: 'center',
            backgroundColor: 'transparent',
            borderBottomWidth: 1,
            borderColor: colors.border,
            paddingVertical: tokens.spacing.sm,
            opacity: dimmed ? 0.75 : 1,
        },
        style,
    ];
    const media = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: 48,
            height: 48,
            borderRadius: tokens.radius.md,
            overflow: 'hidden',
            backgroundColor: tokens.ramps.neutral[100],
        }, children: imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: true, accessibilityLabel: name, resizeMode: "cover", style: { width: '100%', height: '100%', opacity: dimmed ? 0.7 : 1 } })) : null }));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: dotColor } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), typeof rating === 'number' ? (0, jsx_runtime_1.jsx)(Rating_1.Rating, { value: rating, size: "sm", showValue: true }) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.muted, fontSize: tokens.typography.scale.sm }, children: [OPEN_LABEL[openState], ...metaBits, etaText, feeText]
                        .concat(typeof ratingCount === 'number' ? [`(${ratingCount})`] : [])
                        .filter(Boolean)
                        .join(' · ') }) })] }));
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [media, body] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}${cuisine ? `, ${cuisine}` : ''}, ${OPEN_LABEL[openState]}`, onPress: onPress, style: ({ pressed }) => [
                containerStyle,
                { opacity: pressed ? 0.9 : dimmed ? 0.75 : 1, backgroundColor: pressed ? (0, color_1.withAlpha)(colors.primary, 0.04) : 'transparent' },
            ], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: inner });
}
//# sourceMappingURL=RestaurantCardV3.js.map