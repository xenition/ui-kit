"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionCardV3 = SessionCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const AvatarGroup_1 = require("../primitives/AvatarGroup");
const Icon_1 = require("../primitives/Icon");
const motion_1 = require("../primitives/internal/motion");
function SessionCardV3({ title, time, room, track, speakers = [], capacity, seatsTaken, bookmarked = false, onBookmark, onPress, variant = 'default', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 4 });
    const isHighlight = variant === 'highlight';
    const hasMeter = typeof capacity === 'number' && capacity > 0 && typeof seatsTaken === 'number';
    const isFull = hasMeter && seatsTaken >= capacity;
    const metaLine = [time, room].filter(Boolean).join('  ·  ');
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center' }, children: [isHighlight ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 3, alignSelf: 'stretch', backgroundColor: colors.primary } }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, paddingVertical: tokens.spacing.sm, paddingHorizontal: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 52 }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '800' }, children: time ?? '—' }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), track ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: isHighlight ? 'primary' : 'neutral', size: "sm", children: track }) : null] }), metaLine ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: metaLine })) : null] }), speakers.length > 0 ? (0, jsx_runtime_1.jsx)(AvatarGroup_1.AvatarGroup, { avatars: speakers.map((s) => ({ src: s.avatarUrl, name: s.name })), size: "xs", max: 2 }) : null, hasMeter ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: isFull ? colors.dangerText : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: isFull ? 'Full' : `${seatsTaken}/${capacity}` })) : null, onBookmark ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: bookmarked }, accessibilityLabel: bookmarked ? 'Remove bookmark' : 'Bookmark session', onPress: () => onBookmark(!bookmarked), hitSlop: 8, style: ({ pressed }) => ({ opacity: pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: bookmarked ? '★' : '☆', size: "base", color: bookmarked ? 'accent' : 'muted' }) })) : null] })] }));
    const containerStyle = [
        {
            overflow: 'hidden',
            borderRadius: tokens.radius.md,
            borderWidth: 1,
            borderColor: isHighlight ? colors.primary : colors.border,
            backgroundColor: colors.surface,
        },
        style,
    ];
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [containerStyle, { opacity: enter.opacity, transform: enter.transform }], children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.95 : 1 }), children: content }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [containerStyle, { opacity: enter.opacity, transform: enter.transform }], children: content }));
}
//# sourceMappingURL=SessionCardV3.js.map