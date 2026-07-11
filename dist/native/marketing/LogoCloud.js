"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoCloud = LogoCloud;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Row of partner/customer logos — the native mirror of the web `LogoCloud`. The
 * web version dims/desaturates until hover; native has no hover, so each slot is
 * rendered at a fixed reduced opacity (simplification). String logos render as
 * muted text; node logos are rendered as-is. Token-only.
 */
function LogoCloud({ logos, label, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-logo-cloud", style: [{ alignItems: 'center', gap: tokens.spacing.md }, style], children: [label !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: 3,
                }, children: label })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: tokens.spacing.xl,
                }, children: logos.map((logo, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-logo", style: { opacity: 0.6 }, children: typeof logo === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.lg,
                            fontWeight: '600',
                        }, children: logo })) : (logo) }, i))) })] }));
}
//# sourceMappingURL=LogoCloud.js.map