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
exports.ScatterChartV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const TextV4_1 = require("../primitives/TextV4");
const v4_chart_1 = require("../primitives/internal/v4-chart");
const internal_v4_1 = require("./internal-v4");
const LegendV4_1 = require("./LegendV4");
/**
 * HIG's tap floor as an SVG radius, so a painted 8px dot still has 44 of hit
 * area (rule 10).
 *
 * The kit's canonical 44 is `MIN_TAP` in `internal/nav-v4.ts`, but that is the
 * CSS expression `calc(var(--xen-space-2xl) - var(--xen-space-xs))` — and an
 * SVG geometry attribute takes a number, not a `var()`. Unlike the heatmap
 * cell's corner, a radius cannot be pushed into a stylesheet either: `r` is a
 * CSS geometry property, but the plot's coordinate system is a `viewBox` and a
 * CSS length would be resolved in the wrong space.
 *
 * So the number is restated here, as geometry, with this note. It is the *only*
 * copy of 44 in this module, and it exists because the platform cannot carry
 * the composed one into an SVG.
 */
const HIT_DIAMETER = 44;
/** How many recessive horizontal grid lines the plot carries. Geometry. */
const GRID_LINES = 4;
/**
 * The plot's inset, so a mark on the domain edge is not clipped by the viewBox.
 *
 * Half a hit target: enough that a point sitting exactly at the maximum has its
 * full painted dot *and* its ring inside the box, derived from the mark sizes
 * rather than picked (the base used `radius + 2`, where the 2 was untraceable).
 */
const PAD = v4_chart_1.CHART_MARK.dotSize / 2 + v4_chart_1.CHART_MARK.ring;
/**
 * Fold a series list down to the scatter's cap — {@link foldChartSeries} in
 * this form's own vocabulary.
 *
 * A scatter's series is a **set of points**, so folding is a union rather than
 * a sum: the tail's clouds become one cloud in the last slot, named
 * {@link CHART_OVERFLOW_LABEL}. Nothing is dropped and nothing is aggregated,
 * so the plot still shows every datum the caller handed over — it just stops
 * claiming to distinguish the ones past the cap.
 */
