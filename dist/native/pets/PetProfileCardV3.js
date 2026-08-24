"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetProfileCardV3 = PetProfileCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const motion_1 = require("../primitives/internal/motion");
const SPECIES_META = {
    dog: { glyph: '🐕', label: 'Dog' },
    cat: { glyph: '🐈', label: 'Cat' },
    bird: { glyph: '🐦', label: 'Bird' },
    rabbit: { glyph: '🐇', label: 'Rabbit' },
    reptile: { glyph: '🦎', label: 'Reptile' },
    fish: { glyph: '🐠', label: 'Fish' },
    other: { glyph: '🐾', label: 'Pet' },
};
const SEX_GLYPH = { male: '♂', female: '♀', unknown: '•' };
/**
 * Compact single-row profile — a dense list-friendly alternate to
 * {@link PetProfileCard}. A small avatar, a two-line name/breed block, and a
 * trailing meta value (age / weight) sit on one hairline-separated row; the
 * spay/neuter state reads as a trailing check glyph + label, never color alone.
 * Same `PetProfileCardProps`. Token-pure.
 */
function PetProfileCardV3({ name, species, breed, age, sex, weight, photoUrl, fixed, microchipId, loading = false, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const meta = SPECIES_META[species];
    const row = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
            backgroundColor: colors.surface,
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading pet profile", style: row, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 40, height: 40, borderRadius: tokens.radius.full, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 9, width: '35%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] })] }));
    }
    const trailing = age ?? weight;
    const subtitle = [breed ?? meta.label, sex ? `${SEX_GLYPH[sex]} ${sex}` : null].filter(Boolean).join(' · ');
    const a11y = `${name}, ${breed ?? meta.label}${age ? `, ${age}` : ''}${fixed ? ', spayed or neutered' : ''}`;
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: row, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: photoUrl, name: name, size: "md" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: name }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [meta.glyph, " ", subtitle, microchipId ? ` · chip …${microchipId.slice(-4)}` : ''] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [trailing ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: trailing })) : null, fixed ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2713", size: "xs", color: "successText" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.successText, fontSize: tokens.typography.scale.xs }, children: "Fixed" })] })) : null] })] }));
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: inner });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, children: inner }) }));
}
//# sourceMappingURL=PetProfileCardV3.js.map