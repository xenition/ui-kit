"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeakerCardV3 = SpeakerCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const Rating_1 = require("../primitives/Rating");
const Badge_1 = require("../primitives/Badge");
const motion_1 = require("../primitives/internal/motion");
function SpeakerCardV3({ name, role, company, avatarUrl, rating, tags = [], onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 4 });
    const press = (0, motion_1.usePressScale)();
    const roleLine = [role, company].filter(Boolean).join('  ·  ');
    const shownTags = tags.slice(0, 2);
    const containerStyle = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
            backgroundColor: colors.surface,
        },
        style,
    ];
    const content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: avatarUrl, name: name, size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), roleLine ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: roleLine })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [typeof rating === 'number' ? (0, jsx_runtime_1.jsx)(Rating_1.Rating, { value: rating, size: "sm" }) : null, shownTags.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs }, children: shownTags.map((t, i) => ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "neutral", size: "sm", children: t }, `${t}-${i}`))) })) : null] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => [containerStyle, { opacity: pressed ? 0.85 : 1 }], children: (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, flex: 1, transform: [{ scale: press.scale }] }, children: content }) }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [containerStyle, { opacity: enter.opacity, transform: enter.transform }], children: content }));
}
//# sourceMappingURL=SpeakerCardV3.js.map