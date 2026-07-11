"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradientHero = GradientHero;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Eyebrow_1 = require("../primitives/Eyebrow");
const color_1 = require("../primitives/internal/color");
const Gradient_1 = require("../commerce/internal/Gradient");
/**
 * Full-bleed marketing hero — the native mirror of the web `GradientHero`.
 *
 * The web version paints an animated `AuroraBackground` (multiple blurred
 * blobs + grain/pattern overlays) behind the copy; React Native has no
 * `filter: blur()` or CSS keyframe machinery, so native **simplifies to a
 * static two-tone linear gradient** (primary→accent ramp tints fading into
 * `surface`) via the shared `expo-linear-gradient` wrapper — the same real-
 * gradient approach `GenerativeCover` uses. The web `variant`/`grain`/`pattern`
 * props are aurora/DOM-specific and are therefore dropped. Token-only.
 */
function GradientHero({ eyebrow, title, subtitle, actions, media, align = 'center', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const centered = align === 'center';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: colors.surface,
                borderRadius: tokens.radius.lg,
                paddingVertical: tokens.spacing['2xl'],
                paddingHorizontal: tokens.spacing.lg,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(Gradient_1.Gradient, { colors: [
                    (0, color_1.withAlpha)(colors.primary, 0.2),
                    (0, color_1.withAlpha)(colors.accent, 0.14),
                    colors.surface,
                ], start: { x: 0, y: 0 }, end: { x: 1, y: 1 }, style: react_native_1.StyleSheet.absoluteFillObject }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    gap: tokens.spacing.lg,
                    alignItems: centered ? 'center' : 'flex-start',
                }, children: [eyebrow !== undefined && eyebrow !== null ? (typeof eyebrow === 'string' ? ((0, jsx_runtime_1.jsx)(Eyebrow_1.Eyebrow, { tone: "primary", align: centered ? 'center' : 'start', children: eyebrow })) : (eyebrow)) : null, typeof title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale['3xl'],
                            fontWeight: '700',
                            textAlign: centered ? 'center' : 'left',
                        }, children: title })) : (title), subtitle !== undefined && subtitle !== null ? (typeof subtitle === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.muted,
                            fontSize: tokens.typography.scale.lg,
                            textAlign: centered ? 'center' : 'left',
                        }, children: subtitle })) : (subtitle)) : null, actions !== undefined && actions !== null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: tokens.spacing.sm,
                            justifyContent: centered ? 'center' : 'flex-start',
                        }, children: actions })) : null, media !== undefined && media !== null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.xl, width: '100%' }, children: media })) : null] })] }));
}
//# sourceMappingURL=GradientHero.js.map