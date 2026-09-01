"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumptionChartV4 = ConsumptionChartV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const charts_1 = require("../charts");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
const GradientSurface_1 = require("./internal/GradientSurface");
const brand_1 = require("./internal/brand");
/**
 * ConsumptionChart — **V4** design. An elevated card that **reuses** the same
 * token-bound `BarChart` / `LineChart` primitives (same data, same series color)
 * rather than drawing its own geometry. A refined header pairs the kind glyph in
 * the signature brand-gradient disc with a derived period total (via
 * `formatUsage`, so it never renders `NaN`) and a small legend. Preserves the
 * loading skeleton and the empty state. Same props as
 * {@link ConsumptionChartProps}; token-only colors.
 */
function ConsumptionChartV4({ kind, data, variant = 'bar', unit, decimals = 0, title, height = 140, loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const kd = (0, status_1.utilityKind)(kind);
    const u = unit ?? kd.unit;
    const points = Array.isArray(data) ? data : [];
    const heading = title ?? `${kd.label} usage`;
    const card = {
        backgroundColor: colors.card,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.1,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [card, style], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading usage chart", style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            height: tokens.typography.scale.base,
                            width: '50%',
                            borderRadius: tokens.radius.sm,
                            backgroundColor: colors.border,
                        } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height, borderRadius: tokens.radius.md, backgroundColor: colors.border } })] }) }));
    }
    const values = points.map((p) => (Number.isFinite(p.value) ? Math.max(0, p.value) : 0));
    const labels = points.map((p) => p.label);
    const total = values.reduce((sum, v) => sum + v, 0);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [card, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: tokens.spacing.md,
                    gap: tokens.spacing.md,
                }, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, brand_1.brandDisc)(r), style: { width: 44, height: 44, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: kd.glyph, size: "lg", accessibilityLabel: `${kd.label} usage`, style: { color: (0, brand_1.brandInk)(r) } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: heading }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: ["Total ", (0, format_1.formatUsage)(total, u, decimals)] })] })] }) }), points.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.sm }, children: "No usage recorded yet." })) : variant === 'line' ? ((0, jsx_runtime_1.jsx)(charts_1.LineChart, { data: values.map((y, i) => ({ x: i, y })), height: height, color: "primary", accessibilityLabel: `${heading} line chart, ${points.length} periods, total ${(0, format_1.formatUsage)(total, u, decimals)}` })) : ((0, jsx_runtime_1.jsx)(charts_1.BarChart, { data: values, labels: labels, height: height, color: "primary", accessibilityLabel: `${heading} bar chart, ${points.length} periods, total ${(0, format_1.formatUsage)(total, u, decimals)}` })), points.length > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, marginTop: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 10, height: 10, borderRadius: tokens.radius.full, backgroundColor: colors.primary } }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: [kd.label, " usage (", u, ")"] })] })) : null] }));
}
//# sourceMappingURL=ConsumptionChartV4.js.map