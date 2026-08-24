"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoilMoistureCard = SoilMoistureCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const charts_1 = require("../charts");
const STATUS_META = {
    dry: { label: 'Dry', color: 'warn', tone: 'warn' },
    optimal: { label: 'Optimal', color: 'success', tone: 'success' },
    wet: { label: 'Saturated', color: 'primary', tone: 'primary' },
};
function deriveStatus(moisture) {
    if (moisture < 30)
        return 'dry';
    if (moisture > 70)
        return 'wet';
    return 'optimal';
}
/**
 * A soil-moisture panel — a titled {@link Card} showing the current percent
 * (colored by band and paired with a text {@link Badge}, never color alone), a
 * fill {@link Progress}, an optional companion soil-temperature reading, and a
 * recent {@link LineChart} trend. The moisture value is clamped to [0,100] and
 * `status` defaults to a threshold-derived band. An empty `trend` simply omits
 * the chart. Token-bound throughout — no literal colors.
 */
function SoilMoistureCard({ moisture, label, status, trend, soilTemp, title = 'Soil moisture', chartHeight = 90, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const pct = typeof moisture === 'number' ? Math.max(0, Math.min(100, moisture)) : undefined;
    const band = status ?? (pct != null ? deriveStatus(pct) : 'optimal');
    const meta = STATUS_META[band];
    const series = Array.isArray(trend) ? trend : [];
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: "outlined", style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDCA7", color: meta.color, size: "base" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: title }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: meta.label })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: 4, marginTop: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[meta.color], fontSize: tokens.typography.scale['3xl'], fontWeight: '700', fontFamily: tokens.typography.fontHeading }, children: pct != null ? `${pct}` : '—' }), pct != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: "%" })) : null, soilTemp != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, marginLeft: tokens.spacing.sm }, children: ["\uD83C\uDF21\uFE0F ", soilTemp] })) : null] }), label != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: 2 }, children: label })) : null, pct != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: pct, tone: meta.tone }) })) : null, series.length > 1 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.md }, children: (0, jsx_runtime_1.jsx)(charts_1.LineChart, { data: series, height: chartHeight, color: meta.color, accessibilityLabel: `${title} trend, ${series.length} samples` }) })) : null] }));
}
//# sourceMappingURL=SoilMoistureCard.js.map