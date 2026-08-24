"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnChart = ColumnChart;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Horizontal bar chart — token-bound, View/flex-based (no SVG). Each row is a
 * label plus a `View` whose width flexes to `value / max`. Track uses `border`,
 * fill uses the chosen theme color.
 */
function ColumnChart({ data, color = 'primary', max, barHeight = 12, showValues = false, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (data.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No data" }));
    }
    const ceiling = Math.max(max ?? Math.max(...data.map((d) => d.value)), 1);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: accessibilityLabel ?? `Bar chart, ${data.length} bars, max ${ceiling}`, style: [{ gap: tokens.spacing.sm }, style], children: data.map((d, i) => {
            const ratio = Math.min(Math.max(d.value / ceiling, 0), 1);
            return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, flex: 1 }, children: d.label }), showValues ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: d.value })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            height: barHeight,
                            backgroundColor: colors.border,
                            borderRadius: tokens.radius.full,
                            overflow: 'hidden',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: `${ratio * 100}%`,
                                height: '100%',
                                backgroundColor: colors[color],
                                borderRadius: tokens.radius.full,
                            } }) })] }, i));
        }) }));
}
//# sourceMappingURL=ColumnChart.js.map