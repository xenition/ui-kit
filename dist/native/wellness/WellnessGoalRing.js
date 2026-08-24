"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WellnessGoalRing = WellnessGoalRing;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const charts_1 = require("../charts");
/**
 * A wellness goal dial built on the shared `ProgressRing` chart: a labeled ring
 * showing progress toward a daily target, with the value / goal beneath and a
 * success badge once met. A non-positive `goal` degrades to a "No goal set"
 * note (state, not color alone). Token-only colors — the ring resolves its
 * stroke from a `SemanticColors` key.
 */
function WellnessGoalRing({ label, value, goal, unit, color = 'primary', size = 132, showMetBadge = true, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (goal <= 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${label}: no goal set`, style: [{ alignItems: 'center', gap: tokens.spacing.sm, padding: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No goal set" })] }));
    }
    const pct = Math.round((Math.min(Math.max(value, 0), goal) / goal) * 100);
    const met = value >= goal;
    const unitSuffix = unit ? ` ${unit}` : '';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${label}: ${value} of ${goal}${unitSuffix}, ${pct}%${met ? ', goal met' : ''}`, style: [{ alignItems: 'center', gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(charts_1.ProgressRing, { value: value, max: goal, size: size, color: color, label: `${pct}%`, showPercent: false }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: label }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: [value, " / ", goal, unitSuffix] }), met && showMetBadge ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.success, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: "\u2713 Goal met" })) : null] }));
}
//# sourceMappingURL=WellnessGoalRing.js.map