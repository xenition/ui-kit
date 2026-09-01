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
exports.LineChartV4 = exports.CHART_FIGURE_V4_CSS = exports.CHART_FIGURE_V4_STYLE_ID = exports.CHART_AUTO_DOT_MAX = void 0;
exports.toSeriesRowsV4 = toSeriesRowsV4;
exports.seriesInkV4 = seriesInkV4;
exports.thinAxisIndicesV4 = thinAxisIndicesV4;
exports.ChartSwatchV4 = ChartSwatchV4;
exports.ChartLegendV4 = ChartLegendV4;
exports.ChartDotV4 = ChartDotV4;
exports.plotSeriesV4 = plotSeriesV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const LegendV4_1 = require("./LegendV4");
const TextV4_1 = require("../primitives/TextV4");
const internal_v4_1 = require("./internal-v4");
const v4_chart_1 = require("../primitives/internal/v4-chart");
/**
 * Above this many points a dot per datum stops being information.
 *
 * Brief §5 asks for "automatic below ~20 points and off above". It is a
 * **count**, not a size — the one other category of bare number §1 rule 1
 * allows alongside geometry — and it lives here as a named constant so the
 * area chart can hold the identical threshold rather than pick its own.
 */
exports.CHART_AUTO_DOT_MAX = 20;
/**
 * How many horizontal reference rules the plot carries.
 *
 * Three, not "one per gridline of a Y axis this component does not have":
 * top, middle and baseline. Brief §3.3 wants chrome recessive, and three rules
 * is the fewest that still gives the eye a horizon to read a slope against.
 */
const GRID_ROWS = 3;
/**
 * The most x-axis labels a plot will print before it starts thinning them.
 *
 * HIG's density rule (brief §5, Group B's `HistogramV4` note): labels thin out
 * rather than rotate. Six is what fits under a 320-unit plot at `type.xs`
 * without touching.
 */
const AXIS_LABEL_MAX = 6;
/** The one `<style>` id the line family's figure frame injects from. */
exports.CHART_FIGURE_V4_STYLE_ID = 'xen-v4-chart-figure-styles';
/**
 * Two rules a utility class bound to a token cannot say.
 *
 * The tooltip is positioned against a percentage of the plot's width and has
 * to be pulled back by half its own (unknown) width — a `transform` a Tailwind
 * class has no arbitrary value for at this precision — and it must never eat
 * the pointer events that drive it, or moving onto the tip would move the
 * crosshair off the point the tip is describing.
 */
exports.CHART_FIGURE_V4_CSS = `
[data-xen-v4-chart-tip] {
  transform: translateX(-50%);
  pointer-events: none;
}
`;
/** Clamp into `[0, 1]`, treating a non-finite input as 0. */
const clamp01 = (n) => (Number.isFinite(n) ? Math.min(Math.max(n, 0), 1) : 0);
/** Status hue → the token that paints it. The only status ink a V4 chart has. */
const toneVar = (tone) => `var(--xen-${tone})`;
/**
 * `number[]` or `number[][]` → always `number[][]`.
 *
 * The base's single-series shape stays valid — brief §1 rule 8, additive only —
 * and a caller who has one series does not have to wrap it in an array to use
 * the component that finally supports several.
 */
function toSeriesRowsV4(data) {
    if (data.length === 0)
        return [];
    return typeof data[0] === 'number' ? [data] : data;
}
/**
 * The ink for series `i`: its slot, or its status hue when it declared one.
 *
 * {@link chartVar} throws past the fifth slot rather than wrapping, which is
 * the whole point of brief §1 rule 4 — so a sixth series arrives as a loud
 * `RangeError` naming the fix (fold it into "Other", or facet) instead of as
 * two lines quietly sharing a colour.
 */
function seriesInkV4(index, tone) {
    return tone !== undefined ? toneVar(tone) : (0, internal_v4_1.chartVar)(index);
}
/**
 * Evenly-spaced indices to print an axis label at, at most `max` of them.
 *
 * Thinning rather than rotating: a rotated tick is unreadable on a phone and
 * changes the plot's height, which is the layout shift §4.5 exists to stop.
 */