function foldScatterSeriesV4(series) {
    const fold = (0, v4_chart_1.foldChartSeries)(series, v4_chart_1.CHART_SCATTER_SERIES_CAP);
    if (!fold.didFold)
        return fold.kept;
    return [
        ...fold.kept,
        {
            key: 'chart-overflow',
            label: v4_chart_1.CHART_OVERFLOW_LABEL,
            points: fold.folded.flatMap((s) => s.points),
        },
    ];
}
/**
 * **V4 scatter plot** — the one form in this module with a *hard series cap*,
 * and the reason that cap exists.
 *
 * ## Three series, and the fourth folds into "Other"
 *
 * Every other chart in the line may carry all five slots. A scatter may carry
 * `CHART_SCATTER_SERIES_CAP` — three — and a fourth series is **folded into
 * the last slot** and named {@link CHART_OVERFLOW_LABEL} in the legend rather
 * than painted a colour the palette never cleared.
 *
 * The reason is measured, not stylistic, and `v4-chart.ts` records it. A bar
 * chart, a line chart and a stack only ever place a series next to its
 * *neighbours in assignment order*, so the adjacent-pair CVD check is the
 * honest gate for them. A scatter places **any two marks side by side** — that
 * is what a scatter is — which is the strictly harder all-pairs test. The same
 * validator run that locked the palette reported the first three slots clearing
 * it (all-pairs normal-vision ΔE 18.3 light / 17.7 dark) and five slots not.
 *
 * So a scatter with four series is not a palette problem waiting for a fourth
 * colour. It is a chart that needs faceting, an "Other" fold, or small
 * multiples. Rule 4's argument applies with more force here than anywhere
 * else: silently painting the fourth cloud a colour a dichromat reads as the
 * second is worse than saying so, because nobody ever finds out.
 *
 * **It folds rather than throws, and that is a deliberate change of mind.**
 * The cap itself is unmoved — the palette still refuses a fourth slot — but a
 * scatter's series count arrives with the *data*, and a `RangeError` out of
 * render takes the page down. `foldChartSeries` in
 * `primitives/internal/v4-chart.ts` draws the line: the primitive throws,
 * because `chartVar(3)` is a mistake in the caller's own code; the component
 * folds, because it cannot know at build time how many series will arrive. The
 * tail's points are merged into one cloud in the last slot and the legend says
 * "Other" — the same answer `PieChartV4` gives, and unlike a throw, a reader
 * can see it.
 *
 * ## Every point carries a ring of surface
 *
 * Rule 5 names four secondary encodings and this form needs the fourth: two
 * points that overlap are, without a ring, one blob whose colour is neither
 * series. `data-xen-v4-mark-ring` is the shared adapter's paint rule —
 * `stroke: var(--xen-surface); paint-order: stroke` — so the ring is the page
 * showing through rather than a fourth colour, and it is stroked *under* the
 * fill so the painted dot keeps its full `CHART_MARK.dotSize`.
 *
 * The base instead set `fillOpacity={0.75}` on every point, which is the same
 * idea done wrong: two overlapping translucent dots make a *third*, darker
 * colour that is in neither series' key, and a single dot over the page is a
 * fourth. V4 paints at full strength and separates by geometry.
 *
 * ## What else changed from the base
 *
 * - **Axes were `var(--xen-border)`** — a hairline token doing an axis's job.
 *   They are `CHART_AXIS_VAR` at `CHART_MARK.stroke`, with the grid one step
 *   quieter behind them at `CHART_GRID_VAR` and a 1px hairline (§3, §4.4).
 * - **`radius` was a prop defaulting to 4** — a literal, and a scatter whose
 *   dot size a caller can shrink is a scatter whose marks stop being marks.
 *   The painted dot is `CHART_MARK.dotSize`, imported.
 * - **A single point rendered at the origin.** With one datum the domain span
 *   is zero, and `(x - x0) / 0` fed the `cx` attribute. §4.5 requires a single
 *   datum to render, so a zero span centres its point instead.
 * - **Tap area.** A painted 8px dot is not a target. When `onPointSelect` is
 *   given each mark also carries a transparent {@link HIT_DIAMETER} circle
 *   (rule 10). They overlap in a dense cloud, deliberately: the last-drawn wins,
 *   which is the same rule the paint order already follows, and a chooseable
 *   near-miss beats an unhittable exact one.
 */
