"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VitalStat = VitalStat;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/** Icon / default label / default unit / accent tone per vital variant. */
const VARIANT_META = {
    'heart-rate': { glyph: '❤️', label: 'Heart rate', unit: 'bpm', color: 'danger' },
    steps: { glyph: '👟', label: 'Steps', unit: '', color: 'primary' },
    calories: { glyph: '🔥', label: 'Calories', unit: 'kcal', color: 'warn' },
    distance: { glyph: '📍', label: 'Distance', unit: 'km', color: 'primary' },
    oxygen: { glyph: '🫁', label: 'Blood oxygen', unit: '%', color: 'accent' },
    'blood-pressure': { glyph: '🩺', label: 'Blood pressure', unit: 'mmHg', color: 'danger' },
    temperature: { glyph: '🌡️', label: 'Temperature', unit: '°C', color: 'warn' },
    respiration: { glyph: '💨', label: 'Respiration', unit: 'br/min', color: 'accent' },
};
/**
 * A single vital-sign tile: an emoji icon, the measured value with its unit, a
 * caption, and an optional trend delta. The `variant` picks sensible defaults
 * (icon / unit / accent tone) that individual props can override. Colors resolve
 * from `SemanticColors` via `useXenitionTheme()` — no literal colors. Pressable
 * when `onPress` is provided.
 */
function VitalStat({ variant, value, unit, label, delta, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = VARIANT_META[variant];
    const resolvedUnit = unit ?? meta.unit;
    const resolvedLabel = label ?? meta.label;
    const deltaColor = delta == null || delta === 0 ? colors.muted : delta > 0 ? colors.success : colors.danger;
    const a11y = `${resolvedLabel}: ${String(value)}${resolvedUnit ? ` ${resolvedUnit}` : ''}`;
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
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs, flex: 1 }, children: resolvedLabel })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[meta.color], fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }, children: value }), resolvedUnit ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, marginBottom: tokens.spacing.xs }, children: resolvedUnit })) : null] }), delta != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: deltaColor, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [delta > 0 ? '▲ ' : delta < 0 ? '▼ ' : '', Math.abs(delta)] })) : null] }));
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: inner });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.8 : 1 }), children: inner }));
}
//# sourceMappingURL=VitalStat.js.map