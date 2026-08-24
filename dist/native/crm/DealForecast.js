"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealForecast = DealForecast;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const charts_1 = require("../charts");
const money_1 = require("../commerce/money");
/**
 * Revenue forecast block — a header with the summed pipeline total (and, when a
 * `targetCents` is given, attainment vs quota) over a reused {@link BarChart} of
 * per-period amounts. Values are integer cents formatted via `formatMoney`; the
 * bar heights are relative so the raw cents map straight to the chart. Renders
 * an empty placeholder for a zero-length series. Bar/text colors are theme
 * tokens (`color` is a `SemanticColors` key) — no literals.
 */
function DealForecast({ periods, title = 'Forecast', currency = 'USD', targetCents, color = 'primary', height = 128, emptyLabel = 'No forecast data', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const total = periods.reduce((sum, p) => sum + (Number.isFinite(p.valueCents) ? p.valueCents : 0), 0);
    const attainment = targetCents && targetCents > 0 ? Math.round((total / targetCents) * 100) : undefined;
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { padding: "md", style: [{ gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: title }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }, children: (0, money_1.formatMoney)(total, currency) })] }), attainment != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "vs target" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: {
                                    color: attainment >= 100 ? colors.success : colors.onSurface,
                                    fontSize: tokens.typography.scale.base,
                                    fontWeight: '700',
                                }, children: [attainment, "%"] })] })) : null] }), periods.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingVertical: tokens.spacing.lg, alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel }) })) : ((0, jsx_runtime_1.jsx)(charts_1.BarChart, { data: periods.map((p) => (Number.isFinite(p.valueCents) ? p.valueCents : 0)), labels: periods.map((p) => p.label), color: color, height: height, accessibilityLabel: `Forecast across ${periods.length} periods, total ${(0, money_1.formatMoney)(total, currency)}` }))] }));
}
//# sourceMappingURL=DealForecast.js.map