function thinAxisIndicesV4(count, max = AXIS_LABEL_MAX) {
    if (count <= 0)
        return [];
    if (count <= max)
        return Array.from({ length: count }, (_, i) => i);
    // A FRACTIONAL step, rounded per label, is what shipped — and it does not
    // thin, it clumps. At 10 points and a cap of 6 the step is 1.8 and
    // `Math.round(i * step)` yields [0, 2, 4, 5, 7, 9]: 4 and 5 are ADJACENT, so
    // two dates print on top of each other ("13 Aug6 Aug") while the gap either
    // side of them is left empty. Found on a 390pt screen the first time these
    // charts were rendered in a browser rather than asserted in a spec.
    //
    // An integer stride cannot clump, because every gap is the same width by
    // construction.
    const stride = Math.ceil((count - 1) / (max - 1));
    const out = [];
    for (let i = 0; i < count - 1; i += stride)
        out.push(i);
    // The last label is kept unconditionally — on a time axis the two labels a
    // reader actually needs are the ends, and a stride that does not divide
    // evenly would otherwise drop "today". If keeping it would sit it beside its
    // neighbour, the neighbour goes instead: the end is worth more than the
    // even spacing.
    const last = count - 1;
    if (out[out.length - 1] === last - 1)
        out.pop();
    out.push(last);
    return out;
}
/**
 * The tooltip's and the legend's per-series swatch.
 *
 * Its size is {@link CHART_MARK.dotSize} and its thickness
 * {@link CHART_MARK.stroke} — brief §4.8 is explicit that a swatch is
 * `dotSize`, "not a 10×10 literal", which is what the base `Legend` ships
 * (`h-2.5 w-2.5` on web, `width: 10, height: 10` on native; both on §1 rule
 * 1's list).
 *
 * Drawn as a tiny inline SVG rather than a `<span>` with a background,
 * because the ink is a `var(--xen-chart-N)` reference: an SVG `fill` /
 * `stroke` is an **attribute**, which survives every CSSOM, whereas the same
 * value in an inline `style` is dropped outright by the jsdom-class parsers
 * this kit's specs and any SSR style extractor run on. `internal-v4` makes the
 * same call for the palette itself and says so; this is the same reason one
 * level down.
 */
function ChartSwatchV4({ ink, indicator, }) {
    const w = v4_chart_1.CHART_MARK.dotSize;
    if (indicator === 'dot') {
        return ((0, jsx_runtime_1.jsx)("svg", { "data-xen-v4-chart-swatch": "dot", "aria-hidden": "true", focusable: "false", width: w, height: w, viewBox: `0 0 ${w} ${w}`, className: "shrink-0", children: (0, jsx_runtime_1.jsx)("circle", { cx: w / 2, cy: w / 2, r: w / 2, fill: ink }) }));
    }
    return ((0, jsx_runtime_1.jsx)("svg", { "data-xen-v4-chart-swatch": indicator, "aria-hidden": "true", focusable: "false", width: w, height: v4_chart_1.CHART_MARK.stroke, viewBox: `0 0 ${w} ${v4_chart_1.CHART_MARK.stroke}`, className: "shrink-0", children: (0, jsx_runtime_1.jsx)("line", { x1: 0, y1: v4_chart_1.CHART_MARK.stroke / 2, x2: w, y2: v4_chart_1.CHART_MARK.stroke / 2, stroke: ink, strokeWidth: v4_chart_1.CHART_MARK.stroke, strokeLinecap: "round", strokeDasharray: indicator === 'dashed' ? `${v4_chart_1.CHART_MARK.stroke} ${v4_chart_1.CHART_MARK.stroke}` : undefined }) }));
}
/**
 * The line family's legend.
 *
 * This used to be the markup itself — `LegendV4` (Group D) was not on disk
 * while this group built, so the shape that component is specified to have was
 * drawn here instead, and the doc comment said the coordinator's pass was the
 * right place to swap the body. That is what this is: **the body is now
 * `LegendV4`**, and the name, the props and the two call sites are unchanged.
 *
 * The mapping is one to one because the stand-in was built to the same spec:
 * `key` → `key`, `slot` → `slot` (defaulting to the row index either way),
 * `tone` → `tone`, and `indicator` chooses a dot or a rule. What `LegendV4`
 * adds on top is the part a stand-in could not have: the toggle behaviour, the
 * 44 hit floor behind it, and the derived `Legend: …` sentence.
 */
