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
exports.RadarChartV4 = exports.CHART_AREA_FILL_ALPHA = exports.RADAR_SERIES_CAP = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const v4_chart_1 = require("../primitives/internal/v4-chart");
Object.defineProperty(exports, "CHART_AREA_FILL_ALPHA", { enumerable: true, get: function () { return v4_chart_1.CHART_AREA_FILL_ALPHA; } });
const internal_v4_1 = require("./internal-v4");
const PieChartV4_1 = require("./PieChartV4");
/**
 * How many polygons a radar may carry.
 *
 * **Four, and it throws at five** — brief §5's "cap at four series and say so:
 * a radar with five overlapping polygons is unreadable regardless of palette".
 *
 * The reasoning is the same shape as `CHART_SCATTER_SERIES_CAP`'s and lands on
 * a different number for a different reason. A scatter is capped at three
 * because *any two marks can sit side by side*, which is the all-pairs contrast
 * test and the palette clears it on three slots. A radar's problem is not
 * contrast at all — every polygon crosses every other polygon at up to `n`
 * points, so the fifth one adds crossings, not information, and no palette can
 * fix a shape you cannot trace with your eye.
 *
 * It throws rather than dropping the fifth series, for the reason `chartVar`
 * throws rather than wrapping: silently rendering four of five series is a
 * chart that lies about its own data, and a caller who meant it wants a facet
 * or a small-multiple, not a quieter failure.
 */
exports.RADAR_SERIES_CAP = 4;
/**
 * How much of the radius the plot keeps when axis labels ring it.
 *
 * A ratio, not a spacing token, and deliberately so: the gutter has to be
 * expressed in the same units as the `viewBox`, and a `viewBox` unit is not a
 * CSS pixel once the SVG is scaled. Sharing the ratio between the twins is also
 * what keeps a native radar and a web radar the same drawing — the native base
 * reserved a flat `8` and the web base reserved `1`, so the two were visibly
 * different components.
 */
const LABELLED_PLOT_RATIO = 0.82;
/** How many concentric grid rings a radar draws when the caller says nothing. */
const DEFAULT_RINGS = 4;
/** Normalise the two accepted `data` shapes into rows. */
function toRows(data) {
    if (data === undefined || data.length === 0)
        return [];
    const first = data[0];
    if (typeof first === 'number')
        return [data.slice()];
    return data.map((row) => row.slice());
}
/** A point at spoke `i` of `n`, `radius` from the centre, starting at 12. */
function spoke(c, radius, i, n) {
    const angle = -Math.PI / 2 + (i / n) * Math.PI * 2;
    return [c + radius * Math.cos(angle), c + radius * Math.sin(angle)];
}
/** A point list for a `<polygon>`, with no `NaN` in it. */
function points(list) {
    return list
        .map(([x, y]) => `${Number.isFinite(x) ? x.toFixed(2) : '0'},${Number.isFinite(y) ? y.toFixed(2) : '0'}`)
        .join(' ');
}
/**
 * **V4 radar chart** — rings that are grid, axes that are axes, and a hard cap
 * at four polygons.
 *
 * Five changes against the base.
 *
 * 1. **The chrome stopped being a border.** The base drew its rings with
 *    `stroke="var(--xen-border)"` and had no spokes on web at all. §3's third
 *    decision names that substitution as the bug — a hairline colour doing a
 *    grid's job — so the rings take `CHART_GRID_VAR` and the spokes take
 *    `CHART_AXIS_VAR`, "one step more present than the grid behind it", exactly
 *    as §5 asks.
 * 2. **The spokes stay hairline.** §4.4 gives an axis `CHART_MARK.stroke` (2),
 *    and that is right for the single baseline of a bar chart. A radar's spokes
 *    are not that line: there are `n` of them, they run *under* the data, and at
 *    2 they tie the series stroke drawn on top of them — at which point the
 *    reader cannot tell a polygon edge from an axis. So the spokes take the
 *    axis *colour* §5 specifies at the grid's hairline weight, which is the
 *    one bare number §1 rule 1 allows.
 * 3. **Fill under stroke, at a named alpha.** See {@link CHART_AREA_FILL_ALPHA}.
 * 4. **Four series, then it folds.** See {@link RADAR_SERIES_CAP}. The base
 *    cycled `seriesColor` with `i % 5`, so a fifth polygon was the first one's
 *    colour drawn over the top of it.
 * 5. **It became a figure.** Title, summary, caption and a legend — the legend
 *    being the identity channel's redundancy, which a radar needs more than any
 *    other form in this group because its polygons overlap by construction and
 *    the `CHART_MARK.gap` of surface that separates a pie's slices has nowhere
 *    to go here.
 */
