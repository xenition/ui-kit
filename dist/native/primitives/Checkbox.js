"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkbox = Checkbox;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Themed checkbox — the native mirror of the web `Checkbox`. A `Pressable` box
 * that fills with the primary token and shows a check when `checked`. Exposes
 * the `checked` / `onCheckedChange` contract (RN has no DOM input). No literal
 * colors.
 */
function Checkbox({ checked = false, onCheckedChange, invalid = false, disabled = false, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked, disabled }, accessibilityLabel: accessibilityLabel, disabled: disabled, onPress: () => onCheckedChange?.(!checked), style: ({ pressed }) => [
            {
                width: 20,
                height: 20,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: tokens.radius.sm,
                borderWidth: 1,
                borderColor: invalid ? colors.danger : checked ? colors.primary : colors.border,
                backgroundColor: checked ? colors.primary : colors.surface,
                opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
            },
            style,
        ], children: checked ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onPrimary, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "\u2713" })) : null }));
}
//# sourceMappingURL=Checkbox.js.map