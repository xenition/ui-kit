"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CTABanner = CTABanner;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const Gradient_1 = require("../commerce/internal/Gradient");
/**
 * Closing call-to-action band — the native mirror of the web `CTABanner`.
 *
 * The web version reuses the animated `AuroraBackground`; native **simplifies
 * to a static primary→accent linear-gradient tint** (via the shared
 * `expo-linear-gradient` wrapper) over a bordered rounded panel — no blur,
 * grain, or pattern. The web `variant`/`grain`/`pattern` props are dropped as
 * aurora/DOM-specific. Always centered, matching the web layout. Token-only.
 */
function CTABanner({ title, description, subtitle, action, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const body = description ?? subtitle;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.lg,
                paddingVertical: tokens.spacing['2xl'],
                paddingHorizontal: tokens.spacing.xl,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(Gradient_1.Gradient, { colors: [(0, color_1.withAlpha)(colors.primary, 0.22), (0, color_1.withAlpha)(colors.accent, 0.16)], start: { x: 0, y: 0 }, end: { x: 1, y: 1 }, style: react_native_1.StyleSheet.absoluteFillObject }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.md, alignItems: 'center' }, children: [typeof title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale['3xl'],
                            fontWeight: '700',
                            textAlign: 'center',
                        }, children: title })) : (title), body !== undefined && body !== null ? (typeof body === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.muted,
                            fontSize: tokens.typography.scale.lg,
                            textAlign: 'center',
                        }, children: body })) : (body)) : null, action !== undefined && action !== null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            marginTop: tokens.spacing.sm,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: tokens.spacing.sm,
                            justifyContent: 'center',
                        }, children: action })) : null] })] }));
}
//# sourceMappingURL=CTABanner.js.map