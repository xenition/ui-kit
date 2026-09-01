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
exports.PieChartV4 = exports.ChartFigureV4 = exports.PIE_OTHER_LABEL = exports.toneVarV4 = void 0;
exports.foldPieDataV4 = foldPieDataV4;
exports.segmentLegendLabelV4 = segmentLegendLabelV4;
exports.segmentFillV4 = segmentFillV4;
exports.shareOfV4 = shareOfV4;
exports.polarV4 = polarV4;
exports.wedgePathV4 = wedgePathV4;
exports.annulusPathV4 = annulusPathV4;
exports.RadialLegendV4 = RadialLegendV4;
exports.ChartLoadingV4 = ChartLoadingV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const TextV4_1 = require("../primitives/TextV4");
const v4_chart_1 = require("../primitives/internal/v4-chart");
const internal_v4_1 = require("./internal-v4");
const LegendV4_1 = require("./LegendV4");
/** The fill for a `tone`. The theme's own status slot, never a derived hue. */
const toneVarV4 = (tone) => `var(--xen-${tone})`;
exports.toneVarV4 = toneVarV4;
/**
 * The default name for the folded tail. Overridable per chart.
 *
 * Aliases the shared {@link CHART_OVERFLOW_LABEL} rather than repeating the
 * string: every component that folds a data-driven series list names its tail
 * with the same word, and a pie that said "Other" while a stacked bar said
 * "Rest" would read as two different concepts on one dashboard.
 */
exports.PIE_OTHER_LABEL = v4_chart_1.CHART_OVERFLOW_LABEL;
/**
 * Sort, keep, fold — brief §7's **open question 2, answered in the affirmative
 * and implemented here**: the component owns the "Other" fold, not the caller.
 *
 * The question was whether a pie with eleven slices is the caller's problem.
 * It is not, for two reasons the brief states and one the palette module
 * enforces:
 *
 * 1. The alternative is every caller writing the same reducer, slightly
 *    differently, and a kit exists to stop that.
 * 2. A pie with eleven slices is wrong in a way the kit *can* prevent, and
 *    Atlassian's practical ceiling of five or six distinct colours for one
 *    categorical chart is the measured version of that sentence.
 * 3. `chartVar(5)` **throws**. Without a fold, a six-slice pie is a crash, and
 *    a crash is a worse answer to "you have too many series" than a fold plus
 *    a legend row that says so.
 *
 * ## The arithmetic
 *
 * The brief's §5 phrasing is "sort descending, keep five, fold the tail", and
 * read as *five kept plus an Other* it asks for six marks out of a five-slot
 * palette that throws at index 5. Read as **five segments total** it is exactly
 * buildable, so that is the reading implemented: four named segments and the
 * folded tail in slot 5. The tail is therefore always at least two rows deep
 * (six inputs → four kept, two folded), which is why the legend can say
 * "categories" in the plural without a branch.
 *
 * ## Why the sort is conditional
 *
 * Only a chart that actually folds is sorted. `CHART_HUE_OFFSETS` is documented
 * as a sequence that "must not be re-sorted" because "the reader's memory of
 * 'green was Europe' is the only continuity a dashboard has" — and sorting the
 * *data* moves a series between slots just as surely as sorting the palette
 * would. At five or fewer segments there is nothing to decide, so the caller's
 * order is kept and a slice holds its colour when a sibling chart filters. At
 * six or more the sort is unavoidable: you cannot know which tail to fold
 * without ranking it.
 *
 * ## Zero and negative rows
 *
 * Dropped, not drawn. A zero-value row paints nothing and would still take a
 * legend swatch — a name and a colour against an invisible slice, which reads
 * as a rendering bug rather than as "this category is empty".
 *
 * Keep this function in step with the native twin; the two are the same
 * algorithm and the specs on both sides assert the same outputs.
 */
