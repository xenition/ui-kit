"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureGrid = FeatureGrid;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Card_1 = require("../primitives/Card");
/**
 * Responsive grid of feature cards — the native mirror of the web `FeatureGrid`
 * + `FeatureCard`. The web version composes children; native takes a `features`
 * data array (idiomatic for RN lists). Cards wrap via flex `basis` rather than
 * CSS grid breakpoints, and the web hover-lift is dropped (no hover on touch).
 * Token-only.
 */
function FeatureGrid({ features, columns = 2, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const basis = `${100 / columns}%`;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-feature-grid", style: [
            { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.lg },
            style,
        ], children: features.map((f, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexGrow: 1, flexBasis: basis, minWidth: 160 }, children: (0, jsx_runtime_1.jsxs)(Card_1.Card, { style: { flex: 1, gap: tokens.spacing.sm }, children: [f.icon !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            height: 40,
                            width: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: tokens.radius.md,
                            backgroundColor: tokens.ramps.primary[100],
                        }, children: typeof f.icon === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: tokens.ramps.primary[700], fontWeight: '700' }, children: f.icon })) : (f.icon) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.lg,
                            fontWeight: '600',
                        }, children: f.title }), f.description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: f.description })) : null] }) }, i))) }));
}
//# sourceMappingURL=FeatureGrid.js.map