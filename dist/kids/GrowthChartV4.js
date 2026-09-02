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
exports.GrowthChartV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const tone_v4_2 = require("./internal/tone-v4");
/** Glyph and default word per metric. */
const METRIC_META_V4 = {
    height: { glyph: '📏', label: 'Height' },
    weight: { glyph: '⚖️', label: 'Weight' },
    head: { glyph: '🧢', label: 'Head circumference' },
    other: { glyph: '📈', label: 'Growth' },
};
/**
 * The plot's inset, in viewBox units.
 *
 * The vertical one is the fix for a real defect: with no inset a single
 * measurement — or the lowest of several — landed exactly on the bottom edge
 * and had half its dot clipped off by the SVG's own boundary.
 */
const PAD_X = 3;
const PAD_Y = 8;
/** Above this many samples a dot per datum is a caterpillar, not a chart. */
const DOT_LIMIT = 20;
/**
 * Read the caller's measurements into plottable samples.
 *
 * `points` are sorted by their instant, which is the other half of the base's
 * defect: an unsorted array plotted on its index drew a *descending* curve for
 * a growing child, and nothing in the component noticed.
 */
function toSamples(points, data) {
    if (points && points.length > 0) {
        return points
            .filter((point) => point != null && Number.isFinite(point.value) && Number.isFinite(Date.parse(point.at)))
            .map((point) => ({
            x: Date.parse(point.at),
            y: point.value,
            label: new Date(point.at).toLocaleDateString(),
        }))
            .sort((a, b) => a.x - b.x);
    }
    const series = Array.isArray(data) ? data : [];
    return series
        .map((value, index) => ({ x: index, y: value, label: `#${index + 1}` }))
        .filter((sample) => Number.isFinite(sample.y));
}
/**
 * **V4 growth chart** — same props as {@link GrowthChart} plus `points`,
 * `percentileBand` and `formatValue`.
 *
 * ## Six changes
 *
 * 1. **There is a date axis.** `data: number[]` plotted on the array index, so
 *    measurements at two months, four months and three years rendered evenly
 *    spaced — a growth curve whose whole subject is *rate* drawn with no time
 *    on it. `points` carries the instant with the measurement and the plot
 *    positions on it.
 * 2. **Unsorted input no longer draws a descending curve for a growing
 *    child.** The base plotted whatever order it was handed. `points` are
 *    sorted by `at` before anything is drawn.
 * 3. **A single measurement is not clipped.** One datum landed on the bottom
 *    edge of the SVG with half its dot outside the viewBox. The plot carries an
 *    inset, and a series with no spread on an axis is centred on it rather than
 *    pinned to an edge.
 * 4. **The series reaches a screen reader as numbers.** It was `role="img"`
 *    with a label saying only the latest value — the shape of a child's growth,
 *    which is the entire point, was unavailable. There is a real table of every
 *    date and measurement behind the plot, and the plot itself is `aria-hidden`
 *    rather than competing with it.
 * 5. **A percentile band can be drawn.** `percentile` was a caption with
 *    nothing behind it; a band is what makes a curve readable against a norm.
 *    It is a neutral wash, not a status colour — a child below a band has not
 *    triggered a system error.
 * 6. **Tokens.** `font-extrabold` is off the kit's weight scale, the skeleton
 *    was `bg-neutral-200` (a ramp step that inverts under `[data-theme=dark]`),
 *    the readout inked with the `primary` *fill* rather than `primary-text`,
 *    and the card sits on `card`/`on-card` so it still reads as raised in dark
 *    mode.
 */
