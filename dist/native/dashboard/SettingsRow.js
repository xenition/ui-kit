"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsRow = SettingsRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * A single settings/preferences row: label (+ optional description) on the left,
 * a value and/or trailing control on the right. Shows a chevron and becomes
 * pressable when `onPress` is provided. Token-only.
 */
function SettingsRow({ label, value, description, rightSlot, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.md,
                paddingHorizontal: tokens.spacing.lg,
                minHeight: 48,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base }, children: label }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: description })) : null] }), value ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: value })) : null, rightSlot ?? (onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.lg }, children: "\u203A" })) : null)] }));
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: label, children: inner });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: inner }));
}
//# sourceMappingURL=SettingsRow.js.map