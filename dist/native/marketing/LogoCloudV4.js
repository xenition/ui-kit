"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoCloudV4 = LogoCloudV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * LogoCloud — **V4** "showcase" design (native mirror of the web V4). A tidy,
 * refined logo strip: an optional muted "Trusted by…" `label` above a soft,
 * evenly-spaced wrapped row of `logos` in a muted tone (string logos render as
 * muted text; nodes render as-is). Native has no hover and no CSS marquee, so
 * the web's optional drift degrades to a calm static strip — the same visual
 * resting state the reduced-motion web path shows. NOT a brand-gradient
 * surface — clean and understated. Same props/behavior as
 * {@link LogoCloudProps}; token-only colors via `useXenitionTheme()`
 * (`colors.muted`), dark-mode safe.
 */
function LogoCloudV4({ logos, label, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-logo-cloud", style: [{ alignItems: 'center', gap: tokens.spacing.lg }, style], children: [label !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: 3,
                }, children: label })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: tokens.spacing.xl,
                }, children: logos.map((logo, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-logo", style: { opacity: 0.7 }, children: typeof logo === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.muted,
                            fontSize: tokens.typography.scale.lg,
                            fontWeight: '600',
                        }, children: logo })) : (logo) }, i))) })] }));
}
//# sourceMappingURL=LogoCloudV4.js.map