exports.GrowthChartV4 = React.forwardRef(function GrowthChartV4({ data, points, metric = 'height', unit, percentile, percentileBand, color = 'primary', height = 160, loading = false, formatValue, emptyLabel = 'No measurements logged yet', className, ...rest }, ref) {
    const meta = METRIC_META_V4[metric];
    const show = formatValue ??
        ((value, suffix) => `${value}${suffix ? ` ${suffix}` : ''}`);
    const shell = (0, cn_1.cn)('flex flex-col gap-sm', tone_v4_2.KIDS_CARD_CLASS, tone_v4_2.KIDS_CARD_GROUND_CLASS, className);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ...rest, ref: ref, "data-xen-growth-chart": "", role: "status", "aria-live": "polite", "aria-label": meta.label, className: shell, children: [(0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { className: "h-3 w-2/5" }), (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { className: "w-full rounded-[var(--xen-radius-md)]", style: { height } })] }));
    }
    const samples = toSamples(points, data);
    if (samples.length === 0) {
        return ((0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { ...rest, ref: ref, "data-xen-growth-chart": "", className: className, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\uD83D\uDCC9" }), title: `${meta.glyph} ${meta.label}`, description: emptyLabel }));
    }
    const xs = samples.map((sample) => sample.x);
    const ys = samples.map((sample) => sample.y);
    const bandLow = percentileBand ? Math.min(percentileBand.low, percentileBand.high) : undefined;
    const bandHigh = percentileBand ? Math.max(percentileBand.low, percentileBand.high) : undefined;
    const xMin = Math.min(...xs);
    const xMax = Math.max(...xs);
    const yMin = Math.min(...ys, ...(bandLow !== undefined ? [bandLow] : []));
    const yMax = Math.max(...ys, ...(bandHigh !== undefined ? [bandHigh] : []));
    // A flat axis is centred, not pinned. One measurement has no spread on
    // either axis, and the base drew it on the floor of the plot.
    const plotX = (x) => xMax > xMin ? PAD_X + ((x - xMin) / (xMax - xMin)) * (100 - PAD_X * 2) : 50;
    const plotY = (y) => yMax > yMin ? 100 - PAD_Y - ((y - yMin) / (yMax - yMin)) * (100 - PAD_Y * 2) : 50;
    const path = samples.map((sample) => `${plotX(sample.x)},${plotY(sample.y)}`).join(' ');
    const latest = samples[samples.length - 1];
    const latestText = latest ? show(latest.y, unit) : undefined;
    const caption = (0, tone_v4_2.spokenLine)([`${meta.label} over time`, latestText, percentile]);
    return ((0, jsx_runtime_1.jsxs)("div", { ...rest, ref: ref, "data-xen-growth-chart": "", className: shell, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between gap-sm", children: [(0, jsx_runtime_1.jsxs)("span", { className: "text-base font-semibold text-on-card", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: `${meta.glyph} ` }), meta.label] }), latestText ? ((0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold text-primary-text", children: latestText })) : null] }), percentile ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted-text", children: percentile }) : null, (0, jsx_runtime_1.jsxs)("svg", { "aria-hidden": "true", viewBox: "0 0 100 100", preserveAspectRatio: "none", className: "w-full", style: { height }, children: [bandLow !== undefined && bandHigh !== undefined ? ((0, jsx_runtime_1.jsx)("rect", { x: 0, y: Math.min(plotY(bandHigh), plotY(bandLow)), width: 100, height: Math.abs(plotY(bandLow) - plotY(bandHigh)), fill: tone_v4_2.TRACK_VAR })) : null, samples.length > 1 ? ((0, jsx_runtime_1.jsx)("polyline", { points: path, fill: "none", stroke: tone_v4_1.TONE_VAR[color], strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", vectorEffect: "non-scaling-stroke" })) : null, samples.length <= DOT_LIMIT
                        ? samples.map((sample, index) => {
                            const cx = plotX(sample.x);
                            const cy = plotY(sample.y);
                            return (
                            // A zero-length round-capped line, not a `<circle>`: under a
                            // non-uniform `preserveAspectRatio="none"` scale a circle is
                            // drawn as an ellipse, and a round cap is not.
                            (0, jsx_runtime_1.jsx)("line", { x1: cx, y1: cy, x2: cx, y2: cy, stroke: tone_v4_1.TONE_VAR[color], strokeWidth: 7, strokeLinecap: "round", vectorEffect: "non-scaling-stroke" }, index));
                        })
                        : null] }), (0, jsx_runtime_1.jsxs)("table", { className: "sr-only", children: [(0, jsx_runtime_1.jsx)("caption", { children: caption }), (0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { scope: "col", children: meta.label }), (0, jsx_runtime_1.jsx)("th", { scope: "col", children: unit ?? meta.label })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: samples.map((sample, index) => ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { scope: "row", children: sample.label }), (0, jsx_runtime_1.jsx)("td", { children: show(sample.y, unit) })] }, index))) })] })] }));
});
//# sourceMappingURL=GrowthChartV4.js.map