"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumptionChart = ConsumptionChart;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const charts_1 = require("../charts");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/**
 * A consumption-over-time chart card that **reuses** the token-bound `BarChart` /
 * `LineChart` primitives rather than drawing its own geometry. It derives the
 * period total from the data (via `formatUsage`, so it never renders `NaN`),
 * renders an accessible summary, and degrades to an inline empty message when
 * there are no points (guarded indexing throughout). Every color traces to a
 * token — the charts express series via theme color keys, never a literal.
 */
function ConsumptionChart({ kind, data, variant = 'bar', unit, decimals = 0, title, height = 140, loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const kd = (0, status_1.utilityKind)(kind);
    const u = unit ?? kd.unit;
    const points = Array.isArray(data) ? data : [];
    const heading = title ?? `${kd.label} usage`;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(primitives_2.Card, { style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading usage chart", style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            height: tokens.typography.scale.base,
                            width: '50%',
                            borderRadius: tokens.radius.sm,
                            backgroundColor: colors.border,
                        } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height, borderRadius: tokens.radius.md, backgroundColor: colors.border } })] }) }));
    }
    const values = points.map((p) => (Number.isFinite(p.value) ? Math.max(0, p.value) : 0));
    const labels = points.map((p) => p.label);
    const total = values.reduce((sum, v) => sum + v, 0);
    return ((0, jsx_runtime_1.jsxs)(primitives_2.Card, { style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    marginBottom: tokens.spacing.md,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: heading }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Total ", (0, format_1.formatUsage)(total, u, decimals)] })] }), points.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No usage recorded yet." })) : variant === 'line' ? ((0, jsx_runtime_1.jsx)(charts_1.LineChart, { data: values.map((y, i) => ({ x: i, y })), height: height, color: "primary", accessibilityLabel: `${heading} line chart, ${points.length} periods, total ${(0, format_1.formatUsage)(total, u, decimals)}` })) : ((0, jsx_runtime_1.jsx)(charts_1.BarChart, { data: values, labels: labels, height: height, color: "primary", accessibilityLabel: `${heading} bar chart, ${points.length} periods, total ${(0, format_1.formatUsage)(total, u, decimals)}` }))] }));
}
//# sourceMappingURL=ConsumptionChart.js.map