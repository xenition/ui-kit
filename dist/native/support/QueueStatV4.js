"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueStatV4 = QueueStatV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Card_1 = require("../primitives/Card");
const internal_1 = require("./internal");
const TONE_SLOT = {
    neutral: 'muted',
    primary: 'primary',
    success: 'success',
    warn: 'warn',
    danger: 'danger',
};
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
 * QueueStat — **V4** "calm console" design. A clean KPI tile: a muted caption, a
 * **big** value numeral (`scale['3xl']`, weight 800), an optional unit suffix,
 * and an optional delta indicator colored by tone (up→success / down→danger /
 * flat→muted, per the base) with a matching glyph. An optional leading glyph
 * sits in a soft-tint chip whose tone follows the base's `tone` mapping. Same
 * props/behavior as {@link QueueStatProps}; token-only colors via
 * `useXenitionTheme()` + `withAlpha` (no literal hex). Supports a `loading`
 * placeholder and an optional card surface.
 */
function QueueStatV4({ label, value, delta, trend, suffix, tone = 'neutral', glyph, loading = false, card = true, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const accent = colors[TONE_SLOT[tone] ?? 'muted'];
    const resolvedTrend = trend ?? inferTrend(delta);
    const trendColor = resolvedTrend === 'up' ? colors.success : resolvedTrend === 'down' ? colors.danger : colors.muted;
    const arrow = resolvedTrend === 'up' ? '▲' : resolvedTrend === 'down' ? '▼' : '→';
    const inner = loading ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading metric", style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, width: '50%', borderRadius: 4, backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.1) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 32, width: '35%', borderRadius: 4, backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.12) } })] })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [glyph ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 48,
                    height: 48,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, internal_1.withAlpha)(accent, 0.14),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale.xl }, children: glyph }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: label }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [typeof value === 'string' || typeof value === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }, children: value })) : (value), suffix != null ? (typeof suffix === 'string' || typeof suffix === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base, marginBottom: tokens.spacing.xs }, children: suffix })) : (suffix)) : null] }), delta != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: trendColor, fontSize: tokens.typography.scale.xs }, children: arrow }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: trendColor, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: String(delta) })] })) : null] })] }));
    if (!card) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: `${label}: ${String(value)}`, style: style, children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)(Card_1.Card, { variant: "elevated", padding: "md", radius: "lg", accessibilityLabel: `${label}: ${String(value)}`, style: style, children: inner }));
}
//# sourceMappingURL=QueueStatV4.js.map