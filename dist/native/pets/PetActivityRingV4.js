"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetActivityRingV4 = PetActivityRingV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const charts_1 = require("../charts");
const color_1 = require("../primitives/internal/color");
/** Per-variant glyph / label / unit / default color — copied from the base component. */
const VARIANT_META = {
    walk: { glyph: '🐾', label: 'Walk', unit: 'min', color: 'primary' },
    play: { glyph: '🎾', label: 'Play', unit: 'min', color: 'accent' },
    exercise: { glyph: '🏃', label: 'Exercise', unit: 'min', color: 'success' },
    steps: { glyph: '👣', label: 'Steps', unit: '', color: 'warn' },
    calories: { glyph: '🔥', label: 'Calories', unit: 'kcal', color: 'danger' },
};
/**
 * PetActivityRing — **V4** "companion" design (native parity of the web V4). The
 * warm, friendly take on a single activity goal ring: an elevated rounded card
 * with a soft shadow wrapping the charts {@link ProgressRing} (kept token-fed and
 * unchanged from the base), a big legible central value, and the label + glyph
 * carried in a soft-primary chip beneath. Same props/behavior as
 * {@link PetActivityRingProps}: honors `variant` (walk / play / exercise / steps /
 * calories) with its glyph/label/unit, the `color` override and the `size` prop,
 * and guards a non-positive goal with a muted "No goal set" note. Token-only
 * colors via `useXenitionTheme()`.
 */
function PetActivityRingV4({ variant, value, goal, size = 120, color, showCaption = true, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = VARIANT_META[variant];
    const arcColor = color ?? meta.color;
    const card = {
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        alignItems: 'center',
        shadowColor: colors.onSurface,
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
    };
    if (goal <= 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${meta.label}: no goal set`, style: [card, { gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['2xl'] }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No goal set" })] }));
    }
    const clamped = Math.min(Math.max(value, 0), goal);
    const pct = Math.round((clamped / goal) * 100);
    const met = clamped >= goal;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [card, { gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsx)(charts_1.ProgressRing, { value: value, max: goal, size: size, color: arcColor, label: `${meta.glyph} ${pct}%`, accessibilityLabel: `${meta.label}: ${clamped} of ${goal}${meta.unit ? ` ${meta.unit}` : ''}, ${pct}%${met ? ', goal met' : ''}` }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '700' }, children: [pct, "%"] }), showCaption ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                            borderRadius: tokens.radius.full,
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: 2,
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[arcColor], fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: met ? `✓ ${meta.label} goal met` : meta.label })] }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [clamped, " / ", goal, meta.unit ? ` ${meta.unit}` : ''] })] })) : null] }));
}
//# sourceMappingURL=PetActivityRingV4.js.map