"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetActivityRingV2 = PetActivityRingV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const charts_1 = require("../charts");
const color_1 = require("../primitives/internal/color");
const VARIANT_META = {
    walk: { glyph: '🐾', label: 'Walk', unit: 'min', color: 'primary' },
    play: { glyph: '🎾', label: 'Play', unit: 'min', color: 'accent' },
    exercise: { glyph: '🏃', label: 'Exercise', unit: 'min', color: 'success' },
    steps: { glyph: '👣', label: 'Steps', unit: '', color: 'warn' },
    calories: { glyph: '🔥', label: 'Calories', unit: 'kcal', color: 'danger' },
};
/**
 * Hero activity ring — a prominent alternate to {@link PetActivityRing}. The
 * ring is enlarged and centered on a soft tinted panel, with the activity label
 * as a headline and the raw value/goal called out beneath. Guards a non-positive
 * goal with a muted "No goal set" note. Same `PetActivityRingProps`; the caption
 * is always shown as the hero copy. Token-pure.
 */
function PetActivityRingV2({ variant, value, goal, size = 168, color, showCaption = true, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = VARIANT_META[variant];
    const arcColor = color ?? meta.color;
    const textColor = colors[`${String(arcColor)}Text`] ?? colors[arcColor];
    const panel = {
        alignItems: 'center',
        gap: tokens.spacing.md,
        padding: tokens.spacing.xl,
        borderRadius: tokens.radius.lg,
        backgroundColor: (0, color_1.withAlpha)(colors[arcColor], 0.08),
    };
    if (goal <= 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${meta.label}: no goal set`, style: [panel, style], children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: meta.glyph, size: "3xl" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: "No goal set" })] }));
    }
    const clamped = Math.min(Math.max(value, 0), goal);
    const pct = Math.round((clamped / goal) * 100);
    const met = clamped >= goal;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [panel, style], children: [(0, jsx_runtime_1.jsx)(charts_1.ProgressRing, { value: value, max: goal, size: size, strokeWidth: 16, color: arcColor, label: `${pct}%`, accessibilityLabel: `${meta.label}: ${clamped} of ${goal}${meta.unit ? ` ${meta.unit}` : ''}, ${pct}%${met ? ', goal met' : ''}` }), showCaption ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: [meta.glyph, " ", met ? `${meta.label} goal met` : meta.label] }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: textColor, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: [clamped, " / ", goal, meta.unit ? ` ${meta.unit}` : '', met ? ' ✓' : ''] })] })) : null] }));
}
//# sourceMappingURL=PetActivityRingV2.js.map