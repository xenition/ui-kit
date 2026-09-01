"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WellnessGoalRingV4 = WellnessGoalRingV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const charts_1 = require("../charts");
const GradientSurface_1 = require("./internal/GradientSurface");
const calm_1 = require("./internal/calm");
/**
 * WellnessGoalRingV4 — the calm redesign of {@link WellnessGoalRing}. Same props,
 * defaults, size, ring color, and "No goal set" empty state. Only the visuals
 * change: the "✓ Goal met" note becomes a small gradient pill (the single calm
 * accent) once the goal is met.
 */
function WellnessGoalRingV4({ label, value, goal, unit, color = 'primary', size = 132, showMetBadge = true, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    if (goal <= 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${label}: no goal set`, style: [{ alignItems: 'center', gap: tokens.spacing.sm, padding: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No goal set" })] }));
    }
    const pct = Math.round((Math.min(Math.max(value, 0), goal) / goal) * 100);
    const met = value >= goal;
    const unitSuffix = unit ? ` ${unit}` : '';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${label}: ${value} of ${goal}${unitSuffix}, ${pct}%${met ? ', goal met' : ''}`, style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                alignItems: 'center',
                gap: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(charts_1.ProgressRing, { value: value, max: goal, size: size, color: color, label: `${pct}%`, showPercent: false }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: label }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: [value, " / ", goal, unitSuffix] }), met && showMetBadge ? ((0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, calm_1.calmGradient)(r), start: { x: 0, y: 0 }, end: { x: 1, y: 0 }, style: {
                    paddingHorizontal: tokens.spacing.md,
                    paddingVertical: tokens.spacing.xs,
                    borderRadius: tokens.radius.full,
                    overflow: 'hidden',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, calm_1.calmInk)(r), fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: "\u2713 Goal met" }) })) : null] }));
}
//# sourceMappingURL=WellnessGoalRingV4.js.map