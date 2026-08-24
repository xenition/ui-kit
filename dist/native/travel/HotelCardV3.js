"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelCardV3 = HotelCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const appearance_1 = require("../primitives/internal/appearance");
const motion_1 = require("../primitives/internal/motion");
function HotelCardV3({ name, location, rating, reviewCount, priceCents, currency = 'USD', tags = [], compareAtCents, appearance = 'classic', onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            (0, appearance_1.appearanceStyle)(appearance, colors, tokens),
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                    width: 96,
                    height: 96,
                    borderRadius: tokens.radius.md,
                    backgroundColor: colors.border,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale['2xl'], color: colors.muted }, children: "\uD83C\uDFE8" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 4, alignSelf: 'stretch', justifyContent: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), location ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: location })) : null, typeof rating === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating, size: "sm" }), typeof reviewCount === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["(", reviewCount, ")"] })) : null] })) : null, tags.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: tags.slice(0, 2).map((t, i) => ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", children: t }, `${t}-${i}`))) })) : null] }), typeof priceCents === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', justifyContent: 'center', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(primitives_1.PriceTag, { cents: priceCents, currency: currency, compareAtCents: compareAtCents, size: "md" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "/ night" })] })) : null] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}${location ? `, ${location}` : ''}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }) }));
}
//# sourceMappingURL=HotelCardV3.js.map