"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListRow = ListRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * A generic list row: leading avatar/slot, title + meta, and a trailing action
 * slot. The workhorse row for lists of people, files, items, etc. Pressable
 * when `onPress` is provided. Token-only.
 */
function ListRow({ title, meta, avatarUrl, showAvatar = true, leading, action, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                minHeight: 56,
            },
            style,
        ], children: [leading ?? (showAvatar ? (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: title, size: "md" }) : null), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            fontWeight: '600',
                        }, children: title }), meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: meta })) : null] }), action ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: action }) : null] }));
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: title, children: inner });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: inner }));
}
//# sourceMappingURL=ListRow.js.map