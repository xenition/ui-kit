"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Textarea = Textarea;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Themed multi-line text input — the native mirror of the web `Textarea`.
 * `multiline` TextInput, token-bound background/border/text; `invalid` swaps the
 * border to the danger token. No literal colors; placeholder uses the `muted`
 * token.
 */
function Textarea({ invalid = false, label, rows = 4, containerStyle, style, editable = true, ...rest }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const lineHeight = Math.round(tokens.typography.scale.base * 1.4);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.xs }, containerStyle], children: [label ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: label })) : null, (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { multiline: true, textAlignVertical: "top", editable: editable, accessibilityState: { disabled: !editable }, placeholderTextColor: colors.muted, style: [
                    {
                        width: '100%',
                        minHeight: rows * lineHeight + tokens.spacing.sm * 2,
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
//# sourceMappingURL=Textarea.js.map