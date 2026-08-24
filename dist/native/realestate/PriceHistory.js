"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceHistory = PriceHistory;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const Sparkline_1 = require("../charts/Sparkline");
/**
 * A listing's price-over-time card — the latest price, the net change from the
 * first point (tinted `success` up / `danger` down / `muted` flat), and a
 * token-bound {@link Sparkline} of the trend. Presentational: cents in, nothing
 * fetches. Guards empty input with a muted note and never indexes an empty
 * array. Token-only colors.
 */
function PriceHistory({ points, currency = 'USD', title = 'Price history', chartHeight = 48, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const card = (children) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: title }), children] }));
    if (points.length === 0) {
        return card((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No price history" }));
    }
    const first = points[0];
    const last = points[points.length - 1];
    const delta = last.cents - first.cents;
    const trendColor = delta > 0 ? colors.success : delta < 0 ? colors.danger : colors.muted;
    const arrow = delta > 0 ? '▲' : delta < 0 ? '▼' : '→';
    const pct = first.cents !== 0 ? Math.round((delta / first.cents) * 100) : 0;
    const sparkColor = delta >= 0 ? 'success' : 'danger';
    return card((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: (0, primitives_1.formatMoney)(last.cents, currency) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: trendColor, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: `${arrow} ${Math.abs(pct)}%` })] }), (0, jsx_runtime_1.jsx)(Sparkline_1.Sparkline, { data: points.map((p) => p.cents), height: chartHeight, color: sparkColor, accessibilityLabel: `Price history sparkline, ${points.length} points, ${delta >= 0 ? 'up' : 'down'} ${Math.abs(pct)} percent` }), last.label || first.label ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: first.label ?? '' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: last.label ?? '' })] })) : null] }));
}
//# sourceMappingURL=PriceHistory.js.map