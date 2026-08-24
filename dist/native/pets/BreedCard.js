"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreedCard = BreedCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const SIZE_LABEL = {
    toy: 'Toy',
    small: 'Small',
    medium: 'Medium',
    large: 'Large',
    giant: 'Giant',
};
const ENERGY_META = {
    low: { label: 'Low energy', dots: 1, slot: 'success' },
    moderate: { label: 'Moderate energy', dots: 2, slot: 'warn' },
    high: { label: 'High energy', dots: 3, slot: 'danger' },
};
/**
 * A breed reference card: banner (photo or emoji placeholder), name + species,
 * a stat row (size class, lifespan), a labelled energy meter, and temperament
 * trait chips. Pressable when `onPress` is set. The energy level is conveyed by
 * both dots and a text label. Token-only colors; a `View` placeholder stands in
 * for a real breed photo.
 */
function BreedCard({ name, species, photoUrl, glyph = '🐾', size, energy, lifespan, traits, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const energyMeta = energy ? ENERGY_META[energy] : undefined;
    const safeTraits = traits ?? [];
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                    height: 96,
                    backgroundColor: colors.border,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: !photoUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['3xl'] }, children: glyph })) : null }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.lg, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: name }), species ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: species })) : null] }), size || lifespan ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xl }, children: [size ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Size" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: SIZE_LABEL[size] })] })) : null, lifespan ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Lifespan" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: lifespan })] })) : null] })) : null, energyMeta ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: energyMeta.label, style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [[0, 1, 2].map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: 8,
                                    height: 8,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: i < energyMeta.dots ? colors[energyMeta.slot] : colors.border,
                                } }, i))), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: energyMeta.label })] })) : null, safeTraits.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: safeTraits.slice(0, 5).map((t, i) => ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "accent", variant: "soft", size: "sm", children: t }, i))) })) : null] })] }));
    const a11y = `${name}${species ? `, ${species}` : ''}${size ? `, ${SIZE_LABEL[size]}` : ''}`;
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: inner });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: inner }));
}
//# sourceMappingURL=BreedCard.js.map