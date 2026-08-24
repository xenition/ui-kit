"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchHeader = SearchHeader;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * A search bar header: a token-bound search field with a leading glyph, an
 * optional clear button, and a trailing action slot. Token-only.
 */
function SearchHeader({ value, onChangeText, placeholder = 'Search', onSubmit, actions, clearable = true, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: tokens.radius.full,
                    paddingHorizontal: tokens.spacing.md,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: "\u2315" }), (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { accessibilityLabel: placeholder, value: value, onChangeText: onChangeText, onSubmitEditing: onSubmit, placeholder: placeholder, placeholderTextColor: colors.muted, returnKeyType: "search", style: {
                            flex: 1,
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            paddingVertical: tokens.spacing.sm,
                        } }), clearable && value.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Clear search", onPress: () => onChangeText(''), hitSlop: 8, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: "\u2715" }) })) : null] }), actions ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: actions }) : null] }));
}
//# sourceMappingURL=SearchHeader.js.map