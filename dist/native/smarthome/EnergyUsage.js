"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnergyUsage = EnergyUsage;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const charts_1 = require("../charts");
/**
 * Energy-usage panel — a titled {@link Card} wrapping the shared View-based
 * {@link BarChart} (no new chart code). The header shows the period total + unit;
 * the chart renders each sample as a `color`-slot bar. When `data` is empty the
 * card shows a muted "No usage data yet" line instead of an axis. `labels` are
 * passed straight through (BarChart aligns them per bar). Token-bound throughout.
 */
function EnergyUsage({ data, labels, title = 'Energy usage', total, unit, color = 'primary', height = 120, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const hasData = data.length > 0;
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: "outlined", style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u26A1", color: color, size: "base" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: title })] }), total != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: 4, marginTop: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700', fontFamily: tokens.typography.fontHeading }, children: String(total) }), unit != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: unit })) : null] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.md }, children: hasData ? ((0, jsx_runtime_1.jsx)(charts_1.BarChart, { data: data, labels: labels, height: height, color: color, accessibilityLabel: `${title}, ${data.length} periods` })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No usage data yet" })) })] }));
}
//# sourceMappingURL=EnergyUsage.js.map