"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionCard = SessionCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const AvatarGroup_1 = require("../primitives/AvatarGroup");
const Icon_1 = require("../primitives/Icon");
/**
 * A rich conference session card: track badge, title, time / room meta, an
 * abstract, a speaker cluster, an optional seat-capacity meter, and a bookmark
 * toggle. `highlight` adds a primary left rail for keynotes. The bookmark state
 * uses a filled/outline glyph plus `accessibilityState`. Colors come from the
 * compiled theme tokens; no literal colors.
 */
function SessionCard({ title, time, room, track, abstract, speakers = [], capacity, seatsTaken, bookmarked = false, onBookmark, onPress, variant = 'default', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const isHighlight = variant === 'highlight';
    const hasMeter = typeof capacity === 'number' && capacity > 0 && typeof seatsTaken === 'number';
    const fillRatio = hasMeter ? Math.max(0, Math.min(1, seatsTaken / capacity)) : 0;
    const isFull = hasMeter && seatsTaken >= capacity;
    const speakerNames = speakers.map((s) => s.name).join(', ');
    const metaLine = [time, room].filter(Boolean).join(' · ');
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row' }, children: [isHighlight ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 4, backgroundColor: colors.primary } }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.sm, padding: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [track ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: isHighlight ? 'primary' : 'neutral', children: track }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: title }), metaLine ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: metaLine })) : null] }), onBookmark ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: bookmarked }, accessibilityLabel: bookmarked ? 'Remove bookmark' : 'Bookmark session', onPress: () => onBookmark(!bookmarked), hitSlop: 8, style: ({ pressed }) => ({ opacity: pressed ? 0.6 : 1, padding: tokens.spacing.xs }), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: bookmarked ? '★' : '☆', size: "lg", color: bookmarked ? 'accent' : 'muted' }) })) : null] }), abstract ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 3, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: abstract })) : null, speakers.length > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(AvatarGroup_1.AvatarGroup, { avatars: speakers.map((s) => ({ src: s.avatarUrl, name: s.name })), size: "sm", max: 3 }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.muted, fontSize: tokens.typography.scale.sm }, children: speakerNames })] })) : null, hasMeter ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.spacing.xs, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[200], overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${Math.round(fillRatio * 100)}%`, height: '100%', backgroundColor: isFull ? colors.danger : colors.primary } }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: isFull ? colors.danger : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: isFull ? 'Session full' : `${seatsTaken} / ${capacity} seats taken` })] })) : null] })] }));
    const containerStyle = [
        {
            overflow: 'hidden',
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: isHighlight ? colors.primary : colors.border,
            backgroundColor: colors.surface,
        },
        style,
    ];
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, style: ({ pressed }) => [containerStyle, { opacity: pressed ? 0.95 : 1 }], children: content }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: content });
}
//# sourceMappingURL=SessionCard.js.map