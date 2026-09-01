"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaChartV4 = exports.CHART_AREA_FILL_ALPHA = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const TextV4_1 = require("../primitives/TextV4");
const internal_v4_1 = require("./internal-v4");
const v4_chart_1 = require("../primitives/internal/v4-chart");
Object.defineProperty(exports, "CHART_AREA_FILL_ALPHA", { enumerable: true, get: function () { return v4_chart_1.CHART_AREA_FILL_ALPHA; } });
const LineChartV4_1 = require("./LineChartV4");
/** Clamp into `[0, 1]`, treating a non-finite input as 0. */
const clamp01 = (n) => (Number.isFinite(n) ? Math.min(Math.max(n, 0), 1) : 0);
/**
 * The area under a run of points, closed down to the baseline **or** onto the
 * band beneath it when the chart is stacked.
 *
 * The lower edge is walked in reverse so the path never crosses itself; a
 * self-crossing area is what produces the hourglass artefact the base's
 * `L last.x height L first.x height Z` shortcut shows the moment two series
 * are drawn on one plot.
 */
function areaPath(top, bottom, baseline) {
    if (top.length === 0)
        return '';
    const first = top[0];
    const last = top[top.length - 1];
    const up = top.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ');
    if (bottom === null) {
        return `${up} L${last.x.toFixed(2)} ${baseline} L${first.x.toFixed(2)} ${baseline} Z`;
    }
    const down = [...bottom]
        .reverse()
        .map((p) => `L${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
        .join(' ');
    return `${up} ${down} Z`;
}
/** A polyline's `points` string. */
const polyOf = (pts) => pts.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
/**
 * **V4 area chart** — `LineChartV4`'s twin, for the case where the space
 * under the line means something.
 *
 * ## What the base got wrong
 *
 * The same single-series ceiling as `LineChart`, plus two of its own:
 *
 * 1. **`fillOpacity={0.18}` on web, `fillOpacity = 0.2` on native.** One mark,
 *    two numbers, neither of them a decision — brief §1 rule 1 lists
 *    `fillOpacity={0.15}` among the literals this pass exists to retire. See
 *    {@link CHART_AREA_FILL_ALPHA} for the number and the argument.
 * 2. **The closing path crosses itself.** `M…L last.x baseline L first.x
 *    baseline Z` closes along the bottom from right to left *after* jumping
 *    straight down, which happens to look right for one series over a flat
 *    baseline and produces a bow-tie the moment the lower edge is another
 *    series. That is exactly what stacking needs, so it is fixed here rather
 *    than worked around.
 *
 * ## Stacking, and the gap that makes it readable
 *
 * Brief §5: "Stacked areas get `CHART_MARK.gap` between bands." That is not
 * decoration — it is the secondary encoding the palette's 6–8 CVD band obliges
 * (§1 rule 5). Two adjacent bands a dichromat cannot separate by hue are still
 * visibly two bands when a hairline of page runs between them.
 *
 * The gap is painted as a `CHART_MARK.gap`-wide stroke of `--xen-surface`
 * along each band's lower boundary, carrying
 * `vector-effect="non-scaling-stroke"` so it is exactly 2 painted pixels
 * whatever the responsive viewBox does to the axes. Insetting the geometry
 * instead would make the gap wider on a wide screen and invisible on a narrow
 * one, which is how a "2px separator" becomes a 6px stripe on a desktop.
 *
 * Everything else — the figure frame, the crosshair, the legend, the derived
 * label, the dot geometry — is `LineChartV4`'s and is composed from it rather
 * than re-typed.
 */
exports.AreaChartV4 = React.forwardRef(function AreaChartV4({ data, series, labels, title, summary, caption, legend, height = 160, width = 320, max, min, stacked = false, showDots, grid = true, tooltip = true, indicator = 'line', directLabels, loading = false, emptyLabel = 'No data', animate = true, formatValue = String, onPointPress, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(LineChartV4_1.CHART_FIGURE_V4_STYLE_ID, LineChartV4_1.CHART_FIGURE_V4_CSS);
    const chart = (0, internal_v4_1.useChartV4)(animate);
    const [active, setActive] = React.useState(null);
    const rows = (0, LineChartV4_1.toSeriesRowsV4)(data);
    const pointCount = rows.reduce((n, row) => Math.max(n, row.length), 0);
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('flex w-full flex-col gap-md', className), ...rest, children: (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", height: height }) }));
    }
    if (pointCount === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('flex w-full flex-col gap-md', className), ...rest, children: (0, jsx_runtime_1.jsx)(internal_v4_1.ChartEmptyV4, { label: emptyLabel, height: height }) }));
    }
    // A stack plots cumulative totals; an overlay plots the values themselves.
    // Both then share one scale, so the bands of a stack always reach the top.
    const cumulative = [];
    rows.forEach((row, i) => {
        const below = cumulative[i - 1];
        cumulative.push(row.map((v, j) => v + (below?.[j] ?? 0)));
    });
    const plotted = stacked ? cumulative : rows;
    const flat = plotted.flat();
    const rawFlat = rows.flat();
    const hi = max ?? Math.max(...flat);
    // A stack is read against zero — a band that floats off a non-zero baseline
    // is not a part of a whole any more. An overlay keeps the data's own floor.
    const lo = min ?? (stacked ? Math.min(0, ...flat) : Math.min(...flat));
    const span = hi - lo || 1;
    const baseline = height - clamp01((0 - lo) / span) * height;
    /*
      Past the palette's five slots the tail shares the last one rather than
      throwing. The palette primitive still throws — asking it for a sixth slot is
      a mistake in the caller's own code — but this chart's series count arrives
      with the DATA, and a `RangeError` out of render takes the screen down.
      `foldChartSeries` in `primitives/internal/v4-chart.ts` draws that line: the
      primitive throws, the component folds.
  
      Bands and lines are not summed the way a stack's or a pie's segments are,
      because a line is not a part of a whole — the average of three series is a
      fourth series nobody asked for. So the tail keeps its own shapes, shares the
      last slot, and the legend carries ONE row for it named
      `CHART_OVERFLOW_LABEL`. What a reader loses is the ability to tell the sixth
      line from the seventh, which is exactly what the palette was refusing to
      promise in the first place.
    */
    const fold = (0, v4_chart_1.foldChartSeries)(plotted);
    const slotOf = (i) => Math.min(i, v4_chart_1.CHART_SERIES_COUNT - 1);
    const resolved = plotted.map((values, i) => {
        const cfg = series?.[i];
        return {
            key: cfg?.key ?? `series-${i}`,
            label: cfg?.label ?? `Series ${i + 1}`,
            values: rows[i] ?? values,
            ink: (0, LineChartV4_1.seriesInkV4)(slotOf(i), cfg?.tone),
            points: (0, LineChartV4_1.plotSeriesV4)(values, lo, span, width, height),
        };
    });
    const dots = showDots ?? pointCount <= LineChartV4_1.CHART_AUTO_DOT_MAX;
    const showLegend = legend === undefined ? resolved.length >= 2 : legend !== false;
    const legendItems = Array.isArray(legend)
        ? legend
        : fold.didFold
            ? [
                ...fold.kept.map((_, i) => ({
                    key: resolved[i]?.key ?? `series-${i}`,
                    label: resolved[i]?.label ?? `Series ${i + 1}`,
                    slot: i,
                    tone: series?.[i]?.tone,
                })),
                {
                    key: 'chart-overflow',
                    label: `${v4_chart_1.CHART_OVERFLOW_LABEL} (${fold.folded.length} series)`,
                    slot: v4_chart_1.CHART_SERIES_COUNT - 1,
                },
            ]
            : resolved.map((s, i) => ({ key: s.key, label: s.label, slot: i, tone: series?.[i]?.tone }));
    const showDirect = directLabels ??
        (resolved.length >= 2 && resolved.length <= v4_chart_1.CHART_DIRECT_LABEL_MAX && series !== undefined);
    const derivedLabel = [
        stacked ? 'Stacked area chart' : 'Area chart',
        typeof title === 'string' ? title : undefined,
        resolved.length > 1 ? `${resolved.length} series` : undefined,
        `${pointCount} point${pointCount === 1 ? '' : 's'}`,
        `${formatValue(Math.min(...rawFlat))} to ${formatValue(Math.max(...rawFlat))}`,
    ]
        .filter(Boolean)
        .join(', ');
    const pctOf = (i) => `${pointCount === 1 ? 50 : (i / (pointCount - 1)) * 100}%`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "img", "aria-label": derivedLabel, className: (0, cn_1.cn)('flex w-full min-w-0 flex-col gap-md', className), ...rest, children: [title !== undefined || summary !== undefined || caption !== undefined ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-col gap-xs", children: [title !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", children: title })) : null, summary !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", tone: "onSurface", numeric: "tabular", children: summary })) : null, caption !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: caption })) : null] })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "relative w-full", style: { height }, onPointerMove: tooltip
                    ? (e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const w = rect.width || 1;
                        setActive(Math.round(clamp01((e.clientX - rect.left) / w) * (pointCount - 1)));
                    }
                    : undefined, onPointerLeave: tooltip ? () => setActive(null) : undefined, onClick: onPointPress !== undefined
                    ? (e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const w = rect.width || 1;
                        onPointPress(Math.round(clamp01((e.clientX - rect.left) / w) * (pointCount - 1)));
                    }
                    : undefined, children: [(0, jsx_runtime_1.jsxs)("svg", { ...chart.rootProps, viewBox: `0 0 ${width} ${height}`, width: "100%", height: height, preserveAspectRatio: "none", "aria-hidden": "true", focusable: "false", className: "overflow-visible", children: [grid ? ((0, jsx_runtime_1.jsx)("line", { "data-xen-v4-chart-grid": "", x1: 0, y1: baseline, x2: width, y2: baseline, stroke: internal_v4_1.CHART_GRID_VAR, strokeWidth: 1, vectorEffect: "non-scaling-stroke" })) : null, resolved.map((s, i) => ((0, jsx_runtime_1.jsx)("path", { "data-xen-v4-chart-area": s.key, d: areaPath(s.points, stacked && i > 0 ? (resolved[i - 1]?.points ?? null) : null, baseline), fill: s.ink, fillOpacity: v4_chart_1.CHART_AREA_FILL_ALPHA, stroke: "none" }, `fill-${s.key}`))), stacked
                                ? resolved.slice(0, -1).map((s) => ((0, jsx_runtime_1.jsx)("polyline", { "data-xen-v4-chart-gap": s.key, points: polyOf(s.points), fill: "none", stroke: "var(--xen-surface)", strokeWidth: v4_chart_1.CHART_MARK.gap, strokeLinejoin: "round", strokeLinecap: "round", vectorEffect: "non-scaling-stroke" }, `gap-${s.key}`)))
                                : null, resolved.map((s) => ((0, jsx_runtime_1.jsx)("polyline", { "data-xen-v4-chart-line": s.key, points: polyOf(s.points), fill: "none", stroke: s.ink, strokeWidth: v4_chart_1.CHART_MARK.stroke, strokeLinejoin: "round", strokeLinecap: "round", vectorEffect: "non-scaling-stroke" }, `line-${s.key}`))), resolved.map((s) => dots || s.points.length === 1
                                ? s.points.map((p, i) => ((0, jsx_runtime_1.jsx)(LineChartV4_1.ChartDotV4, { x: p.x, y: p.y, ink: s.ink }, `${s.key}-${i}`)))
                                : null), active !== null && tooltip ? ((0, jsx_runtime_1.jsx)("line", { "data-xen-v4-chart-crosshair": "", x1: pointCount === 1 ? width / 2 : (active / (pointCount - 1)) * width, y1: 0, x2: pointCount === 1 ? width / 2 : (active / (pointCount - 1)) * width, y2: height, stroke: internal_v4_1.CHART_GRID_VAR, strokeWidth: 1, vectorEffect: "non-scaling-stroke" })) : null] }), showDirect
                        ? resolved.map((s) => {
                            const last = s.points[s.points.length - 1];
                            return last === undefined ? null : ((0, jsx_runtime_1.jsx)("span", { "data-xen-v4-chart-direct-label": s.key, className: "pointer-events-none absolute -translate-y-1/2 pl-xs", style: { left: `${(last.x / width) * 100}%`, top: `${(last.y / height) * 100}%` }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: s.label }) }, `direct-${s.key}`));
                        })
                        : null, active !== null && tooltip ? ((0, jsx_runtime_1.jsxs)("div", { "data-xen-v4-chart-tip": "", role: "presentation", className: "bg-popover text-on-popover border-border absolute top-0 z-10 flex flex-col gap-xs rounded-[var(--xen-radius-md)] border px-sm py-xs", style: { left: pctOf(active) }, children: [labels?.[active] !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: labels[active] })) : null, resolved.map((s) => {
                                const v = s.values[active];
                                return v === undefined ? null : ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(LineChartV4_1.ChartSwatchV4, { ink: s.ink, indicator: indicator }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "onPopover", children: s.label }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "onPopover", numeric: "tabular", children: formatValue(v) })] }, `tip-${s.key}`));
                            })] })) : null] }), labels !== undefined && labels.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { "data-xen-v4-chart-axis": "", className: "relative h-[var(--xen-text-xs)] w-full", children: (0, LineChartV4_1.thinAxisIndicesV4)(Math.min(labels.length, pointCount)).map((i) => ((0, jsx_runtime_1.jsx)("span", { className: "absolute -translate-x-1/2", style: { left: pctOf(i) }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: labels[i] }) }, `axis-${i}`))) })) : null, showLegend ? (0, jsx_runtime_1.jsx)(LineChartV4_1.ChartLegendV4, { items: legendItems, indicator: "dot" }) : null] }));
});
//# sourceMappingURL=AreaChartV4.js.map