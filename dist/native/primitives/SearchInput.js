"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchInput = SearchInput;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Search field — a token-bound `TextInput` with a leading search glyph and a
 * trailing clear (✕) button that appears once there is text. Colors, border,
 * radius, and spacing all come from `useXenitionTheme()`; `invalid` swaps the
 * border to the `danger` token and the placeholder uses `muted`. No literal
 * colors.
 */
function SearchInput({ value = '', onChangeText, onClear, placeholder = 'Search…', invalid = false, disabled = false, accessibilityLabel = 'Search', containerStyle, ...rest }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const clear = () => {
        onChangeText?.('');
        onClear?.();
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: invalid ? colors.danger : colors.border,
                borderRadius: tokens.radius.full,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                opacity: disabled ? 0.5 : 1,
            },
            containerStyle,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityElementsHidden: true, importantForAccessibility: "no", style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: "\u2315" }), (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { editable: !disabled, accessibilityLabel: accessibilityLabel, accessibilityState: { disabled }, value: value, onChangeText: onChangeText, placeholder: placeholder, placeholderTextColor: colors.muted, returnKeyType: "search", style: {
                    flex: 1,
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.base,
                    padding: 0,
                }, ...rest }), value.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Clear search", disabled: disabled, onPress: clear, hitSlop: 8, style: ({ pressed }) => ({ opacity: pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: "\u2715" }) })) : null] }));
}
//# sourceMappingURL=SearchInput.js.map