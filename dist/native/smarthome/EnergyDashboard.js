"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnergyDashboard = EnergyDashboard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const GradientSurface_1 = require("./internal/GradientSurface");
const ambient_1 = require("./internal/ambient");
/** Token opacity per tone, applied to the near-white ink — keeps the bar on the brand ramp. */
const TONE_ALPHA = {
    primary: 1,
    accent: 0.7,
    warn: 0.45,
    success: 0.25,
};
/**
 * EnergyDashboard — a whole-home energy **hero** for the smart-home module. A
 * brand-gradient ground carries the big near-white usage numeral, a cost +
 * period line, a delta chip (for energy, up = worse, so a rise reads as a
 * warning arrow), an optional solar line, and an optional stacked usage bar with
 * a frosted legend. The bar is one gradient-safe run of the near-white ink at
 * token opacities — every color derives from the compiled brand ramp via
 * `ambient*` + `withAlpha` + `GradientSurface` — token-only, no literals, light +
 * dark. Presentational: shaped data, nothing fetches.
 */
function EnergyDashboard({ usageLabel, costLabel, period = 'Today', deltaPct, solarLabel, breakdown, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, ambient_1.ambientInk)(r);
    const inkSoft = (0, ambient_1.ambientInkSoft)(r);
    const tile = (0, ambient_1.ambientTile)(r);
    const border = (0, ambient_1.ambientBorder)(r);
    const hasDelta = typeof deltaPct === 'number' && Number.isFinite(deltaPct);
    const worse = hasDelta && deltaPct > 0;
    const total = (breakdown ?? []).reduce((sum, b) => sum + Math.max(0, b.value), 0);
    const slices = breakdown ?? [];
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, ambient_1.ambientGradient)(r), style: { borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: `${period} usage` }), hasDelta ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `${Math.abs(deltaPct)} percent ${worse ? 'more' : 'less'} than the previous period`, style: {
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: tokens.spacing.xs,
                                paddingHorizontal: tokens.spacing.md,
                                paddingVertical: tokens.spacing.xs,
                                borderRadius: tokens.radius.full,
                                backgroundColor: tile,
                                borderWidth: 1,
                                borderColor: border,
                            }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: worse ? '▲' : '▼', size: "xs", style: { color: ink } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: `${Math.abs(deltaPct)}%` })] })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: ink, fontSize: tokens.typography.scale['3xl'], fontWeight: '800', letterSpacing: -0.5, marginTop: tokens.spacing.xs }, children: usageLabel }), costLabel || solarLabel ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }, children: [costLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: costLabel })) : null, solarLabel ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: tokens.spacing.xs,
                                paddingHorizontal: tokens.spacing.sm,
                                paddingVertical: tokens.spacing.xs,
                                borderRadius: tokens.radius.full,
                                backgroundColor: tile,
                                borderWidth: 1,
                                borderColor: border,
                            }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2600\uFE0F", size: "xs", style: { color: ink } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: solarLabel })] })) : null] })) : null, slices.length > 0 && total > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: "Usage breakdown", style: {
                                flexDirection: 'row',
                                height: 12,
                                width: '100%',
                                overflow: 'hidden',
                                borderRadius: tokens.radius.full,
                                backgroundColor: tile,
                                borderWidth: 1,
                                borderColor: border,
                            }, children: slices.map((b) => {
                                const frac = Math.max(0, b.value) / total;
                                if (frac <= 0)
                                    return null;
                                return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: '100%', flexGrow: frac, backgroundColor: (0, color_1.withAlpha)(ink, TONE_ALPHA[b.tone ?? 'primary']) } }, b.label));
                            }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, marginTop: tokens.spacing.sm }, children: slices.map((b) => {
                                const pct = Math.round((Math.max(0, b.value) / total) * 100);
                                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: tokens.spacing.xs,
                                        paddingHorizontal: tokens.spacing.sm,
                                        paddingVertical: tokens.spacing.xs,
                                        borderRadius: tokens.radius.md,
                                        backgroundColor: tile,
                                        borderWidth: 1,
                                        borderColor: border,
                                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 10, height: 10, borderRadius: tokens.radius.full, backgroundColor: (0, color_1.withAlpha)(ink, TONE_ALPHA[b.tone ?? 'primary']) } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: b.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs }, children: `${pct}%` })] }, b.label));
                            }) })] })) : null] }) }));
}
//# sourceMappingURL=EnergyDashboard.js.map