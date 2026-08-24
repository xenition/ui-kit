"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DestinationCardV3 = DestinationCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const appearance_1 = require("../primitives/internal/appearance");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
function DestinationCardV3({ name, country, tagline, glyph = '🌍', fromCents, currency = 'USD', badge, variant = 'default', appearance = 'classic', onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const wide = variant === 'wide';
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            (0, appearance_1.appearanceStyle)(appearance, colors, tokens),
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.sm,
                width: wide ? '100%' : 240,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                    width: 56,
                    height: 56,
                    borderRadius: tokens.radius.md,
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale['2xl'], color: colors.muted }, children: glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), badge ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", children: badge }) : null] }), country ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: country })) : null, tagline ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: tagline })) : null] }), typeof fromCents === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "from" }), (0, jsx_runtime_1.jsx)(primitives_1.PriceTag, { cents: fromCents, currency: currency, size: "sm" })] })) : null] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}${country ? `, ${country}` : ''}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }) }));
}
//# sourceMappingURL=DestinationCardV3.js.map