exports.ScatterChartV4 = React.forwardRef(function ScatterChartV4({ data, series, width = 320, height = 200, xDomain, yDomain, showAxes = true, showGrid = true, title, summary, caption, legend, tooltip = true, valueFormat = String, onPointSelect, loading = false, emptyLabel = 'No data', animate = true, className, 'aria-label': ariaLabel, ...rest }, ref) {
    const chart = (0, internal_v4_1.useChartV4)(animate);
    // One shape downstream: the `data` short form is series zero, and anything
    // past the cap is folded into the last slot rather than thrown at.
    const resolved = foldScatterSeriesV4(series ?? (data !== undefined ? [{ key: 'series-1', label: 'Series 1', points: data }] : []));
    const points = resolved.flatMap((s) => s.points);
    const xs = points.map((p) => p.x).filter(Number.isFinite);
    const ys = points.map((p) => p.y).filter(Number.isFinite);
    const header = title !== undefined || summary !== undefined ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-col gap-xs", children: [title !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", children: title })) : null, summary !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", numeric: "tabular", children: summary })) : null] })) : null;
    const footer = caption !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: caption })) : null;
    const frameClass = (0, cn_1.cn)('flex w-full flex-col gap-md', className);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: frameClass, ...rest, children: [header, (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "100%", height: height }), footer] }));
    }
    if (points.length === 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: frameClass, ...rest, children: [header, (0, jsx_runtime_1.jsx)(internal_v4_1.ChartEmptyV4, { label: emptyLabel, height: height }), footer] }));
    }
    const [x0, x1] = xDomain ?? [Math.min(...xs), Math.max(...xs)];
    const [y0, y1] = yDomain ?? [Math.min(...ys), Math.max(...ys)];
    const xSpan = x1 - x0;
    const ySpan = y1 - y0;
    const plotW = Math.max(width - PAD * 2, 1);
    const plotH = Math.max(height - PAD * 2, 1);
    // §4.5: one datum renders. With a zero span there is no position to
    // compute, so the mark takes the middle of the plot rather than the origin
    // — the same answer §4.5 gives a one-point line ("a dot at the centre").
    const px = (x) => PAD + (xSpan === 0 ? 0.5 : (x - x0) / xSpan) * plotW;
    const py = (y) => PAD + (1 - (ySpan === 0 ? 0.5 : (y - y0) / ySpan)) * plotH;
    const label = ariaLabel ??
        `Scatter plot${title !== undefined ? `, ${title}` : ''}, ${resolved.length} series, ` +
            `${points.length} points, x ${valueFormat(x0)} to ${valueFormat(x1)}, ` +
            `y ${valueFormat(y0)} to ${valueFormat(y1)}.`;
    const showLegend = legend ?? resolved.length >= 2;
    const legendItems = resolved.map((s) => ({
        label: s.label,
        ...(s.tone !== undefined ? { tone: s.tone } : {}),
    }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-v4-chart": "", style: chart.rootProps.style, className: frameClass, ...rest, children: [header, (0, jsx_runtime_1.jsxs)("svg", { ...chart.rootProps, viewBox: `0 0 ${width} ${height}`, width: "100%", height: height, role: "img", "aria-label": label, className: "block", children: [showGrid
                        ? Array.from({ length: GRID_LINES }, (_, i) => {
                            const y = PAD + (plotH * (i + 1)) / (GRID_LINES + 1);
                            return ((0, jsx_runtime_1.jsx)("line", { "data-xen-v4-grid": "", x1: PAD, y1: y, x2: width - PAD, y2: y, stroke: internal_v4_1.CHART_GRID_VAR, 
                                // A hairline is the one bare number §4.4 allows.
                                strokeWidth: 1 }, i));
                        })
                        : null, showAxes ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("line", { "data-xen-v4-axis": "", x1: PAD, y1: height - PAD, x2: width - PAD, y2: height - PAD, stroke: internal_v4_1.CHART_AXIS_VAR, strokeWidth: v4_chart_1.CHART_MARK.stroke }), (0, jsx_runtime_1.jsx)("line", { "data-xen-v4-axis": "", x1: PAD, y1: PAD, x2: PAD, y2: height - PAD, stroke: internal_v4_1.CHART_AXIS_VAR, strokeWidth: v4_chart_1.CHART_MARK.stroke })] })) : null, resolved.map((s, si) => s.points.map((p, pi) => {
                        const cx = px(p.x);
                        const cy = py(p.y);
                        const reading = `${s.label}${p.label !== undefined ? ` · ${p.label}` : ''}: ${valueFormat(p.x)}, ${valueFormat(p.y)}`;
                        return ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [(0, jsx_runtime_1.jsx)("circle", { "data-xen-v4-mark-ring": "", "data-series": si, cx: cx, cy: cy, r: v4_chart_1.CHART_MARK.dotSize / 2, fill: s.tone !== undefined ? `var(--xen-${s.tone})` : (0, internal_v4_1.chartVar)(si), strokeWidth: v4_chart_1.CHART_MARK.ring, children: tooltip ? (0, jsx_runtime_1.jsx)("title", { children: reading }) : null }), onPointSelect !== undefined ? ((0, jsx_runtime_1.jsx)("circle", { "data-xen-v4-hit": "", cx: cx, cy: cy, r: HIT_DIAMETER / 2, fill: "transparent", style: { cursor: 'pointer' }, onClick: () => onPointSelect(p, si, pi) })) : null] }, `${s.key}-${pi}`));
                    }))] }), showLegend ? (0, jsx_runtime_1.jsx)(LegendV4_1.LegendV4, { items: legendItems }) : null, footer] }));
});
//# sourceMappingURL=ScatterChartV4.js.map