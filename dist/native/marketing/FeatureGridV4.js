"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureGridV4 = FeatureGridV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
/**
 * FeatureCard — **V4** "showcase" design (native mirror of the web V4). One
 * `FeatureItem` as an elevated rounded card: an icon in a soft-primary well, an
 * extra-bold tight-tracked title, and muted body copy. NOT a gradient surface —
 * a clean elevated card on the page ground. Token-only colors, no literals.
 */
function FeatureCardV4({ item }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flex: 1,
            gap: tokens.spacing.sm,
            padding: tokens.spacing.lg,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.06,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 2,
        }, children: [item.icon !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: tokens.radius.md,
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                }, children: typeof item.icon === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontWeight: '700' }, children: item.icon })) : (item.icon) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.lg,
                    fontWeight: '800',
                    letterSpacing: -0.3,
                }, children: item.title }), item.description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, lineHeight: tokens.typography.scale.sm * 1.5 }, children: item.description })) : null] }));
}
/**
 * FeatureGrid — **V4** "showcase" design (native mirror of the web V4). A
 * content section: a wrapping grid of elevated `FeatureCardV4`s. Mirrors the web
 * V4; native takes the base's `features` data array and wraps via flex `basis`
 * rather than CSS breakpoints (`columns` sets the row width, default 2 for
 * phones), and hover-lift is dropped (no hover on touch). Same props/behavior as
 * {@link FeatureGridProps}. Token-only colors, no literals.
 */
function FeatureGridV4({ features, columns = 2, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const basis = `${100 / columns}%`;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-feature-grid", style: [{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.lg }, style], children: features.map((f, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexGrow: 1, flexBasis: basis, minWidth: 160 }, children: (0, jsx_runtime_1.jsx)(FeatureCardV4, { item: f }) }, i))) }));
}
//# sourceMappingURL=FeatureGridV4.js.map