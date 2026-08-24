"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileSetup = ProfileSetup;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * Profile setup step — an editable avatar plus a token-styled field stack and a
 * save action, with an optional "skip for now" so onboarding never hard-blocks
 * on it (design.md §41). Fully controlled: the host owns `values` and gets
 * `(id, text)` callbacks. Field access is guarded through the `values` map so a
 * missing key renders empty, never crashes. No literal colors.
 */
function ProfileSetup({ name, avatarUri, onEditAvatar, fields = [], values = {}, onChangeField, title = 'Set up your profile', saveLabel = 'Save profile', onSave, loading = false, skipLabel, onSkip, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.lg }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700', textAlign: 'center' }, children: title }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignItems: 'center' }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Change profile photo", onPress: onEditAvatar, style: { alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUri, name: name, size: "lg" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDCF7", size: "sm", color: "primary" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: "Add photo" })] })] }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.md }, children: fields.map((field) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: field.label }), (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { accessibilityLabel: field.label, placeholder: field.placeholder, placeholderTextColor: colors.muted, keyboardType: field.keyboard ?? 'default', value: values[field.id] ?? '', onChangeText: (t) => onChangeField?.(field.id, t), style: {
                                color: colors.onSurface,
                                backgroundColor: colors.surface,
                                borderWidth: 1,
                                borderColor: colors.border,
                                borderRadius: tokens.radius.md,
                                paddingVertical: tokens.spacing.sm,
                                paddingHorizontal: tokens.spacing.md,
                                fontSize: tokens.typography.scale.base,
                            } })] }, field.id))) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "lg", loading: loading, onPress: onSave, accessibilityLabel: saveLabel, style: { alignSelf: 'stretch' }, children: saveLabel }), skipLabel && onSkip ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: skipLabel, onPress: onSkip, style: { alignItems: 'center', paddingVertical: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '500' }, children: skipLabel }) })) : null] })] }));
}
//# sourceMappingURL=ProfileSetup.js.map