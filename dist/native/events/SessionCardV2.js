"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionCardV2 = SessionCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const AvatarGroup_1 = require("../primitives/AvatarGroup");
const Icon_1 = require("../primitives/Icon");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
function SessionCardV2({ title, time, room, track, abstract, speakers = [], capacity, seatsTaken, bookmarked = false, onBookmark, onPress, variant = 'default', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const isHighlight = variant === 'highlight';
    const hasMeter = typeof capacity === 'number' && capacity > 0 && typeof seatsTaken === 'number';
    const fillRatio = hasMeter ? Math.max(0, Math.min(1, seatsTaken / capacity)) : 0;
    const isFull = hasMeter && seatsTaken >= capacity;
    const speakerNames = speakers.map((s) => s.name).join(', ');
    const nodeColor = isHighlight ? colors.primary : colors.border;
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: 64, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '800', textAlign: 'center' }, children: time ?? '—' }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 14,
                            height: 14,
                            borderRadius: tokens.radius.full,
                            marginTop: tokens.spacing.sm,
                            backgroundColor: isHighlight ? colors.primary : colors.surface,
                            borderWidth: 2,
                            borderColor: nodeColor,
                        } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, width: 2, marginTop: tokens.spacing.xs, backgroundColor: colors.border } })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flex: 1,
                    gap: tokens.spacing.sm,
                    padding: tokens.spacing.md,
                    borderRadius: tokens.radius.md,
                    backgroundColor: isHighlight ? (0, color_1.withAlpha)(colors.primary, 0.06) : colors.surface,
                    ...(0, elevation_1.shadow)('sm', tokens),
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [track ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: isHighlight ? 'primary' : 'neutral', children: track }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: title }), room ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: room }) : null] }), onBookmark ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: bookmarked }, accessibilityLabel: bookmarked ? 'Remove bookmark' : 'Bookmark session', onPress: () => onBookmark(!bookmarked), hitSlop: 8, style: ({ pressed }) => ({ opacity: pressed ? 0.6 : 1, padding: tokens.spacing.xs }), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: bookmarked ? '★' : '☆', size: "lg", color: bookmarked ? 'accent' : 'muted' }) })) : null] }), abstract ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 3, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: abstract })) : null, speakers.length > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(AvatarGroup_1.AvatarGroup, { avatars: speakers.map((s) => ({ src: s.avatarUrl, name: s.name })), size: "sm", max: 3 }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.muted, fontSize: tokens.typography.scale.sm }, children: speakerNames })] })) : null, hasMeter ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.spacing.xs, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[200], overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${Math.round(fillRatio * 100)}%`, height: '100%', backgroundColor: isFull ? colors.danger : colors.primary } }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: isFull ? colors.dangerText : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: isFull ? 'Session full' : `${seatsTaken} / ${capacity} seats taken` })] })) : null] })] }));
    const containerStyle = [{ backgroundColor: 'transparent' }, style];
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [containerStyle, { opacity: enter.opacity, transform: enter.transform }], children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.95 : 1 }), children: content }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [containerStyle, { opacity: enter.opacity, transform: enter.transform }], children: content }));
}
//# sourceMappingURL=SessionCardV2.js.map