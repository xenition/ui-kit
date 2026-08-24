"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelCardV2 = HotelCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
function HotelCardV2({ name, location, rating, reviewCount, priceCents, currency = 'USD', tags = [], compareAtCents, appearance = 'classic', onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const scrimBase = tokens.ramps.neutral[900] ?? colors.onSurface;
    const overlayText = colors.onPrimary;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                backgroundColor: colors.surface,
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
                ...(0, elevation_1.shadow)('md', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    height: 176,
                    backgroundColor: colors.border,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { fontSize: tokens.typography.scale['3xl'], color: colors.muted }, children: "\uD83C\uDFE8" }), typeof rating === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            position: 'absolute',
                            top: tokens.spacing.sm,
                            right: tokens.spacing.sm,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            backgroundColor: (0, color_1.withAlpha)(scrimBase, 0.55),
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: 4,
                            borderRadius: tokens.radius.full,
                        }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating, size: "sm" }), typeof reviewCount === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: overlayText, fontSize: tokens.typography.scale.xs }, children: ["(", reviewCount, ")"] })) : null] })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            padding: tokens.spacing.md,
                            gap: 2,
                            backgroundColor: (0, color_1.withAlpha)(scrimBase, 0.45),
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: overlayText, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: name }), location ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: (0, color_1.withAlpha)(overlayText, 0.85), fontSize: tokens.typography.scale.xs }, children: location })) : null, typeof priceCents === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs, marginTop: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: overlayText, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: (0, primitives_1.formatMoney)(priceCents, currency) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, color_1.withAlpha)(overlayText, 0.85), fontSize: tokens.typography.scale.xs }, children: "/ night" })] })) : null] })] }), tags.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs, padding: tokens.spacing.md }, children: tags.map((t, i) => ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", children: t }, `${t}-${i}`))) })) : null] }));
    // `appearance` and `compareAtCents` are accepted for prop-parity; V2 commits
    // to its hero treatment and shows the live nightly price over the scrim.
    void appearance;
    void compareAtCents;
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}${location ? `, ${location}` : ''}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }) }));
}
//# sourceMappingURL=HotelCardV2.js.map