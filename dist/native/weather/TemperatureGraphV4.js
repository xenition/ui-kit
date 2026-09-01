"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemperatureGraphV4 = TemperatureGraphV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const LineChart_1 = require("../charts/LineChart");
const GradientSurface_1 = require("./internal/GradientSurface");
const v4_sky_1 = require("./internal/v4-sky");
/**
 * TemperatureGraph — **sky** design (v4). The shared `LineChart` over a rounded
 * gradient panel, with the title + min/max annotation in near-white ink and
 * x-axis labels in a softer ink — the weather-app "chance of rain" look. The
 * curve defaults to the `accent` token so it reads on the brand ground
 * (overridable via `color`); every color traces to a token, never a literal.
 * Renders a muted note when `data` is empty. Same props as
 * {@link TemperatureGraphProps}.
 */
function TemperatureGraphV4({ data, labels, unit = '°', title = 'Temperature', color = 'accent', height = 160, width = 300, emptyLabel = 'No temperature data', style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, v4_sky_1.skyInk)(r);
    const inkSoft = (0, v4_sky_1.skyInkSoft)(r);
    const surface = { borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden' };
    if (data.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, v4_sky_1.skyGradient)(r), style: surface, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm, marginTop: tokens.spacing.sm }, children: emptyLabel })] }) }));
    }
    const min = Math.min(...data);
    const max = Math.max(...data);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, v4_sky_1.skyGradient)(r), style: surface, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs }, children: ["H ", max, unit, " \u00B7 L ", min, unit] })] }), (0, jsx_runtime_1.jsx)(LineChart_1.LineChart, { data: data, color: color, height: height, width: width, showDots: true, accessibilityLabel: `Temperature graph, high ${max}${unit}, low ${min}${unit}, ${data.length} points` }), labels && labels.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', marginTop: tokens.spacing.xs }, children: labels.map((label, index) => ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs }, children: label }, `${label}-${index}`))) })) : null] }) }));
}
//# sourceMappingURL=TemperatureGraphV4.js.map