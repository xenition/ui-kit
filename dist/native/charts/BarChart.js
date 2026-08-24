"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarChart = BarChart;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Vertical bar chart — token-bound, View/flex-based (no SVG). Each datum is a
 * `View` whose height is `(value / max) * height`. A `muted` baseline stands in
 * for the axis; labels use `onSurface`.
 */
function BarChart({ data, labels, height = 120, color = 'primary', max, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (data.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No data" }));
    }
    const ceiling = Math.max(max ?? Math.max(...data), 1);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: accessibilityLabel ?? `Bar chart, ${data.length} bars, max ${ceiling}`, style: style, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    height,
                    gap: tokens.spacing.xs,
                }, children: data.map((value, i) => {
                    const ratio = Math.min(Math.max(value / ceiling, 0), 1);
                    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            flex: 1,
                            height: Math.max(ratio * height, 1),
                            backgroundColor: colors[color],
                            borderTopLeftRadius: tokens.radius.sm,
                            borderTopRightRadius: tokens.radius.sm,
                        } }, i));
                }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 1, backgroundColor: colors.muted, marginTop: tokens.spacing.xs } }), labels ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }, children: labels.map((label, i) => ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                        flex: 1,
                        textAlign: 'center',
                        color: colors.onSurface,
                        fontSize: tokens.typography.scale.xs,
                    }, children: label }, i))) })) : null] }));
}
//# sourceMappingURL=BarChart.js.map