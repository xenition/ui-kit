"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Field = Field;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Label_1 = require("./Label");
/**
 * A labelled form row — the native mirror of the web `Field`: Label + control
 * (`children`) + hint/error. Removes the hand-rolled label+error markup mobile
 * forms repeat for every field. No literal colors.
 */
function Field({ label, required = false, error, hint, style, children, ...rest }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.xs }, style], ...rest, children: [label != null ? (0, jsx_runtime_1.jsx)(Label_1.Label, { required: required, children: label }) : null, children, error ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "alert", style: { color: colors.dangerText, fontSize: tokens.typography.scale.sm }, children: error })) : hint ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: hint })) : null] }));
}
//# sourceMappingURL=Field.js.map