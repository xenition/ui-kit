"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YieldChartV4 = YieldChartV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const BarChartV4_1 = require("../charts/BarChartV4");
const LineChartV4_1 = require("../charts/LineChartV4");
/**
 * **V4 yield chart** — {@link YieldChart}'s props with `color` replaced by
 * `tone`, plus `emptyLabel` and `seriesLabel`.
 *
 * ## Four changes
 *
 * 1. **The palette does identity; status does meaning.** See `tone`. This is
 *    the one prop change in the whole pass that is not purely additive, and the
 *    reason is in the note there.
 * 2. **It composes `BarChartV4` / `LineChartV4`**, so it inherits the
 *    validated palette, the tooltip, the direct labels and the derived
 *    accessible summary the charts pass built — including the rule that a
 *    chart must state its value in words, not only draw it.
 * 3. **The headline is tabular** and its unit is a separate muted element
 *    rather than part of the same string, so `12.4 t/ha` aligns down a column
 *    of fields.
 * 4. **The empty state is the chart's own**, not a bare muted sentence: the
 *    chart keeps its height, so a dashboard does not reflow when data arrives.
 */
function YieldChartV4({ data, labels, title = 'Yield', headline, unit, variant = 'bars', tone, seriesLabel, emptyLabel = 'No yield data yet', height = 140, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const series = Array.isArray(data) ? data : [];
    const name = seriesLabel ?? title;
    const summary = `${title}, ${series.length} periods`;
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "chart", size: "base" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", style: { flex: 1 }, children: title })] }), headline != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "2xl", weight: "bold", tone: "onCard", numeric: "tabular", children: headline }), unit != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: unit })) : null] })) : null, variant === 'line' ? ((0, jsx_runtime_1.jsx)(LineChartV4_1.LineChartV4, { data: series, height: height, showDots: true, series: [{ key: 'yield', label: name, tone }], emptyLabel: emptyLabel, accessibilityLabel: summary })) : ((0, jsx_runtime_1.jsx)(BarChartV4_1.BarChartV4, { data: series, labels: labels, height: height, tone: tone, emptyLabel: emptyLabel, accessibilityLabel: summary }))] }));
}
//# sourceMappingURL=YieldChartV4.js.map