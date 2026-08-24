"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricTile = MetricTile;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TONE_COLOR = {
    neutral: 'onSurface',
    primary: 'primary',
    success: 'success',
    warn: 'warn',
    danger: 'danger',
};
/**
 * A compact metric tile — a smaller, denser cousin of {@link StatCard} for grids
 * of secondary numbers. Optional accent `tone` colors the value. Pressable when
 * `onPress` is set. Token-only.
 */
function MetricTile({ label, value, icon, tone = 'neutral', onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.md,
                padding: tokens.spacing.md,
                gap: tokens.spacing.xs,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [icon ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: icon }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: label })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors[TONE_COLOR[tone]],
                    fontSize: tokens.typography.scale.xl,
                    fontWeight: '700',
                }, children: value })] }));
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: `${label}: ${String(value)}`, children: inner });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${label}: ${String(value)}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.8 : 1 }), children: inner }));
}
//# sourceMappingURL=MetricTile.js.map