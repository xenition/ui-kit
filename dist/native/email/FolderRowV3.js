"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderRowV3 = FolderRowV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * FolderRow — design V3. A **compact, indented list line** for a deep folder
 * tree: a small leading glyph, the name, and a plain right-aligned count — no
 * pill, no fill, tight vertical rhythm. The `selected` state adds a leading
 * accent rail + bold primary label and reports `selected` to a11y (never
 * color-alone). Indents by `depth`. Same props as `FolderRow`. No literal colors.
 */
function FolderRowV3({ name, glyph, count = 0, selected = false, depth = 0, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const indent = Math.max(0, depth) * tokens.spacing.md;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}${count > 0 ? `, ${count} unread` : ''}`, accessibilityState: { selected }, onPress: onPress, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.xs,
                paddingRight: tokens.spacing.md,
                paddingLeft: tokens.spacing.sm + indent,
                backgroundColor: selected ? colors.border : pressed ? colors.border : 'transparent',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no", style: {
                    width: 3,
                    alignSelf: 'stretch',
                    borderRadius: tokens.radius.full,
                    backgroundColor: selected ? colors.primary : 'transparent',
                } }), glyph ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "sm", color: selected ? 'primary' : 'muted' }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                    flex: 1,
                    color: selected ? colors.primaryText : colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: selected ? '700' : '500',
                }, children: name }), count > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: selected ? colors.primaryText : colors.muted,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '700',
                }, children: count > 999 ? '999+' : String(count) })) : null] }));
}
//# sourceMappingURL=FolderRowV3.js.map