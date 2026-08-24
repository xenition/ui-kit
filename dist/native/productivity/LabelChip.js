"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelChip = LabelChip;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/** Maps a tone to the semantic slot used for its accent dot. */
const DOT = {
    neutral: 'muted',
    primary: 'primary',
    success: 'success',
    warn: 'warn',
    danger: 'danger',
};
/**
 * Outlined, color-coded label chip — a token-bound accent dot plus text on a
 * surface background, with optional press + remove affordances. The dot tone
 * traces to a `SemanticColors` slot. No literal colors.
 */
function LabelChip({ label, tone = 'neutral', onRemove, onPress, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const dot = colors[DOT[tone] ?? 'muted'];
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: dot } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '500' }, children: label }), onRemove ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Remove ${label}`, onPress: onRemove, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "\u00D7" }) })) : null] }));
    const containerStyle = [
        {
            alignSelf: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
            borderRadius: tokens.radius.full,
            paddingVertical: 2,
            paddingHorizontal: tokens.spacing.sm,
        },
        style,
    ];
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: onPress, style: ({ pressed }) => [containerStyle, { opacity: pressed ? 0.7 : 1 }], children: body }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: body });
}
//# sourceMappingURL=LabelChip.js.map