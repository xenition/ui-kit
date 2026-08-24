"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberInput = NumberInput;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Number input with −/+ steppers — the native mirror of the web `NumberInput`.
 * A numeric `TextInput` flanked by token-bound `Pressable` steppers; clamps to
 * `[min, max]`. No literal colors.
 */
function NumberInput({ value, onValueChange, min, max, step = 1, disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const clamp = (v) => Math.max(min ?? -Infinity, Math.min(max ?? Infinity, v));
    const set = (v) => {
        if (!Number.isNaN(v))
            onValueChange?.(clamp(v));
    };
    const atMin = min != null && value <= min;
    const atMax = max != null && value >= max;
    const renderStepper = (label, accessibilityLabel, onPress, off) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: accessibilityLabel, accessibilityState: { disabled: disabled || off }, disabled: disabled || off, onPress: onPress, style: ({ pressed }) => ({
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: pressed ? colors.border : 'transparent',
            opacity: disabled || off ? 0.4 : 1,
        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg }, children: label }) }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-start',
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.sm,
                backgroundColor: colors.surface,
                overflow: 'hidden',
                opacity: disabled ? 0.5 : 1,
            },
            style,
        ], children: [renderStepper('−', 'Decrease', () => set(value - step), atMin), (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { keyboardType: "numeric", editable: !disabled, accessibilityState: { disabled }, value: String(value), onChangeText: (t) => {
                    if (t.trim() === '')
                        return;
                    set(Number(t));
                }, style: {
                    minWidth: 48,
                    textAlign: 'center',
                    color: colors.onSurface,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                    fontSize: tokens.typography.scale.base,
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderColor: colors.border,
                } }), renderStepper('+', 'Increase', () => set(value + step), atMax)] }));
}
//# sourceMappingURL=NumberInput.js.map