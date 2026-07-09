"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = Input;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Themed text input — the native mirror of the web `Input`. Token-bound
 * background/border/text; `invalid` swaps the border to the danger token. No
 * literal colors; placeholder uses the `muted` token.
 */
function Input({ invalid = false, label, containerStyle, style, editable = true, ...rest }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.xs }, containerStyle], children: [label ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: label })) : null, (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { editable: editable, accessibilityState: { disabled: !editable }, placeholderTextColor: colors.muted, style: [
                    {
                        width: '100%',
                        color: colors.onSurface,
                        backgroundColor: colors.surface,
                        borderWidth: 1,
                        borderColor: invalid ? colors.danger : colors.border,
                        borderRadius: tokens.radius.sm,
                        paddingVertical: tokens.spacing.sm,
                        paddingHorizontal: tokens.spacing.md,
                        fontSize: tokens.typography.scale.base,
                        opacity: editable ? 1 : 0.5,
                    },
                    style,
                ], ...rest })] }));
}
//# sourceMappingURL=Input.js.map