"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomeScreen = WelcomeScreen;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const GetStartedButton_1 = require("./GetStartedButton");
/**
 * First-launch welcome — a brand medallion, headline, one value line and the
 * primary {@link GetStartedButton}, with an optional "already have an account"
 * secondary link (design.md §42). The `bottomSheet` variant left-aligns for use
 * inside a sheet. Every color/spacing traces to a token. No literal colors.
 */
function WelcomeScreen({ title, subtitle, logoGlyph, primaryLabel = 'Get started', onGetStarted, secondaryLabel, onSecondary, loading = false, variant = 'centered', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const centered = variant === 'centered';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flex: 1,
                padding: tokens.spacing.xl,
                justifyContent: 'center',
                alignItems: centered ? 'center' : 'flex-start',
                gap: tokens.spacing.lg,
                backgroundColor: colors.surface,
            },
            style,
        ], children: [logoGlyph ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 80,
                    height: 80,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.primary,
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: logoGlyph, size: "2xl", color: "onPrimary" }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale['3xl'],
                    fontWeight: '700',
                    textAlign: centered ? 'center' : 'left',
                }, children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.lg,
                    textAlign: centered ? 'center' : 'left',
                    lineHeight: tokens.typography.scale.lg * 1.5,
                }, children: subtitle })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignSelf: 'stretch', gap: tokens.spacing.md, marginTop: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: primaryLabel, onPress: onGetStarted, loading: loading }), secondaryLabel && onSecondary ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: secondaryLabel, onPress: onSecondary, style: { alignItems: 'center', paddingVertical: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: secondaryLabel }) })) : null] })] }));
}
//# sourceMappingURL=WelcomeScreen.js.map