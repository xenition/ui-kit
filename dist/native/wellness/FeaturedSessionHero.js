"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeaturedSessionHero = FeaturedSessionHero;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("../primitives/Icon");
const GradientSurface_1 = require("./internal/GradientSurface");
const calm_1 = require("./internal/calm");
/**
 * FeaturedSessionHero — the home-screen centerpiece: a soft primary-hue gradient
 * ground carrying the featured session, a near-white play button, and a frosted
 * duration chip. A large faint glyph sits behind the copy for warmth. Near-white
 * ink and the gradient both derive from the brand ramp — no literal colors, so it
 * restyles from the seed in light and dark. This is the single vivid surface at
 * the top of the screen; everything else stays calm around it.
 */
function FeaturedSessionHero({ eyebrow, title, subtitle, durationMin, coverGlyph = '🌅', onPlay, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, calm_1.calmInk)(r);
    const inkSoft = (0, calm_1.calmInkSoft)(r);
    const a11y = `${eyebrow ? eyebrow + ', ' : ''}${title}${subtitle ? ', ' + subtitle : ''}${durationMin != null ? ', ' + durationMin + ' minutes' : ''}`;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, calm_1.calmGradient)(r), style: { borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                        position: 'absolute',
                        top: tokens.spacing.sm,
                        right: tokens.spacing.md,
                        fontSize: tokens.typography.scale['3xl'] * 2,
                        opacity: 0.16,
                    }, children: coverGlyph }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "header", accessibilityLabel: a11y, style: { gap: 2, paddingRight: tokens.spacing.xl }, children: [eyebrow ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: inkSoft,
                                fontSize: tokens.typography.scale.xs,
                                fontWeight: '700',
                                letterSpacing: 1,
                                textTransform: 'uppercase',
                            }, children: eyebrow })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm, marginTop: 2 }, children: subtitle })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: tokens.spacing.md,
                        marginTop: tokens.spacing.lg,
                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Play session", onPress: onPlay, style: ({ pressed }) => ({
                                width: 48,
                                height: 48,
                                borderRadius: tokens.radius.full,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: ink,
                                opacity: pressed ? 0.9 : 1,
                            }), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u25B6", size: tokens.typography.scale.lg, style: { color: colors.primary } }) }), durationMin != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                paddingHorizontal: tokens.spacing.md,
                                paddingVertical: tokens.spacing.xs,
                                borderRadius: tokens.radius.full,
                                backgroundColor: (0, calm_1.calmTile)(r),
                                borderWidth: 1,
                                borderColor: (0, calm_1.calmBorder)(r),
                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: `${durationMin} min` }) })) : null] })] }) }));
}
//# sourceMappingURL=FeaturedSessionHero.js.map