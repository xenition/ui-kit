"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DestinationCardV2 = DestinationCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
function DestinationCardV2({ name, country, tagline, glyph = '🌍', fromCents, currency = 'USD', badge, variant = 'default', appearance = 'classic', onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const wide = variant === 'wide';
    const scrimBase = tokens.ramps.neutral[900] ?? colors.onSurface;
    const overlayText = colors.onPrimary;
    const body = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
                width: wide ? '100%' : 240,
                ...(0, elevation_1.shadow)('md', tokens),
            },
            style,
        ], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                height: wide ? 200 : 260,
                backgroundColor: colors.border,
                alignItems: 'center',
                justifyContent: 'center',
            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { fontSize: 88, color: colors.muted }, children: glyph }), badge ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", children: badge }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        paddingTop: tokens.spacing.xl,
                        backgroundColor: (0, color_1.withAlpha)(scrimBase, 0.3),
                    }, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.md, gap: 2, backgroundColor: (0, color_1.withAlpha)(scrimBase, 0.4) }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: overlayText, fontSize: tokens.typography.scale.xl, fontWeight: '800' }, children: name }), country ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, color_1.withAlpha)(overlayText, 0.85), fontSize: tokens.typography.scale.xs }, children: country })) : null] }), tagline ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: (0, color_1.withAlpha)(overlayText, 0.85), fontSize: tokens.typography.scale.sm }, children: tagline })) : null, typeof fromCents === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs, marginTop: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, color_1.withAlpha)(overlayText, 0.85), fontSize: tokens.typography.scale.xs }, children: "from" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: overlayText, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: (0, primitives_1.formatMoney)(fromCents, currency) })] })) : null] }) })] }) }));
    void appearance;
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}${country ? `, ${country}` : ''}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }) }));
}
//# sourceMappingURL=DestinationCardV2.js.map