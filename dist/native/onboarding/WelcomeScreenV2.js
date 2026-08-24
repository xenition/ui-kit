"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomeScreenV2 = WelcomeScreenV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const GetStartedButton_1 = require("./GetStartedButton");
const motion_1 = require("../primitives/internal/motion");
const color_1 = require("../primitives/internal/color");
/**
 * First-launch welcome — V2. A full-screen, immersive hero: a stack of
 * primary-tinted scrim layers stands in for a brand gradient (React Native has
 * no gradient primitive, so translucency is derived from a token via
 * {@link withAlpha}), a brand medallion floats center-high, and the headline,
 * value line and CTA sit anchored toward the bottom. Same props as
 * {@link WelcomeScreen}. Token-pure.
 */
function WelcomeScreenV2({ title, subtitle, logoGlyph, primaryLabel = 'Get started', onGetStarted, secondaryLabel, onSecondary, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 14 });
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flex: 1, backgroundColor: colors.surface }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: { ...StyleSheetAbsolute, backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.14) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: { ...StyleSheetAbsolute, top: '45%', backgroundColor: (0, color_1.withAlpha)(colors.accent, 0.12) } }), (0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: {
                    flex: 1,
                    padding: tokens.spacing.xl,
                    justifyContent: 'flex-end',
                    gap: tokens.spacing.lg,
                    opacity: enter.opacity,
                    transform: enter.transform,
                }, children: [logoGlyph ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 88,
                            height: 88,
                            borderRadius: tokens.radius.full,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: colors.primary,
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: logoGlyph, size: "3xl", color: "onPrimary" }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }, children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.muted,
                            fontSize: tokens.typography.scale.lg,
                            lineHeight: tokens.typography.scale.lg * 1.5,
                        }, children: subtitle })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignSelf: 'stretch', gap: tokens.spacing.md, marginTop: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: primaryLabel, onPress: onGetStarted, loading: loading }), secondaryLabel && onSecondary ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: secondaryLabel, onPress: onSecondary, style: { alignItems: 'center', paddingVertical: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: secondaryLabel }) })) : null] })] })] }));
}
/** Absolute fill preset (kept local so no StyleSheet import is needed). */
const StyleSheetAbsolute = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 };
//# sourceMappingURL=WelcomeScreenV2.js.map