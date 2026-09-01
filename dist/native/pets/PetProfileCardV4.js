"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetProfileCardV4 = PetProfileCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const companion_1 = require("./internal/companion");
const GradientSurface_1 = require("./internal/GradientSurface");
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
const absoluteFill = { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 };
/**
 * PetProfileCard — **V4** "companion" profile hero (native twin of the web V4).
 * This is the pets line's ONE reserved gradient moment: the pet header sits on
 * the brand gradient ground (`companionGradient`) drawn as an absolute-fill
 * `GradientSurface` inside a rounded, overflow-hidden container, with near-white
 * `companionInk`/`companionInkSoft` text, a frosted-ring avatar, an
 * age/sex/weight strip rendered as frosted glass tiles (`companionTile` +
 * `companionBorder`), and spay/microchip facts as frosted chips (never color
 * alone — each carries a glyph + label). Same props/behavior as
 * {@link PetProfileCardProps}; `species` drives the glyph + fallback label.
 * `loading` renders a frosted skeleton on the gradient. Token-only colors via
 * `useXenitionTheme()` + the companion ramp helpers; the whole card is pressable
 * when `onPress` is set.
 */
function PetProfileCardV4({ name, species, breed, age, sex, weight, photoUrl, fixed, microchipId, loading = false, onPress, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, companion_1.companionInk)(r);
    const inkSoft = (0, companion_1.companionInkSoft)(r);
    const tile = (0, companion_1.companionTile)(r);
    const border = (0, companion_1.companionBorder)(r);
    const meta = SPECIES_META[species];
    const container = [
        {
            borderRadius: tokens.radius.lg,
            overflow: 'hidden',
            padding: tokens.spacing.lg,
            gap: tokens.spacing.md,
        },
        style,
    ];
    const Ground = () => ((0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, companion_1.companionGradient)(r), style: { ...absoluteFill } }));
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading pet profile", style: container, children: [(0, jsx_runtime_1.jsx)(Ground, {}), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 56, height: 56, borderRadius: tokens.radius.full, backgroundColor: tile } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 14, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: tile } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: tile } })] })] })] }));
    }
    const stats = [];
    if (age)
        stats.push({ label: 'Age', value: age });
    if (sex)
        stats.push({ label: 'Sex', value: `${SEX_GLYPH[sex]} ${sex}` });
    if (weight)
        stats.push({ label: 'Weight', value: weight });
    const chips = [];
    if (fixed)
        chips.push({ glyph: '✓', label: 'Spayed / neutered' });
    if (microchipId)
        chips.push({ glyph: '🔖', label: `Chip …${microchipId.slice(-6)}` });
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: container, children: [(0, jsx_runtime_1.jsx)(Ground, {}), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            borderRadius: tokens.radius.full,
                            borderWidth: 2,
                            borderColor: border,
                            padding: 2,
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: photoUrl, name: name, size: "lg" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: name }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: inkSoft, fontSize: tokens.typography.scale.sm }, children: [meta.glyph, " ", breed ?? meta.label] })] })] }), stats.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: stats.map((s) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        minWidth: 64,
                        gap: 2,
                        paddingHorizontal: tokens.spacing.md,
                        paddingVertical: tokens.spacing.sm,
                        borderRadius: tokens.radius.md,
                        backgroundColor: tile,
                        borderWidth: 1,
                        borderColor: border,
                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs }, children: s.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: s.value })] }, s.label))) })) : null, chips.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: chips.map((c) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: tokens.spacing.xs,
                        paddingHorizontal: tokens.spacing.sm,
                        paddingVertical: 4,
                        borderRadius: tokens.radius.full,
                        backgroundColor: tile,
                        borderWidth: 1,
                        borderColor: border,
                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: ink, fontSize: tokens.typography.scale.xs }, children: c.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: c.label })] }, c.label))) })) : null] }));
    const a11y = `${name}, ${breed ?? meta.label}${age ? `, ${age}` : ''}`;
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: inner });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: inner }));
}
//# sourceMappingURL=PetProfileCardV4.js.map