"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComparisonBarsV4 = ComparisonBarsV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const v4_chart_1 = require("../../primitives/internal/v4-chart");
const internal_v4_1 = require("./internal-v4");
const LegendV4_1 = require("./LegendV4");
/**
 * **V4 grouped comparison bars** — `View`/flex, no SVG, as the base is.
 *
 * A grouped bar chart is a nested list of rectangles whose *gaps carry meaning*
 * — `CHART_MARK.gap` inside a group, a full spacing step between groups — which
 * a flex row expresses exactly, in tokens, with the group labels sharing the
 * bars' own flex distribution. There is nothing here `react-native-svg` would
 * draw better, so brief §7 open question 6's requirement does not apply to this
 * component. The new web twin is built on the same layout model for the same
 * reason, so the two cannot drift.
 *
 * ## The descending-opacity trick is retired
 *
 * The base cycles two theme colours and then falls back to
 * `OPACITY_STEPS = [1, 0.6, 0.35, 0.2]`. Three things are wrong with it, and
 * they are the same three the palette module was written to end:
 *
 * 1. **A fourth series at 0.2 alpha reads as disabled**, because 0.38 alpha is
 *    exactly what disabled content is drawn at in this kit. The chart says
 *    "this series is switched off" when it means "this series is fourth".
 * 2. **Alpha is not a separable channel from lightness.** Two series at 0.6 and
 *    0.35 of one hue differ only in lightness, which is the *one* channel the
 *    palette deliberately reserves to keep adjacent slots apart for a dichromat
 *    — so the trick spends the safety margin rather than adding to it.
 * 3. **It cycles.** `seriesColors[si % seriesColors.length]` paints the third
 *    series the first colour again, at a different alpha: two encodings for one
 *    fact, and neither is legible.
 *
 * V4 takes a slot per series in assignment order and **folds past the fifth**,
 * because `chartSlotColor` does. A sixth series arrives with the DATA, though,
 * so the COMPONENT folds rather than throwing: the tail's bars share the last
 * slot and the legend carries one row named `CHART_OVERFLOW_LABEL`. The bars
 * are not summed — a group's bars are compared, not composed. Keep in step
 * with the web twin.
 *
 * ## The two gaps are the secondary encoding
 *
 * Rule 5 requires it and §5 names it for this component specifically:
 * `CHART_MARK.gap` of page between bars *inside* a group, and a full
 * `spacing.md` between groups. That difference is what makes the grouping
 * readable without colour at all — a reader counts three bars, a space, three
 * bars. The base used a bare `gap: 2` inside groups and `spacing.sm` between
 * them, which is nearly the same ratio arrived at by accident; this is the same
 * idea with both numbers traceable.
 *
 * ## Marks
 *
 * `CHART_MARK.endRadius` at the **data end only** (§4.4). A bar rounded at the
 * baseline floats off its axis; the base sets only the top corners, which is
 * the one thing it got right and is kept. The baseline itself is `palette.axis`
 * at `CHART_MARK.stroke`; the base painted it `colors.muted`, a *text* colour
 * doing an axis's job (§3), at a bare `height: 1`.
 */
