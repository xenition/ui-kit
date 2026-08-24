"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneInput = PhoneInput;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/** Strip to digits, cap at 10, format as `(NNN) NNN-NNNN` progressively. */
function formatUsPhone(digits) {
    const d = digits.replace(/\D/g, '').slice(0, 10);
    if (d.length === 0)
        return '';
    if (d.length <= 3)
        return `(${d}`;
    if (d.length <= 6)
        return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}
/**
 * Phone field — a token-bound `TextInput` that displays a progressive
 * `(NNN) NNN-NNNN` mask while reporting only the raw digits through
 * `onChangeText`, with a leading country-code badge. Border flips to `danger`
 * when `invalid`; uses the `phone-pad` keyboard. No literal colors.
 */
function PhoneInput({ value = '', onChangeText, countryCode = '+1', placeholder = '(555) 123-4567', invalid = false, disabled = false, accessibilityLabel = 'Phone number', containerStyle, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const handle = (text) => {
        onChangeText?.(text.replace(/\D/g, '').slice(0, 10));
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: invalid ? colors.danger : colors.border,
                borderRadius: tokens.radius.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                opacity: disabled ? 0.5 : 1,
            },
            containerStyle,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    paddingRight: tokens.spacing.sm,
                    borderRightWidth: 1,
                    borderRightColor: colors.border,
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: countryCode }) }), (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { editable: !disabled, accessibilityLabel: accessibilityLabel, accessibilityState: { disabled }, value: formatUsPhone(value), onChangeText: handle, placeholder: placeholder, placeholderTextColor: colors.muted, keyboardType: "phone-pad", textContentType: "telephoneNumber", style: {
                    flex: 1,
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.base,
                    padding: 0,
                } })] }));
}
//# sourceMappingURL=PhoneInput.js.map