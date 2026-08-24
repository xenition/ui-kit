"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickReplies = QuickReplies;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Horizontal strip of suggested-reply chips (smart replies / canned responses).
 * Scrolls horizontally when the suggestions overflow. Each chip is a button.
 * Renders nothing when `replies` is empty. No literal colors.
 */
function QuickReplies({ replies, onSelect, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (replies.length === 0)
        return null;
    return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, accessibilityLabel: "Suggested replies", keyboardShouldPersistTaps: "handled", contentContainerStyle: { gap: tokens.spacing.sm, paddingHorizontal: tokens.spacing.md }, style: style, children: replies.map((reply) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: reply.label, onPress: () => onSelect?.(reply.id), style: ({ pressed }) => ({
                borderRadius: tokens.radius.full,
                borderWidth: 1,
                borderColor: colors.primary,
                backgroundColor: colors.surface,
                paddingVertical: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.md,
                opacity: pressed ? 0.7 : 1,
            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '500' }, children: reply.label }) }, reply.id))) }));
}
//# sourceMappingURL=QuickReplies.js.map