function ComparisonBarsV4({ data, series, max, height = 120, title, summary, caption, legend, tooltip: _tooltip = true, showValues, valueFormat = String, onBarSelect, loading = false, emptyLabel = 'No data', animate: _animate = true, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const palette = (0, internal_v4_1.useChartPaletteV4)();
    const seriesCount = series?.length ?? (data.length === 0 ? 0 : Math.max(...data.map((g) => g.values.length), 0));
    const resolved = series ??
        Array.from({ length: seriesCount }, (_, i) => ({
            key: `series-${i + 1}`,
            label: `Series ${i + 1}`,
        }));
    const frame = { gap: tokens.spacing.md };
    const header = title !== undefined || summary !== undefined ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [title !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", children: title })) : null, summary !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", children: summary })) : null] })) : null;
    const footer = caption !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: caption })) : null;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [frame, style], children: [header, (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "100%", height: height }), footer] }));
    }
    if (data.length === 0 || seriesCount === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [frame, style], children: [header, (0, jsx_runtime_1.jsx)(internal_v4_1.ChartEmptyV4, { label: emptyLabel, height: height }), footer] }));
    }
    const values = data.flatMap((g) => g.values).filter(Number.isFinite);
    const ceiling = Math.max(max ?? (values.length > 0 ? Math.max(...values) : 0), 0);
    const lowest = values.length > 0 ? Math.min(...values) : 0;
    const labelled = showValues ?? data.length <= v4_chart_1.CHART_DIRECT_LABEL_MAX;
    const label = accessibilityLabel ??
        `Grouped bar chart${title !== undefined ? `, ${title}` : ''}, ${data.length} groups, ` +
            `${resolved.length} series, ${valueFormat(lowest)} to ${valueFormat(ceiling)}.`;
    /*
      Past the palette's five slots the tail shares the last one. See the
      component doc: the primitive throws, the component folds, and a grouped bar
      chart's series count is data.
    */
    const fold = (0, v4_chart_1.foldChartSeries)(resolved);
    const slotOf = (si) => Math.min(si, v4_chart_1.CHART_SERIES_COUNT - 1);
    const legendItems = fold.didFold
        ? [
            ...fold.kept.map((s, i) => ({
                label: s.label,
                slot: i,
                ...(s.tone !== undefined ? { tone: s.tone } : {}),
            })),
            {
                label: `${v4_chart_1.CHART_OVERFLOW_LABEL} (${fold.folded.length} series)`,
                slot: v4_chart_1.CHART_SERIES_COUNT - 1,
            },
        ]
        : resolved.map((s, i) => ({
            label: s.label,
            slot: i,
            ...(s.tone !== undefined ? { tone: s.tone } : {}),
        }));
    const showLegend = legend ?? resolved.length >= 2;
    /** Every group renders the same column structure so the rows stay aligned. */
    const columns = (render) => data.map((group, gi) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', gap: v4_chart_1.CHART_MARK.gap }, children: resolved.map((_, si) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' }, children: render(gi, si, group.values[si] ?? 0) }, si))) }, gi)));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [frame, style], children: [header, (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: label, style: { gap: tokens.spacing.xs }, children: [labelled ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md }, children: columns((_gi, _si, value) => ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: valueFormat(value) }))) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.md, height }, children: columns((gi, si, value) => {
                            // A zero ceiling has no scale to map onto; every bar is then the
                            // hairline that says "nothing here", not a divide-by-zero.
                            const ratio = ceiling === 0 ? 0 : Math.min(Math.max(value / ceiling, 0), 1);
                            const tone = resolved[si]?.tone;
                            const bar = {
                                width: '100%',
                                // A bar for a real value is never invisible: the floor is a
                                // hairline, which is what "present but tiny" looks like.
                                height: Math.max(ratio * height, 1),
                                backgroundColor: tone !== undefined ? colors[tone] : (0, internal_v4_1.chartSlotColor)(palette, slotOf(si)),
                                // §4.4: the rounded end is the DATA end. A bar rounded at the
                                // baseline floats off its axis.
                                borderTopLeftRadius: v4_chart_1.CHART_MARK.endRadius,
                                borderTopRightRadius: v4_chart_1.CHART_MARK.endRadius,
                            };
                            const name = `${data[gi]?.label ?? ''} ${resolved[si]?.label ?? ''}: ${valueFormat(value)}`;
                            if (onBarSelect === undefined) {
                                return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "comparison-bar", style: bar });
                            }
                            return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { testID: "comparison-bar", accessibilityRole: "button", accessibilityLabel: name, onPress: () => onBarSelect(gi, si, value), style: bar }));
                        }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "comparison-baseline", style: { height: v4_chart_1.CHART_MARK.stroke, backgroundColor: palette.axis } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md }, children: data.map((group, gi) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", align: "center", children: group.label }) }, gi))) })] }), showLegend ? (0, jsx_runtime_1.jsx)(LegendV4_1.LegendV4, { items: legendItems }) : null, footer] }));
}
//# sourceMappingURL=ComparisonBarsV4.js.map