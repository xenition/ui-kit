"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CTABannerV4 = CTABannerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Gradient_1 = require("../commerce/internal/Gradient");
/**
 * CTABanner — **V4** "showcase" design (native mirror of the web V4). The bold,
 * conversion-forward closing band: a vibrant primary→accent brand gradient
 * ground (via the shared `expo-linear-gradient` wrapper) carrying a big
 * extra-bold near-white headline, a soft supporting line, and a centered
 * call-to-action. Same props/behavior as {@link CTABannerProps}; token-only
 * colors via `useXenitionTheme()` (`tokens.ramps.primary` near-white ink on the
 * saturated ground), dark-mode safe.
 */
function CTABannerV4({ title, description, subtitle, action, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const body = description ?? subtitle;
    const ink = r.primary[50];
    const inkSoft = r.primary[100];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                position: 'relative',
                overflow: 'hidden',
                borderRadius: tokens.radius.lg,
                paddingVertical: tokens.spacing['2xl'],
                paddingHorizontal: tokens.spacing.xl,
                backgroundColor: r.primary[600],
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(Gradient_1.Gradient, { colors: [r.primary[500], r.primary[600], r.accent[500]], start: { x: 0, y: 0 }, end: { x: 1, y: 1 }, style: react_native_1.StyleSheet.absoluteFillObject }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.md, alignItems: 'center' }, children: [typeof title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale['3xl'], fontWeight: '800', letterSpacing: -0.5, textAlign: 'center' }, children: title })) : (title), body !== undefined && body !== null ? (typeof body === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.lg, textAlign: 'center' }, children: body })) : (body)) : null, action !== undefined && action !== null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.sm, flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, justifyContent: 'center' }, children: action })) : null] })] }));
}
//# sourceMappingURL=CTABannerV4.js.map