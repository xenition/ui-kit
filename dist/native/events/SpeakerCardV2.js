"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeakerCardV2 = SpeakerCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const Rating_1 = require("../primitives/Rating");
const Badge_1 = require("../primitives/Badge");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
function SpeakerCardV2({ name, role, company, avatarUrl, bio, rating, tags = [], onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const press = (0, motion_1.usePressScale)();
    const roleLine = [role, company].filter(Boolean).join('  ·  ');
    const containerStyle = [
        {
            overflow: 'hidden',
            borderRadius: tokens.radius.lg,
            backgroundColor: colors.surface,
            ...(0, elevation_1.shadow)('md', tokens),
        },
        style,
    ];
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 56, backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1) } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', paddingHorizontal: tokens.spacing.lg, paddingBottom: tokens.spacing.lg, gap: tokens.spacing.sm, marginTop: -36 }, children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: avatarUrl, name: name, size: "xl", ring: true }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800', textAlign: 'center' }, children: name }), roleLine ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.sm, fontWeight: '600', textAlign: 'center' }, children: roleLine })) : null, typeof rating === 'number' ? (0, jsx_runtime_1.jsx)(Rating_1.Rating, { value: rating, size: "sm", showValue: true }) : null, bio ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 4, style: { color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }, children: bio })) : null, tags.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs, justifyContent: 'center', marginTop: tokens.spacing.xs }, children: tags.map((t, i) => ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", variant: "soft", size: "sm", children: t }, `${t}-${i}`))) })) : null] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, children: (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [containerStyle, { transform: [{ scale: press.scale }] }], children: content }) }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [containerStyle, { opacity: enter.opacity, transform: enter.transform }], children: content }));
}
//# sourceMappingURL=SpeakerCardV2.js.map