function ChartLegendV4({ items, indicator = 'dot', }) {
    return ((0, jsx_runtime_1.jsx)(LegendV4_1.LegendV4, { indicator: indicator, items: items.map((item, i) => ({
            key: item.key ?? item.label,
            label: item.label,
            slot: item.slot ?? i,
            ...(item.tone === undefined ? {} : { tone: item.tone }),
        })) }));
}
/**
 * A dot on a line, drawn as a zero-length round-capped stroke.
 *
 * See the file header: a `<circle>` under `preserveAspectRatio="none"` is an
 * ellipse, and `r={3}` is one of the literals brief §1 rule 1 retires. A round
 * cap with `vector-effect="non-scaling-stroke"` is a true circle of exactly
 * {@link CHART_MARK.dotSize} painted pixels at any viewBox scale, and the ring
 * of surface underneath it comes from the shared `data-xen-v4-mark-ring` rule.
 */
function ChartDotV4({ x, y, ink, }) {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("line", { "data-xen-v4-mark-ring": "", x1: x, y1: y, x2: x, y2: y, strokeWidth: v4_chart_1.CHART_MARK.dotSize + v4_chart_1.CHART_MARK.ring * 2, strokeLinecap: "round", vectorEffect: "non-scaling-stroke" }), (0, jsx_runtime_1.jsx)("line", { x1: x, y1: y, x2: x, y2: y, stroke: ink, strokeWidth: v4_chart_1.CHART_MARK.dotSize, strokeLinecap: "round", vectorEffect: "non-scaling-stroke" })] }));
}
/**
 * Scale a series into the viewBox.
 *
 * The two guards brief §4.5 asks the spec to assert: a **single** datum sits
 * at the horizontal centre rather than dividing by `length - 1`, and a **flat**
 * series divides by 1 rather than by `max - min`. The base sources guard the
 * second unevenly and the first not at all on some forms; `Infinity` in a `d`
 * attribute is a blank chart with no error.
 */
