"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderRow = FolderRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const tint_1 = require("./tint");
/**
 * A navigation row for a mailbox / folder in the mail sidebar — leading glyph,
 * name, and an optional unread count. The `selected` state tints the row with a
 * token-derived primary wash and colors the label with the primary slot; the
 * accessibility state also reports `selected` so it isn't signalled by color
 * alone. Indents by `depth` for nested folders. No literal colors.
 */
function FolderRow({ name, glyph, count = 0, selected = false, depth = 0, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const indent = Math.max(0, depth) * tokens.spacing.lg;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}${count > 0 ? `, ${count} unread` : ''}`, accessibilityState: { selected }, onPress: onPress, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                paddingRight: tokens.spacing.md,
                paddingLeft: tokens.spacing.md + indent,
                borderRadius: tokens.radius.md,
                backgroundColor: selected
                    ? (0, tint_1.withAlpha)(colors.primary, 0.14)
                    : pressed
                        ? colors.border
                        : 'transparent',
            },
            style,
        ], children: [glyph ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "base", color: selected ? 'primary' : 'muted' }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                    flex: 1,
                    color: selected ? colors.primary : colors.onSurface,
                    fontSize: tokens.typography.scale.base,
                    fontWeight: selected ? '700' : '500',
                }, children: name }), count > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    minWidth: 22,
                    paddingHorizontal: tokens.spacing.xs,
                    paddingVertical: 1,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    backgroundColor: selected ? colors.primary : (0, tint_1.withAlpha)(colors.onSurface, 0.1),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: selected ? colors.onPrimary : colors.muted,
                        fontSize: tokens.typography.scale.xs,
                        fontWeight: '700',
                    }, children: count > 999 ? '999+' : String(count) }) })) : null] }));
}
//# sourceMappingURL=FolderRow.js.map