function foldPieDataV4(data, otherLabel = exports.PIE_OTHER_LABEL) {
    const clean = [];
    let toned = 0;
    for (const d of data) {
        const value = Number.isFinite(d.value) ? Math.max(d.value, 0) : 0;
        if (d.tone !== undefined)
            toned += 1;
        if (value <= 0)
            continue;
        clean.push(d.tone === undefined
            ? { label: d.label, value, folded: 1 }
            : { label: d.label, value, tone: d.tone, folded: 1 });
    }
    // Brief §1 rule 3, enforced rather than documented: "one or the other in a
    // chart, never both". A half-toned chart is the one composition where a
    // reader cannot tell an identity red from a failure red, and it is cheap to
    // refuse and expensive to debug from a screenshot.
    if (toned > 0 && toned !== data.length) {
        throw new RangeError('@xenition/ui charts: a chart is either all `tone` or all palette slots, never both. ' +
            'Status colour is reserved for a series that genuinely means good or bad (brief §1 rule 3); ' +
            'a segment that is merely fourth wears slot 4.');
    }
    const total = clean.reduce((sum, s) => sum + s.value, 0);
    const isToned = toned > 0;
    // A toned chart never folds. It is not spending the five-slot palette, so
    // there is no index to run out of, and "Other" has no honest status hue —
    // the residual of a pass/fail split is neither passing nor failing.
    if (isToned || clean.length <= v4_chart_1.CHART_SERIES_COUNT) {
        return { segments: clean, total, foldedCount: 0, toned: isToned };
    }
    const sorted = [...clean].sort((a, b) => b.value - a.value);
    const kept = sorted.slice(0, v4_chart_1.CHART_SERIES_COUNT - 1);
    const tail = sorted.slice(v4_chart_1.CHART_SERIES_COUNT - 1);
    const folded = {
        label: otherLabel,
        value: tail.reduce((sum, s) => sum + s.value, 0),
        folded: tail.length,
    };
    return { segments: [...kept, folded], total, foldedCount: tail.length, toned: false };
}
/** The legend's word for a segment — the fold announces itself here (§5). */
function segmentLegendLabelV4(segment) {
    return segment.folded > 1 ? `${segment.label} (${segment.folded} categories)` : segment.label;
}
/** A segment's fill: its status hue if it has one, otherwise its slot. */
function segmentFillV4(segment, index) {
    return segment.tone === undefined ? (0, internal_v4_1.chartVar)(index) : (0, exports.toneVarV4)(segment.tone);
}
/** Whole-percent share, for the legend and the spoken label. */
function shareOfV4(value, total) {
    return total > 0 ? Math.round((value / total) * 100) : 0;
}
/** Point on a circle of radius `r` about `(cx, cy)`, `angle` in radians. */
function polarV4(cx, cy, r, angle) {
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
}
/** Two decimals, and never `NaN` — the guard the base left to chance. */
const coord = (n) => (Number.isFinite(n) ? n.toFixed(2) : '0');
/**
 * A pie wedge from `a0` to `a1`, in radians, measured from 3 o'clock.
 *
 * Callers start at `-Math.PI / 2` so the first slice begins at 12 o'clock,
 * which is where every reviewed system starts a part-to-whole.
 */
function wedgePathV4(cx, cy, r, a0, a1) {
    const [x0, y0] = polarV4(cx, cy, r, a0);
    const [x1, y1] = polarV4(cx, cy, r, a1);
    const large = a1 - a0 > Math.PI ? 1 : 0;
    return `M${coord(cx)} ${coord(cy)} L${coord(x0)} ${coord(y0)} A${coord(r)} ${coord(r)} 0 ${large} 1 ${coord(x1)} ${coord(y1)} Z`;
}
/**
 * A donut segment — the annulus between `rInner` and `rOuter`.
 *
 * Lives here rather than in `DonutChartV4` because it is the same wedge maths
 * with a second radius, and two files deriving the same arc separately is how
 * a kit ends up with two donuts that do not line up.
 */
