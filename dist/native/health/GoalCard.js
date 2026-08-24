"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalCard = GoalCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const charts_1 = require("../charts");
/**
 * A goal-progress card: title, an emphasized `value / target` readout, and a
 * {@link MiniBar}. When the target is met the bar and readout switch to the
 * `success` tone and a "Goal met" note appears. Guards `target <= 0`. Token-only.
 */
function GoalCard({ title, value, target, unit, color = 'primary', icon, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const hasTarget = target > 0;
    const clamped = hasTarget ? Math.min(Math.max(value, 0), target) : Math.max(value, 0);
    const met = hasTarget && value >= target;
    const pct = hasTarget ? Math.round((clamped / target) * 100) : 0;
    const barColor = met ? 'success' : color;
    const a11y = hasTarget
        ? `${title}: ${value} of ${target}${unit ? ` ${unit}` : ''}, ${pct}%${met ? ', goal met' : ''}`
        : `${title}: ${value}${unit ? ` ${unit}` : ''}`;
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [icon ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: icon }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600', flex: 1 }, children: title }), met ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "\u2713 Goal met" })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: met ? colors.success : colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }, children: value }), hasTarget ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: ["/ ", target, unit ? ` ${unit}` : ''] })) : unit ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: unit })) : null] }), hasTarget ? ((0, jsx_runtime_1.jsx)(charts_1.MiniBar, { value: clamped, max: target, color: barColor, accessibilityLabel: `${title} progress, ${pct}%` })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "No target set" }))] }));
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: inner });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: inner }));
}
//# sourceMappingURL=GoalCard.js.map