"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventCardV2 = EventCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
function EventCardV2({ title, date, time, location, imageUrl, imageAlt, category, attendeeCount, variant = 'default', onPress, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const press = (0, motion_1.usePressScale)();
    const coverHeight = variant === 'featured' ? 260 : variant === 'compact' ? 160 : 200;
    const containerStyle = [
        {
            overflow: 'hidden',
            borderRadius: tokens.radius.lg,
            backgroundColor: colors.surface,
            ...(0, elevation_1.shadow)('lg', tokens),
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading event", style: containerStyle, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: coverHeight, backgroundColor: tokens.ramps.neutral[200] } }) }));
    }
    const metaParts = [time, location].filter(Boolean).join('  ·  ');
    const hero = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { height: coverHeight, width: '100%', backgroundColor: tokens.ramps.neutral[100] }, children: [imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: true, accessibilityLabel: imageAlt ?? title, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF9F\uFE0F", size: "2xl" }) })), (0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '38%', backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.28) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '24%', backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.4) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '12%', backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.55) } }), date ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    top: tokens.spacing.md,
                    left: tokens.spacing.md,
                    backgroundColor: colors.surface,
                    borderRadius: tokens.radius.md,
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.sm,
                    ...(0, elevation_1.shadow)('sm', tokens),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: date }) })) : null, category ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: tokens.spacing.md, right: tokens.spacing.md }, children: (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", children: category }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: tokens.spacing.lg, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: {
                            color: colors.surface,
                            fontSize: variant === 'featured' ? tokens.typography.scale['2xl'] : tokens.typography.scale.xl,
                            fontWeight: '800',
                        }, children: title }), metaParts ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: (0, color_1.withAlpha)(colors.surface, 0.88), fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: metaParts })) : null, typeof attendeeCount === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDC65", size: "sm" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, color_1.withAlpha)(colors.surface, 0.88), fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: `${attendeeCount} going` })] })) : null] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, children: (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [containerStyle, { transform: [{ scale: press.scale }] }], children: hero }) }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [containerStyle, { opacity: enter.opacity, transform: enter.transform }], children: hero }));
}
//# sourceMappingURL=EventCardV2.js.map