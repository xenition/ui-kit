"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrowthChart = GrowthChart;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const charts_1 = require("../charts");
const METRIC_META = {
    height: { glyph: '📏', label: 'Height' },
    weight: { glyph: '⚖️', label: 'Weight' },
    head: { glyph: '🧢', label: 'Head circumference' },
    other: { glyph: '📈', label: 'Growth' },
};
/**
 * A child's growth curve — a titled card wrapping the shared `LineChart` with a
 * latest-value + percentile readout. Reuses the charts module rather than
 * re-plotting. Renders an explicit empty state when `data` is empty. All colors
 * are `SemanticColors` tokens — no literals.
 */
function GrowthChart({ data, metric = 'height', unit, percentile, color = 'primary', height = 160, loading = false, emptyLabel = 'No measurements logged yet', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = METRIC_META[metric] ?? METRIC_META.other;
    const container = [
        {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            gap: tokens.spacing.md,
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading growth chart", style: container, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height, width: '100%', borderRadius: tokens.radius.md, backgroundColor: colors.border } })] }));
    }
    const latest = data.length > 0 ? data[data.length - 1] : undefined;
    if (data.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: emptyLabel, style: container, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: [meta.glyph, " ", meta.label] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', paddingVertical: tokens.spacing.lg, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['2xl'] }, children: "\uD83D\uDCC9" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel })] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${meta.label} growth${latest !== undefined ? `, latest ${latest}${unit ? ` ${unit}` : ''}` : ''}${percentile ? `, ${percentile}` : ''}`, style: container, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: [meta.glyph, " ", meta.label] }), latest !== undefined ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: [latest, unit ? ` ${unit}` : ''] })) : null] }), percentile ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: percentile })) : null, (0, jsx_runtime_1.jsx)(charts_1.LineChart, { data: data, color: color, height: height, showDots: true, accessibilityLabel: `${meta.label} over time` })] }));
}
//# sourceMappingURL=GrowthChart.js.map