function plotSeriesV4(values, lo, span, width, height) {
    return values.map((v, i) => ({
        x: values.length === 1 ? width / 2 : (i / (values.length - 1)) * width,
        y: height - clamp01((v - lo) / span) * height,
    }));
}
exports.LineChartV4 = React.forwardRef(function LineChartV4({ data, series, labels, title, summary, caption, legend, height = 160, width = 320, max, min, showDots, grid = true, tooltip = true, indicator = 'line', directLabels, loading = false, emptyLabel = 'No data', animate = true, formatValue = String, onPointPress, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(exports.CHART_FIGURE_V4_STYLE_ID, exports.CHART_FIGURE_V4_CSS);
    const chart = (0, internal_v4_1.useChartV4)(animate);
    const [active, setActive] = React.useState(null);
    const rows = toSeriesRowsV4(data);
    const pointCount = rows.reduce((n, row) => Math.max(n, row.length), 0);
    // ── §4.5: loading and empty both keep the footprint ──────────────────
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('flex w-full flex-col gap-md', className), ...rest, children: (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", height: height }) }));
    }
    if (pointCount === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('flex w-full flex-col gap-md', className), ...rest, children: (0, jsx_runtime_1.jsx)(internal_v4_1.ChartEmptyV4, { label: emptyLabel, height: height }) }));
    }
    const flat = rows.flat();
    const hi = max ?? Math.max(...flat);
    const lo = min ?? Math.min(...flat);
    // A flat series is a horizontal line through the middle, not a division by
    // zero — the guard the base had and the one thing it got right here.
    const span = hi - lo || 1;
    /*
      Past the palette's five slots the tail shares the last one rather than
      throwing. `chartVar(5)` still throws — asking the palette for a sixth slot
      is a mistake in the caller's own code — but a line chart's series count
      arrives with the DATA, and a `RangeError` out of render takes the page down.
      `foldChartSeries` in `primitives/internal/v4-chart.ts` draws that line: the
      primitive throws, the component folds.
  
      Lines are not summed the way a stack's or a pie's segments are, because a
      line is not a part of a whole — the average of three series is a fourth
      series nobody asked for. So the tail keeps its own shapes, shares slot 5,
      and the legend carries ONE row for it named `CHART_OVERFLOW_LABEL`. What a
      reader loses is the ability to tell the sixth line from the seventh, which
      is exactly what the palette was refusing to promise in the first place.
    */
    const fold = (0, v4_chart_1.foldChartSeries)(rows);
    const slotOf = (i) => Math.min(i, v4_chart_1.CHART_SERIES_COUNT - 1);
    const resolved = rows.map((values, i) => {
        const cfg = series?.[i];
        return {
            key: cfg?.key ?? `series-${i}`,
            label: cfg?.label ?? `Series ${i + 1}`,
            values,
            ink: seriesInkV4(slotOf(i), cfg?.tone),
            points: plotSeriesV4(values, lo, span, width, height),
        };
    });
    const dots = showDots ?? pointCount <= exports.CHART_AUTO_DOT_MAX;
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
    // Direct labels default OFF, and that is a correction rather than caution.
    // Each one is positioned at `left: 100%` of the plot — entirely outside it —
    // and the plot reserves no right-hand gutter, so at a phone width inside a
    // card there is nowhere for the label to go and it collides with whatever is
    // beside the chart. Defaulting it on meant every two-series chart shipped
    // broken at 390pt unless the caller knew to turn it off.
    //
    // The channel is still worth having (brief §4.4: at four or fewer series
    // direct labels are the strongest secondary encoding available) — it needs a
    // gutter first. Until the plot reserves one, a caller who has the room asks
    // for it explicitly.
    // The cap is a RULE, not a default: above four series the labels collide
    // whatever the caller asked for, so asking explicitly does not buy past it.
    const showDirect = (directLabels ?? false) && resolved.length <= v4_chart_1.CHART_DIRECT_LABEL_MAX;
    // §4.8: the sentence names the form, the series count and the range. It is
    // the accessibility story — HIG is explicit that a rendered plot plus a
    // visible title is NOT accessible.
    const derivedLabel = [
        'Line chart',
        typeof title === 'string' ? title : undefined,
        resolved.length > 1 ? `${resolved.length} series` : undefined,
        `${pointCount} point${pointCount === 1 ? '' : 's'}`,
        `${formatValue(Math.min(...flat))} to ${formatValue(Math.max(...flat))}`,
    ]
        .filter(Boolean)
        .join(', ');
    const xOf = (i) => (pointCount === 1 ? width / 2 : (i / (pointCount - 1)) * width);
    const pctOf = (i) => `${pointCount === 1 ? 50 : (i / (pointCount - 1)) * 100}%`;
    const pick = (clientX, rect) => {
        // jsdom hands back a zero-width rect; falling back to 1 keeps the ratio
        // finite so the spec can drive this path without a layout engine.
        const w = rect.width || 1;
        const t = clamp01((clientX - rect.left) / w);
        setActive(Math.round(t * (pointCount - 1)));
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "img", "aria-label": derivedLabel, className: (0, cn_1.cn)('flex w-full min-w-0 flex-col gap-md', className), ...rest, children: [title !== undefined || summary !== undefined || caption !== undefined ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-col gap-xs", children: [title !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", children: title })) : null, summary !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", tone: "onSurface", numeric: "tabular", children: summary })) : null, caption !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: caption })) : null] })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "relative w-full", style: { height }, onPointerMove: tooltip
                    ? (e) => pick(e.clientX, e.currentTarget.getBoundingClientRect())
                    : undefined, onPointerLeave: tooltip ? () => setActive(null) : undefined, onClick: onPointPress !== undefined
                    ? (e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const w = rect.width || 1;
                        const t = clamp01((e.clientX - rect.left) / w);
                        onPointPress(Math.round(t * (pointCount - 1)));
                    }
                    : undefined, children: [(0, jsx_runtime_1.jsxs)("svg", { ...chart.rootProps, viewBox: `0 0 ${width} ${height}`, width: "100%", height: height, preserveAspectRatio: "none", "aria-hidden": "true", focusable: "false", className: "overflow-visible", children: [grid
                                ? Array.from({ length: GRID_ROWS }, (_, i) => {
                                    const y = (i / (GRID_ROWS - 1)) * height;
                                    return ((0, jsx_runtime_1.jsx)("line", { "data-xen-v4-chart-grid": "", x1: 0, y1: y, x2: width, y2: y, stroke: internal_v4_1.CHART_GRID_VAR, strokeWidth: 1, vectorEffect: "non-scaling-stroke" }, `grid-${i}`));
                                })
                                : null, resolved.map((s) => ((0, jsx_runtime_1.jsx)("polyline", { "data-xen-v4-chart-line": s.key, points: s.points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' '), fill: "none", stroke: s.ink, strokeWidth: v4_chart_1.CHART_MARK.stroke, strokeLinejoin: "round", strokeLinecap: "round", vectorEffect: "non-scaling-stroke" }, s.key))), resolved.map((s) => dots || s.points.length === 1
                                ? s.points.map((p, i) => ((0, jsx_runtime_1.jsx)(ChartDotV4, { x: p.x, y: p.y, ink: s.ink }, `${s.key}-${i}`)))
                                : null), active !== null && tooltip ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("line", { "data-xen-v4-chart-crosshair": "", x1: xOf(active), y1: 0, x2: xOf(active), y2: height, stroke: internal_v4_1.CHART_AXIS_VAR, strokeWidth: 1, vectorEffect: "non-scaling-stroke" }), resolved.map((s) => {
                                        const p = s.points[active];
                                        return p === undefined ? null : ((0, jsx_runtime_1.jsx)(ChartDotV4, { x: p.x, y: p.y, ink: s.ink }, `active-${s.key}`));
                                    })] })) : null] }), showDirect
                        ? resolved.map((s) => {
                            const last = s.points[s.points.length - 1];
                            return last === undefined ? null : ((0, jsx_runtime_1.jsx)("span", { "data-xen-v4-chart-direct-label": s.key, className: "pointer-events-none absolute -translate-y-1/2 pl-xs", style: { left: `${(last.x / width) * 100}%`, top: `${(last.y / height) * 100}%` }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: s.label }) }, `direct-${s.key}`));
                        })
                        : null, active !== null && tooltip ? ((0, jsx_runtime_1.jsxs)("div", { "data-xen-v4-chart-tip": "", role: "presentation", className: "bg-popover text-on-popover border-border absolute top-0 z-10 flex flex-col gap-xs rounded-[var(--xen-radius-md)] border px-sm py-xs", style: { left: pctOf(active) }, children: [labels?.[active] !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: labels[active] })) : null, resolved.map((s) => {
                                const v = s.values[active];
                                return v === undefined ? null : ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(ChartSwatchV4, { ink: s.ink, indicator: indicator }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "onPopover", children: s.label }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "onPopover", numeric: "tabular", children: formatValue(v) })] }, `tip-${s.key}`));
                            })] })) : null] }), labels !== undefined && labels.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { "data-xen-v4-chart-axis": "", className: "relative h-[var(--xen-text-xs)] w-full", children: thinAxisIndicesV4(Math.min(labels.length, pointCount)).map((i, n, all) => {
                    // The first and last labels are ANCHORED to the plot's edges, not
                    // centred on their point. A centred label at 100% hangs half its
                    // width past the plot; inside a card that width-constrains it and
                    // it wraps, so "Sun 30" broke into two lines and the "30" landed
                    // on the legend. Centring is right for every label that has room
                    // on both sides, and wrong for the two that do not.
                    const first = n === 0;
                    const last = n === all.length - 1;
                    const anchor = first
                        ? { left: 0 }
                        : last
                            ? { right: 0 }
                            : { left: pctOf(i) };
                    return ((0, jsx_runtime_1.jsx)("span", { className: first || last ? 'absolute whitespace-nowrap' : 'absolute -translate-x-1/2 whitespace-nowrap', style: anchor, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: labels[i] }) }, `axis-${i}`));
                }) })) : null, showLegend ? (0, jsx_runtime_1.jsx)(ChartLegendV4, { items: legendItems, indicator: "dot" }) : null] }));
});
//# sourceMappingURL=LineChartV4.js.map