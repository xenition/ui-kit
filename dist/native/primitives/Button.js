"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = Button;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const SIZE_TOKENS = {
    sm: { paddingKey: 'sm', textKey: 'sm' },
    md: { paddingKey: 'md', textKey: 'base' },
    lg: { paddingKey: 'lg', textKey: 'lg' },
};
/**
 * Themed button — the native mirror of the web `Button`. Same
 * `variant`/`size`/`disabled` contract; `onPress` replaces the web `onClick`
 * and a `loading` flag renders a spinner. All colors/radii come from the
 * compiled theme tokens via `useXenitionTheme()` — no literal colors.
 */
function Button({ variant = 'primary', size = 'md', onPress, disabled = false, loading = false, style, children, ...rest }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const { paddingKey, textKey } = SIZE_TOKENS[size];
    const isDisabled = disabled || loading;
    const bg = {
        primary: colors.primary,
        secondary: 'transparent',
        ghost: 'transparent',
    };
    const fg = {
        primary: colors.onPrimary,
        secondary: colors.primary,
        ghost: colors.onSurface,
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { disabled: isDisabled, busy: loading }, disabled: isDisabled, onPress: onPress, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: tokens.radius.md,
                paddingVertical: tokens.spacing[paddingKey],
                paddingHorizontal: tokens.spacing[paddingKey] * 1.6,
                backgroundColor: bg[variant],
                borderWidth: variant === 'secondary' ? 1 : 0,
                borderColor: variant === 'secondary' ? colors.primary : 'transparent',
                opacity: isDisabled ? 0.5 : pressed ? 0.85 : 1,
            },
            style,
        ], ...rest, children: [loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginRight: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.ActivityIndicator, { size: "small", color: fg[variant] }) })) : null, typeof children === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: fg[variant],
                    fontSize: tokens.typography.scale[textKey],
                    fontWeight: '600',
                }, children: children })) : (children)] }));
}
//# sourceMappingURL=Button.js.map