function annulusPathV4(cx, cy, rOuter, rInner, a0, a1) {
    const [ox0, oy0] = polarV4(cx, cy, rOuter, a0);
    const [ox1, oy1] = polarV4(cx, cy, rOuter, a1);
    const [ix1, iy1] = polarV4(cx, cy, rInner, a1);
    const [ix0, iy0] = polarV4(cx, cy, rInner, a0);
    const large = a1 - a0 > Math.PI ? 1 : 0;
    return (`M${coord(ox0)} ${coord(oy0)} A${coord(rOuter)} ${coord(rOuter)} 0 ${large} 1 ${coord(ox1)} ${coord(oy1)} ` +
        `L${coord(ix1)} ${coord(iy1)} A${coord(rInner)} ${coord(rInner)} 0 ${large} 0 ${coord(ix0)} ${coord(iy0)} Z`);
}
/**
 * The radial family's legend.
 *
 * This used to be the markup itself — `LegendV4` was Group D's component and
 * was not on disk while this group built, so its spec was drawn locally and the
 * doc comment said the coordinator would swap the element when it landed. That
 * is what this is: **the body is now `LegendV4`**, and the name and the three
 * call sites (`PieChartV4`, `DonutChartV4`, `RadarChartV4`) are unchanged.
 *
 * What the swap bought, beyond one implementation: the share percentage per
 * row is `LegendV4`'s own `value` slot, the swatch is the one every other form
 * in the module draws, and a sixth segment now fails through `chartVar` in the
 * legend as loudly as it does in the plot.
 */
function RadialLegendV4({ items, className, }) {
    return ((0, jsx_runtime_1.jsx)(LegendV4_1.LegendV4, { className: className, items: items.map((item, i) => ({
            key: item.label,
            label: item.label,
            slot: item.slot ?? i,
            ...(item.tone === undefined ? {} : { tone: item.tone }),
            ...(item.value === undefined ? {} : { value: item.value }),
        })) }));
}
exports.ChartFigureV4 = React.forwardRef(function ChartFigureV4({ title, summary, caption, legend, children, className, ...rest }, ref) {
    const hasHeader = title !== undefined || summary !== undefined || caption !== undefined;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('inline-flex flex-col gap-md', className), ...rest, children: [hasHeader ? (
            // §4.1's "between a title and its supporting line" step: one thought
            // about one number, so anything larger reads as stacked rows.
            (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-col gap-xs", children: [title === undefined ? null : ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", children: title })), summary === undefined ? null : ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", numeric: "tabular", children: summary })), caption === undefined ? null : ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: caption }))] })) : null, children, legend] }));
});
/**
 * The footprint-preserving loading placeholder — brief §4.5.
 *
 * A chart that collapses to zero height while its data is in flight is "the
 * single most common dashboard jank and is free to avoid", so the skeleton is
 * the plot's own square, not a text line.
 */
function ChartLoadingV4({ size }) {
    return (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "circle", width: size, height: size });
}
/**
 * **V4 pie chart** — a part-to-whole figure that never cycles the palette, and
 * where a sixth slice is folded rather than repainted.
 *
 * Four things changed, in the order they matter.
 *
 * 1. **Colour stopped meaning two things at once.** The base painted slice
 *    three `success`, slice four `warn` and slice five `danger` — a green,
 *    amber and red arc that protanopia and deuteranopia collapse almost
 *    completely, spent on regions where nothing was passing or failing. V4
 *    takes `chartVar(i)` in assignment order and reserves the status hues for
 *    `tone`, which is opt-in and all-or-nothing per chart (§1 rule 3).
 * 2. **A sixth slice is folded, not wrapped.** The base's `seriesColor` cycled
 *    with `i % 5`, so slice six was slice one's colour with a legend swatch
 *    repeating as though that were fine. `chartVar(5)` throws instead, and this
 *    component makes sure it never has to: {@link foldPieDataV4} sorts, keeps
 *    four and folds the tail into "Other" — brief §7's open question 2,
 *    answered by the component rather than by every caller.
 * 3. **The gap became a number with a reason.** The base separated slices with
 *    `strokeWidth={1}` against `--xen-surface`: the right idea at the wrong
 *    number. `CHART_MARK.gap` is that idea at the measured width, and it is not
 *    decoration — the palette's worst adjacent CVD ΔE is 6.5, inside the 6–8
 *    floor band, and that band is legal *only* with secondary encoding. Two
 *    slices a dichromat cannot separate by hue are still visibly two slices
 *    with a hairline of page between them.
 * 4. **It became a figure.** The base was a bare `<svg>` with a slice count for
 *    a label. §3: "a plot is the ink, a figure is the ink plus the sentence
 *    that says what it means" — so title, summary, caption and a legend that
 *    carries every slice's name and share, which is also the redundancy the
 *    contrast obligation is discharged with (§4.8).
 *
 * Hover carries the precise value through a native SVG `<title>` per slice —
 * progressive disclosure with no listener, no portal and no layout pass, which
 * is the whole of what this form needs: the legend already holds identity and
 * share, so the tooltip's job is only the exact number.
 */
