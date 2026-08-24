"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banner = Banner;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Full-width inline banner — a solid, edge-to-edge notice keyed to a semantic
 * tone: the background is the tone token (`info`→primary, `success`→success,
 * `warn`→warn, `danger`→danger) and all content uses the paired `onX` token, so
 * contrast is compiler-guaranteed and every color traces to a token. Distinct
 * from `Alert` (surface card + left rule) by its solid, full-bleed fill.
 * Optional trailing action + dismiss. `danger` announces via the `alert` role.
 */
function Banner({ tone = 'info', icon, children, actionLabel, onAction, onClose, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const bg = {
        info: colors.primary,
        success: colors.success,
        warn: colors.warn,
        danger: colors.danger,
    };
    const fg = {
        info: colors.onPrimary,
        success: colors.onSuccess,
        warn: colors.onWarn,
        danger: colors.onDanger,
    };
    const on = fg[tone];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: tone === 'danger' ? 'alert' : 'summary', style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                width: '100%',
                backgroundColor: bg[tone],
                paddingVertical: tokens.spacing.md,
                paddingHorizontal: tokens.spacing.lg,
            },
            style,
        ], children: [icon != null ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: icon }) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: typeof children === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm, fontWeight: '500', color: on }, children: children })) : (children) }), actionLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: actionLabel, onPress: onAction, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm, fontWeight: '700', color: on, textDecorationLine: 'underline' }, children: actionLabel }) })) : null, onClose ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Dismiss", onPress: onClose, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base, color: on }, children: "\u2715" }) })) : null] }));
}
//# sourceMappingURL=Banner.js.map