"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetProfileCardV2 = PetProfileCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
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
 * Banner-and-overlapping-avatar profile card — a visually distinct alternate to
 * {@link PetProfileCard}. A soft primary-tinted banner sits behind an avatar
 * that overlaps its lower edge (with a surface ring), the name/breed centered
 * below, and the key stats presented as filled chips rather than a bare strip.
 * Same `PetProfileCardProps`; elevated + enter/press motion. Token-pure.
 */
function PetProfileCardV2({ name, species, breed, age, sex, weight, photoUrl, fixed, microchipId, loading = false, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const press = (0, motion_1.usePressScale)();
    const meta = SPECIES_META[species];
    const container = [
        {
            backgroundColor: colors.surface,
            borderRadius: tokens.radius.lg,
            overflow: 'hidden',
            ...(0, elevation_1.shadow)('md', tokens),
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading pet profile", style: container, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 60, backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1) } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', marginTop: -30, gap: tokens.spacing.sm, paddingBottom: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: 72,
                                height: 72,
                                borderRadius: tokens.radius.full,
                                backgroundColor: colors.border,
                                borderWidth: 3,
                                borderColor: colors.surface,
                            } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 14, width: '45%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, width: '30%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] })] }));
    }
    const stats = [];
    if (age)
        stats.push({ label: 'Age', value: age });
    if (sex)
        stats.push({ label: 'Sex', value: `${SEX_GLYPH[sex]} ${sex}` });
    if (weight)
        stats.push({ label: 'Weight', value: weight });
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: container, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 60, backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.12) }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: meta.glyph, size: "2xl", style: { position: 'absolute', right: tokens.spacing.md, top: tokens.spacing.sm, opacity: 0.5 } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', marginTop: -30, paddingHorizontal: tokens.spacing.lg, paddingBottom: tokens.spacing.lg, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { borderRadius: tokens.radius.full, borderWidth: 3, borderColor: colors.surface }, children: (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: photoUrl, name: name, size: "xl" }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: name }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: [meta.glyph, " ", breed ?? meta.label] }), stats.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }, children: stats.map((s) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                alignItems: 'center',
                                gap: 2,
                                minWidth: 64,
                                paddingVertical: tokens.spacing.sm,
                                paddingHorizontal: tokens.spacing.md,
                                borderRadius: tokens.radius.md,
                                backgroundColor: tokens.ramps.neutral[100] ?? colors.surface,
                            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: s.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: s.value })] }, s.label))) })) : null, fixed || microchipId ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }, children: [fixed ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "success", variant: "soft", size: "sm", children: "\u2713 Spayed / neutered" })) : null, microchipId ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", variant: "soft", size: "sm", children: `Chip …${microchipId.slice(-6)}` })) : null] })) : null] })] }));
    const a11y = `${name}, ${breed ?? meta.label}${age ? `, ${age}` : ''}`;
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { accessibilityLabel: a11y, style: { opacity: enter.opacity, transform: enter.transform }, children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, children: inner }) }));
}
//# sourceMappingURL=PetProfileCardV2.js.map