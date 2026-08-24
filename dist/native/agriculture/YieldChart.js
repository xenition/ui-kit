"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YieldChart = YieldChart;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const charts_1 = require("../charts");
/**
 * A yield visualization — a titled {@link Card} that reuses the shared
 * {@link BarChart} (`variant='bars'`) or {@link LineChart} (`variant='line'`);
 * no new chart code. The header carries an optional `headline` + `unit`. An
 * empty `data` array renders a muted "No yield data yet" note instead of an
 * axis. Series color keys off a `SemanticColors` slot. Token-bound throughout —
 * no literal colors.
 */
function YieldChart({ data, labels, title = 'Yield', headline, unit, variant = 'bars', color = 'success', height = 140, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const series = Array.isArray(data) ? data : [];
    const hasData = series.length > 0;
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: "outlined", style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDCC8", color: color, size: "base" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: title })] }), headline != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: 4, marginTop: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700', fontFamily: tokens.typography.fontHeading }, children: headline }), unit != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: unit })) : null] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.md }, children: hasData ? (variant === 'line' ? ((0, jsx_runtime_1.jsx)(charts_1.LineChart, { data: series, height: height, color: color, showDots: true, accessibilityLabel: `${title}, ${series.length} periods` })) : ((0, jsx_runtime_1.jsx)(charts_1.BarChart, { data: series, labels: labels, height: height, color: color, accessibilityLabel: `${title}, ${series.length} periods` }))) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No yield data yet" })) })] }));
}
//# sourceMappingURL=YieldChart.js.map