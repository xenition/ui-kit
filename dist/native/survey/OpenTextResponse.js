"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenTextResponse = OpenTextResponse;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * A free-text answer field — wraps the token `Textarea` primitive and adds a
 * survey-friendly live character counter (when `maxLength` is set) that turns to
 * the danger tone as the limit is reached, plus an optional error line. Fully
 * controlled (`value`/`onChange`). No literal colors.
 */
function OpenTextResponse({ value, onChange, placeholder, label, rows = 4, maxLength, error, disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const atLimit = maxLength != null && value.length >= maxLength;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsx)(primitives_1.Textarea, { value: value, onChangeText: onChange, placeholder: placeholder, label: label, rows: rows, maxLength: maxLength, editable: !disabled, invalid: error != null, accessibilityLabel: label ?? placeholder ?? 'Your answer' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, children: [error ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "text", style: { color: colors.danger, fontSize: tokens.typography.scale.sm, fontWeight: '600', flex: 1 }, children: error })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } })), maxLength != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: {
                            color: atLimit ? colors.danger : colors.muted,
                            fontSize: tokens.typography.scale.xs,
                            fontWeight: atLimit ? '700' : '400',
                        }, children: [value.length, " / ", maxLength] })) : null] })] }));
}
//# sourceMappingURL=OpenTextResponse.js.map