exports.RadarChartV4 = React.forwardRef(function RadarChartV4({ data, axes, series, max, rings = DEFAULT_RINGS, size = 200, title, summary, caption, legend, loading = false, emptyLabel, animate = true, className, ...rest }, ref) {
    const chart = (0, internal_v4_1.useChartV4)(animate);
    const rows = React.useMemo(() => toRows(data), [data]);
    /*
      Past `RADAR_SERIES_CAP` the tail shares the last slot rather than
      throwing. The cap is unmoved and the reason for it is unchanged — five
      overlapping polygons are unreadable regardless of palette — but a radar's
      series count arrives with the DATA, and a `RangeError` out of render takes
      the page down. `foldChartSeries` draws the line the whole module now
      follows: the primitive throws, the component folds.

      Polygons are not averaged into one, because the mean of three profiles is
      a fourth profile nobody measured. The tail keeps its own shapes, shares
      the last slot, and the legend carries one row named
      `CHART_OVERFLOW_LABEL` — which is the honest statement: these are the
      series past the point the chart can distinguish.
    */
    const fold = (0, v4_chart_1.foldChartSeries)(rows, exports.RADAR_SERIES_CAP);
    const slotOf = (i) => Math.min(i, exports.RADAR_SERIES_CAP - 1);
    const frame = (plot, legendNode) => ((0, jsx_runtime_1.jsx)(PieChartV4_1.ChartFigureV4, { ref: ref, title: title, summary: summary, caption: caption, legend: legendNode, className: className, ...rest, children: plot }));
    if (loading)
        return frame((0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "circle", width: size, height: size }));
    const axisCount = Math.max(axes?.length ?? 0, ...rows.map((row) => row.length), 0);
    if (rows.length === 0 || axisCount === 0) {
        return frame((0, jsx_runtime_1.jsx)(internal_v4_1.ChartEmptyV4, { label: emptyLabel, height: size }));
    }
    const c = size / 2;
    const hasLabels = axes !== undefined && axes.length > 0;
    // The label ring eats into the plot; without labels the plot is the circle
    // less a hairline, so the stroke stays inside the viewBox.
    const r = hasLabels ? (size / 2) * LABELLED_PLOT_RATIO : size / 2 - 1;
    // Floored at 1 so it is always a safe divisor — a radar of all zeros is a
    // legitimate dataset ("nobody scored on anything") and must draw a
    // collapsed polygon at the centre, not `NaN` in every point.
    const finite = rows.flat().filter((v) => Number.isFinite(v));
    const ceiling = Math.max(max !== undefined && Number.isFinite(max) ? max : finite.length > 0 ? Math.max(...finite) : 1, 1);
    const ringCount = Number.isFinite(rings) ? Math.max(Math.round(rings), 1) : DEFAULT_RINGS;
    const seriesFill = (i) => {
        const tone = series?.[i]?.tone;
        return tone === undefined ? (0, internal_v4_1.chartVar)(slotOf(i)) : (0, PieChartV4_1.toneVarV4)(tone);
    };
    const showLegend = legend ?? rows.length > 1;
    const legendNode = showLegend ? ((0, jsx_runtime_1.jsx)(PieChartV4_1.RadialLegendV4, { items: fold.didFold
            ? [
                ...fold.kept.map((_, i) => {
                    const tone = series?.[i]?.tone;
                    return {
                        label: series?.[i]?.label ?? `Series ${i + 1}`,
                        slot: i,
                        ...(tone === undefined ? {} : { tone }),
                    };
                }),
                {
                    label: `${v4_chart_1.CHART_OVERFLOW_LABEL} (${fold.folded.length} series)`,
                    slot: exports.RADAR_SERIES_CAP - 1,
                },
            ]
            : rows.map((_, i) => {
                const tone = series?.[i]?.tone;
                return {
                    label: series?.[i]?.label ?? `Series ${i + 1}`,
                    slot: i,
                    ...(tone === undefined ? {} : { tone }),
                };
            }) })) : undefined;
    const spoken = `Radar chart, ${rows.length} series, ${axisCount} ax${axisCount === 1 ? 'is' : 'es'}, ` +
        `0 to ${ceiling}`;
    return frame((0, jsx_runtime_1.jsxs)("svg", { ...chart.rootProps, viewBox: `0 0 ${size} ${size}`, width: size, height: size, role: "img", "aria-label": spoken, className: "inline-block", children: [Array.from({ length: ringCount }, (_, ri) => {
                const rr = (r * (ri + 1)) / ringCount;
                return ((0, jsx_runtime_1.jsx)("polygon", { points: points(Array.from({ length: axisCount }, (_, i) => spoke(c, rr, i, axisCount))), fill: "none", stroke: internal_v4_1.CHART_GRID_VAR, strokeWidth: 1 }, `ring-${ri}`));
            }), Array.from({ length: axisCount }, (_, i) => {
                const [x, y] = spoke(c, r, i, axisCount);
                return ((0, jsx_runtime_1.jsx)("line", { x1: c, y1: c, x2: x.toFixed(2), y2: y.toFixed(2), stroke: internal_v4_1.CHART_AXIS_VAR, strokeWidth: 1 }, `spoke-${i}`));
            }), rows.map((row, si) => {
                const paint = seriesFill(si);
                const pts = Array.from({ length: axisCount }, (_, i) => {
                    const raw = row[i];
                    const v = Number.isFinite(raw) ? Math.min(Math.max(raw, 0), ceiling) : 0;
                    return spoke(c, (v / ceiling) * r, i, axisCount);
                });
                return ((0, jsx_runtime_1.jsx)("polygon", { points: points(pts), fill: paint, fillOpacity: v4_chart_1.CHART_AREA_FILL_ALPHA, stroke: paint, strokeWidth: v4_chart_1.CHART_MARK.stroke, children: (0, jsx_runtime_1.jsx)("title", { children: series?.[si]?.label ?? `Series ${si + 1}` }) }, series?.[si]?.key ?? `series-${si}`));
            }), hasLabels
                ? axes.slice(0, axisCount).map((label, i) => {
                    // Halfway across the gutter the plot gave up: clear of the outer
                    // ring, and still inside the viewBox at 3 and 9 o'clock.
                    const [x, y] = spoke(c, (r + size / 2) / 2, i, axisCount);
                    return ((0, jsx_runtime_1.jsx)("text", { x: x.toFixed(2), y: y.toFixed(2), className: "fill-current text-muted-text text-xs", textAnchor: "middle", dominantBaseline: "middle", children: label }, `axis-${i}`));
                })
                : null] }), legendNode);
});
//# sourceMappingURL=RadarChartV4.js.map