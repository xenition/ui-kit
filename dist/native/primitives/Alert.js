"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alert = Alert;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Inline, optionally dismissible alert — the native mirror of the web `Alert`.
 * A token-bound surface with a colored left rule keyed to the tone
 * (`info`→primary, `success`→success, `warn`→accent, `danger`→danger). The
 * `danger` tone announces via the `alert` role; the rest use `status`. The
 * `warn` tone maps to the `accent` token because there is no dedicated warning
 * slot in the primitive token whitelist. No literal colors.
 */
function Alert({ tone = 'info', title, onClose, icon, children, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const accent = {
        info: colors.primary,
        success: colors.success,
        warn: colors.accent,
        danger: colors.danger,
    };
    const ruleColor = accent[tone];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: tone === 'danger' ? 'alert' : 'summary', style: [
            {
                flexDirection: 'row',
                gap: tokens.spacing.sm,
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderLeftWidth: 4,
                borderLeftColor: ruleColor,
                borderRadius: tokens.radius.md,
                padding: tokens.spacing.md,
            },
            style,
        ], children: [icon != null ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: 2 }, children: icon }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [title != null ? (typeof title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '600',
                            color: ruleColor,
                        }, children: title })) : (title)) : null, children != null ? (typeof children === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm, color: colors.onSurface }, children: children })) : (children)) : null] }), onClose ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Dismiss", onPress: onClose, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base, color: colors.muted }, children: "\u2715" }) })) : null] }));
}
//# sourceMappingURL=Alert.js.map