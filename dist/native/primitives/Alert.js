"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alert = Alert;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/** Tone → [rule/accent slot, text-on-solid slot]. `warn`→accent (no warn card slot). */
const TONE = {
    info: ['primary', 'onPrimary'],
    success: ['success', 'onSuccess'],
    warn: ['accent', 'onAccent'],
    danger: ['danger', 'onDanger'],
};
/** Token-derived translucent tint (no literal hex; mirrors GlassPanel). */
function withAlpha(hex, alpha) {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
/**
 * Inline, optionally dismissible alert — the native mirror of the web `Alert`.
 * The default (`subtle`) is a token-bound surface with a colored left rule
 * keyed to the tone (`info`→primary, `success`→success, `warn`→accent,
 * `danger`→danger). Additive `variant`s `solid` (filled) and `outline` layer
 * on top without changing the default. The `danger` tone announces via the
 * `alert` role; the rest use `summary`. No literal colors.
 */
function Alert({ tone = 'info', variant = 'subtle', title, onClose, icon, action, children, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [accentSlot, onAccentSlot] = TONE[tone];
    const ruleColor = colors[accentSlot];
    const onSolid = colors[onAccentSlot];
    // Per-variant surface. `subtle` is pinned to the historical look.
    let bg = colors.surface;
    let borderColor = colors.border;
    let borderWidth = 1;
    let borderLeftWidth = 4;
    let borderLeftColor = ruleColor;
    let titleColor = ruleColor;
    let bodyColor = colors.onSurface;
    let closeColor = colors.muted;
    if (variant === 'solid') {
        bg = ruleColor;
        borderWidth = 0;
        borderLeftWidth = 0;
        borderLeftColor = 'transparent';
        titleColor = onSolid;
        bodyColor = onSolid;
        closeColor = onSolid;
    }
    else if (variant === 'outline') {
        bg = withAlpha(ruleColor, 0.06);
        borderColor = ruleColor;
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: tone === 'danger' ? 'alert' : 'summary', style: [
            {
                flexDirection: 'row',
                gap: tokens.spacing.sm,
                backgroundColor: bg,
                borderColor,
                borderWidth,
                borderLeftWidth,
                borderLeftColor,
                borderRadius: tokens.radius.md,
                padding: tokens.spacing.md,
            },
            style,
        ], children: [icon != null ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: 2 }, children: icon }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [title != null ? (typeof title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '600',
                            color: titleColor,
                        }, children: title })) : (title)) : null, children != null ? (typeof children === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm, color: bodyColor }, children: children })) : (children)) : null, action != null ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.xs }, children: action }) : null] }), onClose ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Dismiss", onPress: onClose, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base, color: closeColor }, children: "\u2715" }) })) : null] }));
}
//# sourceMappingURL=Alert.js.map