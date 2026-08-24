"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricRing = MetricRing;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const charts_1 = require("../charts");
/**
 * A single labelled progress ring for one health metric — wraps the charts
 * {@link ProgressRing} and adds a value/goal caption below. When `goal <= 0`
 * it degrades to a muted "No goal set" note. The ring carries an
 * `accessibilityLabel`. Token-only colors.
 */
function MetricRing({ label, value, goal, unit, color = 'primary', size = 120, centerLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (goal <= 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ alignItems: 'center', gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No goal set" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: label })] }));
    }
    const clamped = Math.min(Math.max(value, 0), goal);
    const pct = Math.round((clamped / goal) * 100);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ alignItems: 'center', gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsx)(charts_1.ProgressRing, { value: clamped, max: goal, size: size, color: color, label: centerLabel ?? `${pct}%`, accessibilityLabel: `${label}: ${clamped} of ${goal}${unit ? ` ${unit}` : ''}, ${pct}%` }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: label }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [clamped, " / ", goal, unit ? ` ${unit}` : ''] })] }));
}
//# sourceMappingURL=MetricRing.js.map