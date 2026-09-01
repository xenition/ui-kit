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
exports.DonutChartV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const TextV4_1 = require("../primitives/TextV4");
const v4_chart_1 = require("../primitives/internal/v4-chart");
const internal_v4_1 = require("./internal-v4");
const PieChartV4_1 = require("./PieChartV4");
const ProgressRingV4_1 = require("./ProgressRingV4");
/**
 * **V4 donut chart** — the pie's sibling, and the one radial form with a place
 * to put the number.
 *
 * Everything `PieChartV4` changed applies here for the same reasons: slots in
 * assignment order instead of a status arc, `CHART_MARK.gap` of surface between
 * segments instead of `strokeWidth={1}`, and the "Other" fold at six or more
 * rather than a palette that wraps. Three things are this component's own.
 *
 * 1. **The hole is a slot, not a hole.** Brief §5 is explicit — "donut's centre
 *    is a slot for `summary`" — and §3 puts the number above the plot in the
 *    reading order for a reason: "the number is bigger than the chart is loud".
 *    A donut is the one form where those two land in the same place, so
 *    `summary` is typeset in the middle at the figure's `2xl` bold rather than
 *    the base's hand-rolled `text-lg font-semibold`, and the caption sits under
 *    it in the same well. The base's `centerLabel` is retired: it took a raw
 *    string at a size nothing else in the kit used.
 * 2. **The segments are real annuli.** The base drew full pie wedges and then
 *    punched a `--xen-surface` circle over the top of them. That works until
 *    the donut sits on anything that is not `--xen-surface` — a `card`, a
 *    tinted panel, an image — at which point a surface-coloured disc appears in
 *    the middle of the chart. V4 draws the ring itself, so the hole is actually
 *    a hole and whatever is behind the chart shows through it.
 * 3. **The thickness is derived.** `radialThicknessV4` is the family's one
 *    answer, shared with `GaugeChartV4` and `ProgressRingV4`, so the three do
 *    not each pick a ring weight; a caller who wants something else passes a
 *    fraction of the radius rather than a pixel count that stops being right
 *    the moment `size` changes.
 */
exports.DonutChartV4 = React.forwardRef(function DonutChartV4({ data, size = 160, thickness, title, summary, caption, legend, loading = false, emptyLabel, otherLabel = PieChartV4_1.PIE_OTHER_LABEL, animate = true, className, ...rest }, ref) {
    const chart = (0, internal_v4_1.useChartV4)(animate);
    const fold = React.useMemo(() => (0, PieChartV4_1.foldPieDataV4)(data, otherLabel), [data, otherLabel]);
    const frame = (plot, legendNode) => ((0, jsx_runtime_1.jsx)(PieChartV4_1.ChartFigureV4, { ref: ref, title: title, caption: caption, legend: legendNode, className: className, ...rest, children: plot }));
    if (loading)
        return frame((0, jsx_runtime_1.jsx)(PieChartV4_1.ChartLoadingV4, { size: size }));
    if (fold.segments.length === 0 || fold.total <= 0) {
        return frame((0, jsx_runtime_1.jsx)(internal_v4_1.ChartEmptyV4, { label: emptyLabel, height: size }));
    }
    const cx = size / 2;
    const cy = size / 2;
    const rOuter = size / 2 - v4_chart_1.CHART_MARK.gap / 2;
    // A fraction of the *outer radius*, clamped so a caller cannot ask for a
    // ring thicker than the circle or thin enough to vanish.
    const ringWidth = thickness === undefined || !Number.isFinite(thickness)
        ? (0, ProgressRingV4_1.radialThicknessV4)(size)
        : Math.min(Math.max(thickness, 0), 1) * rOuter;
    const rInner = Math.max(rOuter - ringWidth, 0);
    const showLegend = legend ?? fold.segments.length > 1;
    const legendNode = showLegend ? ((0, jsx_runtime_1.jsx)(PieChartV4_1.RadialLegendV4, { items: fold.segments.map((segment, i) => ({
            label: (0, PieChartV4_1.segmentLegendLabelV4)(segment),
            slot: i,
            ...(segment.tone === undefined ? {} : { tone: segment.tone }),
            value: `${(0, PieChartV4_1.shareOfV4)(segment.value, fold.total)}%`,
        })) })) : undefined;
    const top = fold.segments.reduce((a, b) => (b.value > a.value ? b : a));
    const spoken = `Donut chart, ${fold.segments.length} segment${fold.segments.length === 1 ? '' : 's'}` +
        (summary === undefined ? '' : `, ${summary}`) +
        `, largest ${top.label} at ${(0, PieChartV4_1.shareOfV4)(top.value, fold.total)}%` +
        (fold.foldedCount > 0
            ? `, ${fold.foldedCount} smaller categories folded into ${otherLabel}`
            : '');
    let angle = -Math.PI / 2;
    const single = fold.segments.length === 1;
    const only = fold.segments[0];
    return frame((0, jsx_runtime_1.jsxs)("div", { className: "relative inline-block", style: { width: size, height: size }, children: [(0, jsx_runtime_1.jsx)("svg", { ...chart.rootProps, viewBox: `0 0 ${size} ${size}`, width: size, height: size, role: "img", "aria-label": spoken, children: single ? (
                // A whole ring is 360°, which an arc path cannot express — its two
                // endpoints coincide and the renderer draws nothing at all. Two
                // concentric circles with `fill-rule="evenodd"` on one path is the
                // shape that survives it, and it keeps the hole transparent, which
                // the base's overpainted disc did not.
                (0, jsx_runtime_1.jsx)("path", { d: `M${cx} ${cy - rOuter} A${rOuter} ${rOuter} 0 1 0 ${cx} ${cy + rOuter} ` +
                        `A${rOuter} ${rOuter} 0 1 0 ${cx} ${cy - rOuter} Z ` +
                        `M${cx} ${cy - rInner} A${rInner} ${rInner} 0 1 1 ${cx} ${cy + rInner} ` +
                        `A${rInner} ${rInner} 0 1 1 ${cx} ${cy - rInner} Z`, fillRule: "evenodd", fill: (0, PieChartV4_1.segmentFillV4)(only, 0), children: (0, jsx_runtime_1.jsx)("title", { children: `${only.label}: ${only.value}` }) })) : (fold.segments.map((segment, i) => {
                    const a0 = angle;
                    const a1 = angle + (segment.value / fold.total) * Math.PI * 2;
                    angle = a1;
                    return ((0, jsx_runtime_1.jsx)("path", { d: (0, PieChartV4_1.annulusPathV4)(cx, cy, rOuter, rInner, a0, a1), fill: (0, PieChartV4_1.segmentFillV4)(segment, i), stroke: "var(--xen-surface)", strokeWidth: v4_chart_1.CHART_MARK.gap, children: (0, jsx_runtime_1.jsx)("title", { children: `${segment.label}: ${segment.value}` }) }, segment.label));
                })) }), summary === undefined ? null : (
            // Spoken by the `<svg>`'s label already, so the visual copy is hidden
            // from assistive tech rather than read out a second time.
            (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", "data-xen-v4-donut-center": "", className: (0, cn_1.cn)('pointer-events-none absolute inset-0', 'flex items-center justify-center'), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", numeric: "tabular", children: summary }) }))] }), legendNode);
});
//# sourceMappingURL=DonutChartV4.js.map