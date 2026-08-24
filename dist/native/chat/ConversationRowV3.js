"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationRowV3 = ConversationRowV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const appearance_1 = require("../primitives/internal/appearance");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
const PresenceDot_1 = require("./PresenceDot");
const TypingIndicator_1 = require("./TypingIndicator");
/**
 * ConversationRow — **dense minimal** variant. A single tight line: a tiny `xs`
 * avatar, the name and message preview flowing inline (name bold, preview
 * muted), an unread state shown as a small leading dot, and the timestamp
 * pinned far-right. Built for high-density inboxes (many rows on screen) — the
 * opposite of the spacious v2 card. Same props as `ConversationRow`. No literal
 * colors.
 */
function ConversationRowV3({ name, lastMessage, timestamp, avatarUri, presence, unreadCount = 0, muted = false, typing = false, selected = false, onPress, onLongPress, appearance = 'classic', style, }) {
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
                appearance === 'classic' ? null : (0, appearance_1.appearanceStyle)(appearance, colors, tokens),
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                    paddingVertical: tokens.spacing.xs,
                    borderBottomWidth: 1,
                    borderBottomColor: (0, color_1.withAlpha)(colors.border, 0.6),
                    backgroundColor: selected || pressed
                        ? (0, color_1.withAlpha)(colors.primary, 0.08)
                        : appearance === 'classic'
                            ? colors.surface
                            : undefined,
                    opacity: muted && !unread ? 0.6 : 1,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: unread ? colors.primary : 'transparent',
                    } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "xs", src: avatarUri, name: name }), presence ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', bottom: -2, right: -2 }, children: (0, jsx_runtime_1.jsx)(PresenceDot_1.PresenceDot, { status: presence, size: 7 }) })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                        color: colors.onSurface,
                        fontSize: tokens.typography.scale.sm,
                        fontWeight: unread ? '700' : '600',
                        flexShrink: 0,
                        maxWidth: '45%',
                    }, children: name }), typing ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(TypingIndicator_1.TypingIndicator, { name: "typing\u2026", bubble: false }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                        flex: 1,
                        color: unread ? colors.onSurface : colors.muted,
                        fontSize: tokens.typography.scale.sm,
                        fontWeight: unread ? '500' : '400',
                    }, children: lastMessage ?? '' })), muted ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDD07", size: "sm", color: "muted", accessibilityLabel: "Muted" }) : null, timestamp ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: unread ? colors.primaryText : colors.muted,
                        fontSize: tokens.typography.scale.xs,
                        fontWeight: unread ? '600' : '400',
                    }, children: timestamp })) : null] }) }));
}
//# sourceMappingURL=ConversationRowV3.js.map