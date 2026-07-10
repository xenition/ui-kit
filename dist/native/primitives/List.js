"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = List;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Vertical list of leading/title/description/trailing rows — the native mirror
 * of the web `List` (`onClick`→`onPress`). Token-bound surface, border and
 * divider. No literal colors.
 */
function List({ items, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.md,
                overflow: 'hidden',
            },
            style,
        ], children: items.map((it, i) => {
            const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [it.leading != null ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: it.leading }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [typeof it.title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '500' }, children: it.title })) : (it.title), it.description != null ? (typeof it.description === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: it.description })) : (it.description)) : null] }), it.trailing != null ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: it.trailing }) : null] }));
            const rowStyle = {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                backgroundColor: colors.surface,
                paddingHorizontal: tokens.spacing.lg,
                paddingVertical: tokens.spacing.md,
                borderTopWidth: i === 0 ? 0 : 1,
                borderColor: colors.border,
            };
            return it.onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", onPress: it.onPress, style: rowStyle, children: inner }, i)) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: rowStyle, children: inner }, i));
        }) }));
}
//# sourceMappingURL=List.js.map