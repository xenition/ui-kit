"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Statistic = Statistic;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
function inferTrend(delta) {
    if (typeof delta === 'number') {
        if (delta > 0)
            return 'up';
        if (delta < 0)
            return 'down';
    }
    return 'flat';
}
/**
 * Compact inline metric: caption label, a large token-scaled value, and an
 * optional up/down/flat delta. Not a card — it renders bare so it can sit in
 * rows, headers, or grids. Delta tone maps to `colors.success` / `colors.danger`
 * / `colors.muted`. All colors and sizes come from the compiled theme tokens
 * via `useXenitionTheme()` — no literal colors.
 */
function Statistic({ label, value, delta, trend, suffix, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const resolvedTrend = trend ?? inferTrend(delta);
    const trendColor = resolvedTrend === 'up' ? colors.success : resolvedTrend === 'down' ? colors.danger : colors.muted;
    const arrow = resolvedTrend === 'up' ? '▲' : resolvedTrend === 'down' ? '▼' : '→';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", style: style, children: [typeof label === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: label })) : (label), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [typeof value === 'string' || typeof value === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '700' }, children: value })) : (value), suffix != null ? (typeof suffix === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.muted,
                            fontSize: tokens.typography.scale.base,
                            marginBottom: tokens.spacing.xs,
                        }, children: suffix })) : (suffix)) : null] }), delta != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: trendColor, fontSize: tokens.typography.scale.xs }, children: arrow }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: trendColor, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: String(delta) })] })) : null] }));
}
//# sourceMappingURL=Statistic.js.map