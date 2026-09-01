"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradientHeroV4 = GradientHeroV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Eyebrow_1 = require("../primitives/Eyebrow");
const Gradient_1 = require("../commerce/internal/Gradient");
/**
 * GradientHero — **V4** "showcase" design (native mirror of the web V4). The
 * bold, conversion-forward landing moment: a vibrant primary→accent brand
 * gradient ground (via the shared `expo-linear-gradient` wrapper — the
 * CTABannerV4 technique) carrying a soft eyebrow, an extra-bold tight-tracked
 * near-white headline, generous whitespace, and a call-to-action row. Honors
 * every prop of {@link GradientHeroProps} (`eyebrow`/`title`/`subtitle`/
 * `actions`/`media`/`align`); token-only colors via `useXenitionTheme()`
 * (`tokens.ramps.primary` near-white ink on the saturated ground), dark-mode
 * safe.
 */
function GradientHeroV4({ eyebrow, title, subtitle, actions, media, align = 'center', style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const centered = align === 'center';
    const ink = r.primary[50];
    const inkSoft = r.primary[100];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: r.primary[600],
                borderRadius: tokens.radius.lg,
                paddingVertical: tokens.spacing['2xl'],
                paddingHorizontal: tokens.spacing.lg,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(Gradient_1.Gradient, { colors: [r.primary[500], r.primary[600], r.accent[500]], start: { x: 0, y: 0 }, end: { x: 1, y: 1 }, style: react_native_1.StyleSheet.absoluteFillObject }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    gap: tokens.spacing.lg,
                    alignItems: centered ? 'center' : 'flex-start',
                }, children: [eyebrow !== undefined && eyebrow !== null ? (typeof eyebrow === 'string' ? ((0, jsx_runtime_1.jsx)(Eyebrow_1.Eyebrow, { tone: "primary", align: centered ? 'center' : 'start', style: { color: ink }, children: eyebrow })) : (eyebrow)) : null, typeof title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: ink,
                            fontSize: tokens.typography.scale['3xl'],
                            fontWeight: '800',
                            letterSpacing: -0.5,
                            textAlign: centered ? 'center' : 'left',
                        }, children: title })) : (title), subtitle !== undefined && subtitle !== null ? (typeof subtitle === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: inkSoft,
                            fontSize: tokens.typography.scale.lg,
                            textAlign: centered ? 'center' : 'left',
                        }, children: subtitle })) : (subtitle)) : null, actions !== undefined && actions !== null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            marginTop: tokens.spacing.sm,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: tokens.spacing.sm,
                            justifyContent: centered ? 'center' : 'flex-start',
                        }, children: actions })) : null, media !== undefined && media !== null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.xl, width: '100%' }, children: media })) : null] })] }));
}
//# sourceMappingURL=GradientHeroV4.js.map