"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventCardV3 = EventCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
function EventCardV3({ title, date, time, location, imageUrl, imageAlt, category, attendeeCount, variant = 'default', onPress, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 4 });
    const press = (0, motion_1.usePressScale)();
    const media = variant === 'featured' ? 112 : 92;
    const containerStyle = [
        {
            overflow: 'hidden',
            flexDirection: 'row',
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading event", style: containerStyle, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: media, height: media, backgroundColor: tokens.ramps.neutral[200] } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, padding: tokens.spacing.md, gap: tokens.spacing.sm, justifyContent: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.spacing.lg, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.spacing.md, width: '45%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } })] })] }));
    }
    const metaLine = [time, location].filter(Boolean).join('  ·  ');
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: media, height: media, backgroundColor: tokens.ramps.neutral[100] }, children: [imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: true, accessibilityLabel: imageAlt ?? title, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF9F\uFE0F", size: "lg" }) })), date ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            bottom: tokens.spacing.xs,
                            left: tokens.spacing.xs,
                            right: tokens.spacing.xs,
                            alignItems: 'center',
                            backgroundColor: colors.surface,
                            borderRadius: tokens.radius.sm,
                            paddingVertical: 1,
                            ...(0, elevation_1.shadow)('sm', tokens),
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '800', letterSpacing: 0.5 }, children: date }) })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, padding: tokens.spacing.md, gap: tokens.spacing.xs, justifyContent: 'center' }, children: [category ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", size: "sm", children: category }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), metaLine ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: metaLine })) : null, typeof attendeeCount === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDC65", size: "sm", color: "muted" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `${attendeeCount} going` })] })) : null] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, children: (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [containerStyle, { transform: [{ scale: press.scale }] }], children: inner }) }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [containerStyle, { opacity: enter.opacity, transform: enter.transform }], children: inner }));
}
//# sourceMappingURL=EventCardV3.js.map