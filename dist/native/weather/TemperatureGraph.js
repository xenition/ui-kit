"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemperatureGraph = TemperatureGraph;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Card_1 = require("../primitives/Card");
const LineChart_1 = require("../charts/LineChart");
/**
 * Temperature trend graph — a thin wrapper over the shared `LineChart` that adds
 * a titled card, min/max annotations, and optional x-axis labels. The line color
 * is a semantic token key (default `primary`); the chart itself is token-bound
 * and handles the empty/flat/single-point cases. Renders a muted empty state
 * when `data` is empty. All colors/sizes come from the compiled theme tokens via
 * `useXenitionTheme()` — no literal colors.
 */
function TemperatureGraph({ data, labels, unit = '°', title = 'Temperature', color = 'primary', height = 160, width = 300, emptyLabel = 'No temperature data', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (data.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { variant: "outlined", style: style, accessibilityRole: "summary", children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: colors.muted,
                        fontSize: tokens.typography.scale.sm,
                        marginTop: tokens.spacing.sm,
                    }, children: emptyLabel })] }));
    }
    const min = Math.min(...data);
    const max = Math.max(...data);
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { variant: "outlined", style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["H ", max, unit, " \u00B7 L ", min, unit] })] }), (0, jsx_runtime_1.jsx)(LineChart_1.LineChart, { data: data, color: color, height: height, width: width, showDots: true, accessibilityLabel: `Temperature graph, high ${max}${unit}, low ${min}${unit}, ${data.length} points` }), labels && labels.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', marginTop: tokens.spacing.xs }, children: labels.map((label, index) => ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: label }, `${label}-${index}`))) })) : null] }));
}
//# sourceMappingURL=TemperatureGraph.js.map