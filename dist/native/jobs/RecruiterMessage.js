"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecruiterMessage = RecruiterMessage;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const format_1 = require("./format");
/**
 * An inbox row for a recruiter message: sender avatar, name + company, a
 * one-line preview, sent age, and an unread state. Unread is signalled by BOTH
 * a token dot and bold text (never color alone) and announced in the accessible
 * label. Data + callbacks only; tokens only.
 */
function RecruiterMessage({ message, onPress, onReply, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const sent = (0, format_1.formatRelative)(message.sentAt);
    const unread = !!message.unread;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: onPress ? 'button' : undefined, accessibilityLabel: `${unread ? 'Unread. ' : ''}Message from ${message.senderName}${message.company ? ` at ${message.company}` : ''}`, disabled: !onPress, onPress: onPress ? () => onPress(message) : undefined, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: tokens.spacing.md,
                backgroundColor: colors.surface,
                borderBottomColor: colors.border,
                borderBottomWidth: 1,
                paddingVertical: tokens.spacing.md,
                paddingHorizontal: tokens.spacing.md,
            },
            pressed && onPress ? { opacity: 0.9 } : null,
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: message.senderAvatarUrl, name: message.senderName, size: "md" }), unread ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                            position: 'absolute',
                            top: -2,
                            right: -2,
                            width: 12,
                            height: 12,
                            borderRadius: tokens.radius.full,
                            backgroundColor: colors.primary,
                            borderWidth: 2,
                            borderColor: colors.surface,
                        } })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: {
                                    flex: 1,
                                    color: colors.onSurface,
                                    fontSize: tokens.typography.scale.sm,
                                    fontWeight: unread ? '700' : '600',
                                }, children: [message.senderName, message.company ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontWeight: '400' }, children: `  ·  ${message.company}` })) : null] }), sent ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: sent })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: {
                            color: unread ? colors.onSurface : colors.muted,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: unread ? '500' : '400',
                        }, children: message.preview }), onReply ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Reply to ${message.senderName}`, onPress: () => onReply(message), hitSlop: 6, style: { alignSelf: 'flex-start', marginTop: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "Reply" }) })) : null] })] }));
}
//# sourceMappingURL=RecruiterMessage.js.map