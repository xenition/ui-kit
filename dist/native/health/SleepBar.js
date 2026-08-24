"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SleepBar = SleepBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const QUALITY_COLOR = {
    poor: 'danger',
    fair: 'warn',
    good: 'primary',
    excellent: 'success',
};
const QUALITY_LABEL = {
    poor: 'Poor',
    fair: 'Fair',
    good: 'Good',
    excellent: 'Excellent',
};
/**
 * A sleep-duration summary: hours slept versus goal drawn as a single fill bar,
 * a color-coded quality tag, and optional bed / wake times. The bar color comes
 * from `quality` (falling back to `primary`). Guards `goal <= 0`. Token-only.
 */
function SleepBar({ hours, goal = 8, quality, bedtime, wakeTime, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const safeGoal = Math.max(goal, 0);
    const safeHours = Math.max(hours, 0);
    const ratio = safeGoal > 0 ? Math.min(safeHours / safeGoal, 1) : 0;
    const barColor = quality ? colors[QUALITY_COLOR[quality]] : colors.primary;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `Sleep: ${safeHours} hours${safeGoal > 0 ? ` of ${safeGoal}` : ''}${quality ? `, ${QUALITY_LABEL[quality]} quality` : ''}`, style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base }, children: "\uD83D\uDE34" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }, children: safeHours }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: ["h", safeGoal > 0 ? ` / ${safeGoal}h` : ''] })] }), quality ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: barColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: QUALITY_LABEL[quality] })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 8, borderRadius: tokens.radius.full, backgroundColor: colors.border, overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${ratio * 100}%`, height: '100%', backgroundColor: barColor, borderRadius: tokens.radius.full } }) }), bedtime || wakeTime ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: bedtime ? `🌙 ${bedtime}` : '' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: wakeTime ? `☀️ ${wakeTime}` : '' })] })) : null] }));
}
//# sourceMappingURL=SleepBar.js.map