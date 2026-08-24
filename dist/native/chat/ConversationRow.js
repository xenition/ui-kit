"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationRow = ConversationRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const appearance_1 = require("../primitives/internal/appearance");
const motion_1 = require("../primitives/internal/motion");
const PresenceDot_1 = require("./PresenceDot");
const TypingIndicator_1 = require("./TypingIndicator");
/**
 * A single row in a conversation/inbox list — avatar with presence, name,
 * message preview, timestamp, and unread badge. Supports `unread` (bold +
 * count badge), `muted` (dimmed + mute glyph), and `typing` (live indicator
 * replaces the preview) states. No literal colors.
 */
function ConversationRow({ name, lastMessage, timestamp, avatarUri, presence, unreadCount = 0, muted = false, typing = false, selected = false, onPress, onLongPress, appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const unread = unreadCount > 0;
    const press = (0, motion_1.usePressScale)();
    const enter = (0, motion_1.useEnter)();
    const a11yLabel = [
        name,
        typing ? 'typing' : lastMessage,
        unread ? `${unreadCount} unread` : undefined,
        muted ? 'muted' : undefined,
    ]
        .filter(Boolean)
        .join(', ');
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11yLabel, accessibilityState: { selected }, onPress: onPress, onLongPress: onLongPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => [
                // Appearance FIRST (fill/border/elevation); classic stays borderless as before.
                appearance === 'classic' ? null : (0, appearance_1.appearanceStyle)(appearance, colors, tokens),
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.md,
                    paddingVertical: tokens.spacing.sm,
                    backgroundColor: selected || pressed
                        ? colors.border
                        : appearance === 'classic'
                            ? colors.surface
                            : undefined,
                    opacity: muted && !unread ? 0.7 : 1,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "lg", src: avatarUri, name: name }), presence ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', bottom: 0, right: 0 }, children: (0, jsx_runtime_1.jsx)(PresenceDot_1.PresenceDot, { status: presence }) })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                        flex: 1,
                                        color: colors.onSurface,
                                        fontSize: tokens.typography.scale.base,
                                        fontWeight: unread ? '700' : '500',
                                    }, children: name }), muted ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDD07", size: "sm", color: "muted", accessibilityLabel: "Muted" }) : null, timestamp ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: unread ? colors.primaryText : colors.muted,
                                        fontSize: tokens.typography.scale.xs,
                                        fontWeight: unread ? '600' : '400',
                                    }, children: timestamp })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [typing ? ((0, jsx_runtime_1.jsx)(TypingIndicator_1.TypingIndicator, { name: "typing\u2026", bubble: false })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                        flex: 1,
                                        color: unread ? colors.onSurface : colors.muted,
                                        fontSize: tokens.typography.scale.sm,
                                        fontWeight: unread ? '500' : '400',
                                    }, children: lastMessage ?? '' })), unread ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", children: unreadCount > 99 ? '99+' : String(unreadCount) })) : null] })] })] }) }));
}
//# sourceMappingURL=ConversationRow.js.map