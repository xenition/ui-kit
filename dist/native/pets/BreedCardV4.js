"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreedCardV4 = BreedCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const SIZE_META = {
    toy: { glyph: '🐁', label: 'Toy' },
    small: { glyph: '🐇', label: 'Small' },
    medium: { glyph: '🐕', label: 'Medium' },
    large: { glyph: '🐎', label: 'Large' },
    giant: { glyph: '🐘', label: 'Giant' },
};
const ENERGY_META = {
    low: { glyph: '🌙', label: 'Low energy', tone: 'success' },
    moderate: { glyph: '⚡', label: 'Moderate energy', tone: 'warn' },
    high: { glyph: '🔥', label: 'High energy', tone: 'danger' },
};
/**
 * BreedCard — **V4** "companion" design (native parity of the web V4). The warm,
 * friendly take on a breed reference card: an elevated rounded card with a soft
 * shadow (no gradient — a clean surface), the breed photo/glyph in a soft-primary
 * tinted well, a bold breed name, a muted species line, size + energy shown as
 * labelled glyph Badges (never color alone), lifespan as a soft-primary chip, and
 * temperament traits as soft-primary chips. Same props/behavior as
 * {@link BreedCardProps}; pressable when `onPress` is set. Token-only colors via
 * `useXenitionTheme()`.
 */
function BreedCardV4({ name, species, photoUrl, glyph = '🐾', size, energy, lifespan, traits, onPress, style, variant = 'card', }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const sizeMeta = size ? SIZE_META[size] : undefined;
    const energyMeta = energy ? ENERGY_META[energy] : undefined;
    const safeTraits = traits ?? [];
    const chipStyle = {
        backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
        borderRadius: tokens.radius.full,
        paddingHorizontal: tokens.spacing.sm,
        paddingVertical: 2,
    };
    const compactInner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                minHeight: 44,
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.sm,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.08,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 6 },
                elevation: 3,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 36,
                    height: 36,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }, children: photoUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: photoUrl }, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: glyph })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: name }), species ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }, children: species })) : null] }), sizeMeta ? ((0, jsx_runtime_1.jsxs)(primitives_1.Badge, { tone: "primary", variant: "soft", size: "sm", children: [sizeMeta.glyph, " ", sizeMeta.label] })) : null, energyMeta ? ((0, jsx_runtime_1.jsxs)(primitives_1.Badge, { tone: energyMeta.tone, variant: "soft", size: "sm", children: [energyMeta.glyph, " ", energyMeta.label] })) : null] }));
    const inner = variant === 'compact' ? compactInner : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.08,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 6 },
                elevation: 3,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 44,
                            height: 44,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                        }, children: photoUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: photoUrl }, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: glyph })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: name }), species ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: species })) : null] })] }), sizeMeta || energyMeta ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.sm }, children: [sizeMeta ? ((0, jsx_runtime_1.jsxs)(primitives_1.Badge, { tone: "primary", variant: "soft", size: "sm", children: [sizeMeta.glyph, " ", sizeMeta.label] })) : null, energyMeta ? ((0, jsx_runtime_1.jsxs)(primitives_1.Badge, { tone: energyMeta.tone, variant: "soft", size: "sm", children: [energyMeta.glyph, " ", energyMeta.label] })) : null] })) : null, lifespan ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: chipStyle, children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: ["\u23F3 ", lifespan] }) }) })) : null, safeTraits.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: safeTraits.slice(0, 5).map((t, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: chipStyle, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs }, children: t }) }, i))) })) : null] }));
    const a11y = `${name}${species ? `, ${species}` : ''}${sizeMeta ? `, ${sizeMeta.label}` : ''}${energyMeta ? `, ${energyMeta.label}` : ''}`;
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: inner });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: inner }));
}
//# sourceMappingURL=BreedCardV4.js.map