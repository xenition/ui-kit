"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnergyUsageV4 = EnergyUsageV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const charts_1 = require("../charts");
/**
 * Trend of a usage series — compares the first vs last samples. For **usage**,
 * rising is bad: `up`→danger, `down`→success, `flat`→muted. The meaning is
 * always carried by an arrow glyph + label, never color alone.
 */
function usageTrend(data) {
    if (data.length < 2)
        return null;
    const first = data[0];
    const last = data[data.length - 1];
    if (last > first)
        return { glyph: '↑', label: 'Up', color: 'danger' };
    if (last < first)
        return { glyph: '↓', label: 'Down', color: 'success' };
    return { glyph: '→', label: 'Flat', color: 'muted' };
}
/**
 * EnergyUsage — **V4** "ambient" design. The calm take on an energy panel: a
 * **big kWh/cost numeral** leads, a **trend indicator** reads the series
 * (rising usage → danger, falling → success, by arrow + label so it is legible
 * without color), a soft breakdown {@link BarChart} keeps the base's per-period
 * data, and the `title` sits as the period caption. When `data` is empty the
 * card shows a muted "No usage data yet" line instead of an axis. Same
 * props/behavior as {@link EnergyUsageProps}; token-only colors via
 * `useXenitionTheme()` + `withAlpha`.
 */
function EnergyUsageV4({ data, labels, title = 'Energy usage', total, unit, color = 'primary', height = 120, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const hasData = data.length > 0;
    const trend = usageTrend(data);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
                padding: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 44,
                            height: 44,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.12),
                            borderWidth: 1,
                            borderColor: (0, color_1.withAlpha)(colors.primary, 0.4),
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u26A1", color: "primary", size: "lg" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [total != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: 4 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                            color: colors.onSurface,
                                            fontSize: tokens.typography.scale['3xl'],
                                            fontWeight: '800',
                                            fontFamily: tokens.typography.fontHeading,
                                        }, children: String(total) }), unit != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: unit })) : null] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: tokens.spacing.xs }, children: title })] }), trend != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { accessibilityLabel: `Trend ${trend.label}`, style: { color: colors[trend.color], fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: [trend.glyph, " ", trend.label] })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.md }, children: hasData ? ((0, jsx_runtime_1.jsx)(charts_1.BarChart, { data: data, labels: labels, height: height, color: color, accessibilityLabel: `${title}, ${data.length} periods` })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No usage data yet" })) })] }));
}
//# sourceMappingURL=EnergyUsageV4.js.map