"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomeScreenV3 = WelcomeScreenV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const GetStartedButton_1 = require("./GetStartedButton");
const elevation_1 = require("../primitives/internal/elevation");
const color_1 = require("../primitives/internal/color");
/**
 * First-launch welcome — V3. A split composition: the top half is an art panel
 * (tinted stage + brand medallion), the bottom half is an elevated CTA card that
 * overlaps the seam and stacks the headline, value line and primary action. Same
 * props as {@link WelcomeScreen}. Token-pure.
 */
function WelcomeScreenV3({ title, subtitle, logoGlyph, primaryLabel = 'Get started', onGetStarted, secondaryLabel, onSecondary, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flex: 1, backgroundColor: colors.surface }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.12),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: 96,
                        height: 96,
                        borderRadius: tokens.radius.full,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: colors.primary,
                    }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: logoGlyph ?? '✦', size: "3xl", color: "onPrimary" }) }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: -tokens.spacing.xl,
                    padding: tokens.spacing.xl,
                    gap: tokens.spacing.md,
                    backgroundColor: colors.surface,
                    borderTopLeftRadius: tokens.radius.lg,
                    borderTopRightRadius: tokens.radius.lg,
                    ...(0, elevation_1.shadow)('lg', tokens),
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.muted,
                            fontSize: tokens.typography.scale.base,
                            lineHeight: tokens.typography.scale.base * 1.5,
                        }, children: subtitle })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.md, marginTop: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: primaryLabel, onPress: onGetStarted, loading: loading }), secondaryLabel && onSecondary ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: secondaryLabel, onPress: onSecondary, style: { alignItems: 'center', paddingVertical: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: secondaryLabel }) })) : null] })] })] }));
}
//# sourceMappingURL=WelcomeScreenV3.js.map