exports.PieChartV4 = React.forwardRef(function PieChartV4({ data, size = 160, title, summary, caption, legend, loading = false, emptyLabel, otherLabel = exports.PIE_OTHER_LABEL, animate = true, className, ...rest }, ref) {
    const chart = (0, internal_v4_1.useChartV4)(animate);
    const fold = React.useMemo(() => foldPieDataV4(data, otherLabel), [data, otherLabel]);
    const frame = (plot, legendNode) => ((0, jsx_runtime_1.jsx)(exports.ChartFigureV4, { ref: ref, title: title, summary: summary, caption: caption, legend: legendNode, className: className, ...rest, children: plot }));
    if (loading)
        return frame((0, jsx_runtime_1.jsx)(ChartLoadingV4, { size: size }));
    if (fold.segments.length === 0 || fold.total <= 0) {
        return frame((0, jsx_runtime_1.jsx)(internal_v4_1.ChartEmptyV4, { label: emptyLabel, height: size }));
    }
    const cx = size / 2;
    const cy = size / 2;
    // Half the surface gap is spent outside every arc, so the ring stays inside
    // the viewBox and a 160 pie really occupies 160.
    const r = size / 2 - v4_chart_1.CHART_MARK.gap / 2;
    const showLegend = legend ?? fold.segments.length > 1;
    const legendNode = showLegend ? ((0, jsx_runtime_1.jsx)(RadialLegendV4, { items: fold.segments.map((segment, i) => ({
            label: segmentLegendLabelV4(segment),
            slot: i,
            ...(segment.tone === undefined ? {} : { tone: segment.tone }),
            value: `${shareOfV4(segment.value, fold.total)}%`,
        })) })) : undefined;
    const top = fold.segments.reduce((a, b) => (b.value > a.value ? b : a));
    const spoken = `Pie chart, ${fold.segments.length} slice${fold.segments.length === 1 ? '' : 's'}, ` +
        `largest ${top.label} at ${shareOfV4(top.value, fold.total)}%` +
        (fold.foldedCount > 0
            ? `, ${fold.foldedCount} smaller categories folded into ${otherLabel}`
            : '');
    // One non-zero segment is a whole ring, and an arc path cannot express 360°:
    // the start and end points coincide and the browser draws nothing. The base
    // guarded this with a `<circle>` and V4 keeps that, because the alternative
    // is a chart that silently disappears at exactly the moment a filter narrows
    // it to one category.
    let angle = -Math.PI / 2;
    return frame((0, jsx_runtime_1.jsx)("svg", { ...chart.rootProps, viewBox: `0 0 ${size} ${size}`, width: size, height: size, role: "img", "aria-label": spoken, className: "inline-block", children: fold.segments.length === 1 ? ((0, jsx_runtime_1.jsx)("circle", { cx: cx, cy: cy, r: r, fill: segmentFillV4(fold.segments[0], 0), children: (0, jsx_runtime_1.jsx)("title", { children: `${fold.segments[0].label}: ${fold.segments[0].value}` }) })) : (fold.segments.map((segment, i) => {
            const a0 = angle;
            const a1 = angle + (segment.value / fold.total) * Math.PI * 2;
            angle = a1;
            return ((0, jsx_runtime_1.jsx)("path", { d: wedgePathV4(cx, cy, r, a0, a1), fill: segmentFillV4(segment, i), stroke: "var(--xen-surface)", strokeWidth: v4_chart_1.CHART_MARK.gap, children: (0, jsx_runtime_1.jsx)("title", { children: `${segment.label}: ${segment.value}` }) }, segment.label));
        })) }), legendNode);
});
//# sourceMappingURL=PieChartV4.js.map