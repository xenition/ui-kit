"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationItem = NotificationItem;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * A single notification row: title, optional body, timestamp, and an unread
 * indicator. Pressable when `onPress` is supplied. Token-only.
 */
function NotificationItem({ title, body, time, unread = false, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                borderRadius: tokens.radius.md,
                backgroundColor: unread ? colors.muted : colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 8,
                    height: 8,
                    borderRadius: tokens.radius.full,
                    marginTop: 6,
                    backgroundColor: unread ? colors.primary : 'transparent',
                } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            fontWeight: unread ? '700' : '500',
                        }, children: title }), body ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: body })) : null] }), time ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: time })) : null] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `${title}${unread ? ', unread' : ''}`, children: content }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${title}${unread ? ', unread' : ''}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: content }));
}
//# sourceMappingURL=NotificationItem.js.map