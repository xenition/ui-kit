"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetActivityRingV3 = PetActivityRingV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const charts_1 = require("../charts");
const VARIANT_META = {
    walk: { glyph: '🐾', label: 'Walk', unit: 'min', color: 'primary' },
    play: { glyph: '🎾', label: 'Play', unit: 'min', color: 'accent' },
    exercise: { glyph: '🏃', label: 'Exercise', unit: 'min', color: 'success' },
    steps: { glyph: '👣', label: 'Steps', unit: '', color: 'warn' },
    calories: { glyph: '🔥', label: 'Calories', unit: 'kcal', color: 'danger' },
};
/**
 * Compact ring row — a list-friendly alternate to {@link PetActivityRing}. A
 * small ring sits at the leading edge with the label and inline value/goal on
 * its right and the percentage trailing; the ring `size` prop drives the small
 * diameter. Guards a non-positive goal with a muted "No goal set" note. Same
 * `PetActivityRingProps`. Token-pure.
 */
function PetActivityRingV3({ variant, value, goal, size = 44, color, showCaption = true, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = VARIANT_META[variant];
    const arcColor = color ?? meta.color;
    const textColor = colors[`${String(arcColor)}Text`] ?? colors[arcColor];
    const row = {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.md,
        paddingVertical: tokens.spacing.sm,
    };
    if (goal <= 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${meta.label}: no goal set`, style: [row, style], children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: meta.glyph, size: "xl" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: [meta.label, ": no goal set"] })] }));
    }
    const clamped = Math.min(Math.max(value, 0), goal);
    const pct = Math.round((clamped / goal) * 100);
    const met = clamped >= goal;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${meta.label}: ${clamped} of ${goal}${meta.unit ? ` ${meta.unit}` : ''}, ${pct}%${met ? ', goal met' : ''}`, style: [row, style], children: [(0, jsx_runtime_1.jsx)(charts_1.ProgressRing, { value: value, max: goal, size: size, strokeWidth: 5, color: arcColor, label: meta.glyph, accessibilityLabel: `${meta.label} ring, ${pct}%` }), showCaption ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: met ? `✓ ${meta.label}` : meta.label }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [clamped, " / ", goal, meta.unit ? ` ${meta.unit}` : ''] })] })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: textColor, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: [pct, "%"] })] }));
}
//# sourceMappingURL=PetActivityRingV3.js.map