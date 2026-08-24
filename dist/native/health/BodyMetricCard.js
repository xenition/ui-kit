"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyMetricCard = BodyMetricCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const charts_1 = require("../charts");
const appearance_1 = require("../primitives/internal/appearance");
const motion_1 = require("../primitives/internal/motion");
const VARIANT_META = {
    weight: { glyph: '⚖️', label: 'Weight', unit: 'kg' },
    bmi: { glyph: '📊', label: 'BMI', unit: '' },
    'body-fat': { glyph: '📉', label: 'Body fat', unit: '%' },
    muscle: { glyph: '💪', label: 'Muscle mass', unit: 'kg' },
    waist: { glyph: '📏', label: 'Waist', unit: 'cm' },
    'blood-sugar': { glyph: '🩸', label: 'Blood sugar', unit: 'mg/dL' },
};
/**
 * A body-composition metric card: icon + label, the current value with unit, an
 * optional change delta, and an inline {@link Sparkline} trend. `lowerIsBetter`
 * flips the delta tone for metrics where a decrease is good. `appearance` selects
 * the surface treatment (classic by default). Colors trace to `SemanticColors`
 * tokens — no literals. Pressable when `onPress` is set.
 */
function BodyMetricCard({ variant, value, unit, delta, lowerIsBetter = false, trend, onPress, appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = VARIANT_META[variant];
    const resolvedUnit = unit ?? meta.unit;
    const enter = (0, motion_1.useEnter)();
    const press = (0, motion_1.usePressScale)();
    let deltaColor = colors.muted;
    let trendColor = 'primary';
    if (delta != null && delta !== 0) {
        const good = lowerIsBetter ? delta < 0 : delta > 0;
        deltaColor = good ? colors.successText : colors.dangerText;
        trendColor = good ? 'success' : 'danger';
    }
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                ...(0, appearance_1.appearanceStyle)(appearance, colors, tokens),
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: meta.label })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '700' }, children: value }), resolvedUnit ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base, marginBottom: tokens.spacing.xs }, children: resolvedUnit })) : null] }), delta != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: deltaColor, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: [delta > 0 ? '▲ ' : delta < 0 ? '▼ ' : '', Math.abs(delta), resolvedUnit ? ` ${resolvedUnit}` : ''] })) : null, trend && trend.length > 0 ? ((0, jsx_runtime_1.jsx)(charts_1.Sparkline, { data: trend, color: trendColor, accessibilityLabel: `${meta.label} trend over ${trend.length} readings` })) : null] }));
    const a11y = `${meta.label}: ${String(value)}${resolvedUnit ? ` ${resolvedUnit}` : ''}`;
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { accessibilityLabel: a11y, style: { opacity: enter.opacity, transform: enter.transform }, children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: inner }) }));
}
//# sourceMappingURL=BodyMetricCard.js.map