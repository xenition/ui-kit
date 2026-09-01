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
exports.coordV4 = exports.PIE_OTHER_LABEL = void 0;
exports.toneColorV4 = toneColorV4;
exports.foldPieDataV4 = foldPieDataV4;
exports.segmentLegendLabelV4 = segmentLegendLabelV4;
exports.segmentFillV4 = segmentFillV4;
exports.shareOfV4 = shareOfV4;
exports.polarV4 = polarV4;
exports.wedgePathV4 = wedgePathV4;
exports.annulusPathV4 = annulusPathV4;
exports.RadialLegendV4 = RadialLegendV4;
exports.ChartFigureV4 = ChartFigureV4;
exports.RadialEmptyV4 = RadialEmptyV4;
exports.ChartLoadingV4 = ChartLoadingV4;
exports.ChartRevealV4 = ChartRevealV4;
exports.PieChartV4 = PieChartV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const v4_chart_1 = require("../../primitives/internal/v4-chart");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const TextV4_1 = require("../primitives/TextV4");
const motion_v4_1 = require("../primitives/internal/motion-v4");
const useReducedMotion_1 = require("../primitives/internal/useReducedMotion");
const theme_1 = require("../theme");
const internal_v4_1 = require("./internal-v4");
const LegendV4_1 = require("./LegendV4");
/** The fill for a `tone`. The theme's own status slot, never a derived hue. */
function toneColorV4(colors, tone) {
    return colors[tone];
}
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
 * Three reasons, the first two from the brief and the third from the palette
 * module:
 *
 * 1. The alternative is every caller writing the same reducer, slightly
 *    differently, and a kit exists to stop that.
 * 2. A pie with eleven slices is wrong in a way the kit *can* prevent —
 *    Atlassian's ceiling of five or six distinct colours for one categorical
 *    chart is the measured version of that sentence.
 * 3. `chartSlotColor(palette, 5)` **throws**. Without a fold, a six-slice pie
 *    is a crash, and a crash is a worse answer to "too many series" than a fold
 *    with a legend row that says so.
 *
 * ## The arithmetic
 *
 * §5 says "sort descending, keep five, fold the tail". Read as *five kept plus
 * an Other* it asks for six marks out of a five-slot palette that throws at
 * index 5; read as **five segments total** it is exactly buildable, so that is
 * the reading implemented — four named segments and the folded tail in slot 5.
 * The tail is therefore always at least two rows deep (six inputs → four kept,
 * two folded), which is why the legend can say "categories" without a branch.
 *
 * ## Why the sort is conditional
 *
 * Only a chart that folds is sorted. `CHART_HUE_OFFSETS` is documented as a
 * sequence that must not be re-sorted because "the reader's memory of 'green
 * was Europe' is the only continuity a dashboard has" — and sorting the *data*
 * moves a series between slots just as surely. At five or fewer there is
 * nothing to decide, so the caller's order stands; at six or more the ranking
 * is unavoidable.
 *
 * Zero and negative rows are dropped rather than drawn: they paint nothing and
 * would still take a legend swatch, which reads as a rendering bug.
 *
 * Keep in step with the web twin — the same algorithm, and both specs assert
 * the same outputs.
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
    // §1 rule 3, enforced rather than documented: "one or the other in a chart,
    // never both". A half-toned chart is the one composition where a reader
    // cannot tell an identity red from a failure red.
    if (toned > 0 && toned !== data.length) {
        throw new RangeError('@xenition/ui charts: a chart is either all `tone` or all palette slots, never both. ' +
            'Status colour is reserved for a series that genuinely means good or bad (brief §1 rule 3); ' +
            'a segment that is merely fourth wears slot 4.');
    }
    const total = clean.reduce((sum, s) => sum + s.value, 0);
    const isToned = toned > 0;
    // A toned chart never folds: it is not spending the five-slot palette, so
    // there is no index to run out of, and the residual of a pass/fail split is
    // neither passing nor failing.
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
function segmentFillV4(palette, colors, segment, index) {
    return segment.tone === undefined
        ? (0, internal_v4_1.chartSlotColor)(palette, index)
        : toneColorV4(colors, segment.tone);
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
const coordV4 = (n) => (Number.isFinite(n) ? n.toFixed(2) : '0');
exports.coordV4 = coordV4;
/** A pie wedge from `a0` to `a1` in radians, measured from 3 o'clock. */
function wedgePathV4(cx, cy, r, a0, a1) {
    const [x0, y0] = polarV4(cx, cy, r, a0);
    const [x1, y1] = polarV4(cx, cy, r, a1);
    const large = a1 - a0 > Math.PI ? 1 : 0;
    return `M${(0, exports.coordV4)(cx)} ${(0, exports.coordV4)(cy)} L${(0, exports.coordV4)(x0)} ${(0, exports.coordV4)(y0)} A${(0, exports.coordV4)(r)} ${(0, exports.coordV4)(r)} 0 ${large} 1 ${(0, exports.coordV4)(x1)} ${(0, exports.coordV4)(y1)} Z`;
}
/** A donut segment — the annulus between `rInner` and `rOuter`. */
function annulusPathV4(cx, cy, rOuter, rInner, a0, a1) {
    const [ox0, oy0] = polarV4(cx, cy, rOuter, a0);
    const [ox1, oy1] = polarV4(cx, cy, rOuter, a1);
    const [ix1, iy1] = polarV4(cx, cy, rInner, a1);
    const [ix0, iy0] = polarV4(cx, cy, rInner, a0);
    const large = a1 - a0 > Math.PI ? 1 : 0;
    return (`M${(0, exports.coordV4)(ox0)} ${(0, exports.coordV4)(oy0)} A${(0, exports.coordV4)(rOuter)} ${(0, exports.coordV4)(rOuter)} 0 ${large} 1 ${(0, exports.coordV4)(ox1)} ${(0, exports.coordV4)(oy1)} ` +
        `L${(0, exports.coordV4)(ix1)} ${(0, exports.coordV4)(iy1)} A${(0, exports.coordV4)(rInner)} ${(0, exports.coordV4)(rInner)} 0 ${large} 0 ${(0, exports.coordV4)(ix0)} ${(0, exports.coordV4)(iy0)} Z`);
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
 * The radial family stacks its legend under a square plot rather than wrapping
 * it in a row, which is why `vertical` is passed: a donut's rows sit one above
 * another beneath the ring, where a bar chart's run along under the bars.
 */
function RadialLegendV4({ items, style, }) {
    return ((0, jsx_runtime_1.jsx)(LegendV4_1.LegendV4, { vertical: true, style: style, items: items.map((item, i) => ({
            key: item.label,
            label: item.label,
            slot: item.slot ?? i,
            ...(item.tone === undefined ? {} : { tone: item.tone }),
            ...(item.value === undefined ? {} : { value: item.value }),
        })) }));
}
/**
 * The figure frame the radial family shares — brief §4.2's title / summary /
 * caption / legend slots in the one order they are ever drawn in.
 *
 * §3 is the argument: the module today is a set of *plots*, and the product
 * needs *figures* — "a plot is the ink, a figure is the ink plus the sentence
 * that says what it means".
 *
 * `accessibilityRole="image"` and the spoken label go on the **plot**, not on
 * this wrapper: making the title and legend children of an image role hides
 * real text from VoiceOver, which is the opposite of HIG's point that a
 * rendered chart plus a visible title is not accessible.
 */
function ChartFigureV4({ title, summary, caption, legend, children, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const hasHeader = title !== undefined || summary !== undefined || caption !== undefined;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.md, alignItems: 'flex-start' }, style], children: [hasHeader ? (
            // §4.1's "between a title and its supporting line" step: one thought
            // about one number, so anything larger reads as stacked rows.
            (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [title === undefined ? null : ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", children: title })), summary === undefined ? null : ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", numeric: "tabular", children: summary })), caption === undefined ? null : ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: caption }))] })) : null, children, legend] }));
}
/**
 * The empty state for the **radial** family — brief §4.5.
 *
 * Kept as a name after the consolidation pass, and deliberately: it is no
 * longer a second implementation, only the shared {@link ChartEmptyV4} with
 * the one thing a radial form needs that a full-bleed one does not — a
 * **square footprint**. A line chart's placeholder reserves height and lets
 * width come from the parent; a donut, gauge, ring or radar is `size × size`,
 * and a placeholder that reserved only height would let the chart collapse
 * horizontally while its data was in flight — the same jank on the other axis.
 *
 * So `width` became a prop of the shared component and this stayed as the
 * radial family's four call sites' name for it. One implementation, one
 * spelling per footprint shape.
 */
function RadialEmptyV4({ label, width, height, }) {
    return (0, jsx_runtime_1.jsx)(internal_v4_1.ChartEmptyV4, { label: label, width: width, height: height });
}
/** The loading placeholder, at the plot's own footprint (§4.5). */
function ChartLoadingV4({ width, height, circle = true, }) {
    return (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: circle ? 'circle' : 'rect', width: width, height: height });
}
/**
 * The entrance reveal — §4.7, once, and never on a data update.
 *
 * **A fade, where web wipes.** The web sheet reveals with
 * `transform: scaleY(0.94)` off `transform-origin: bottom`; React Native has no
 * transform origin, so the same declaration would scale a chart about its
 * centre and read as a zoom rather than a wipe. Rather than reimplement an
 * origin with a measured offset — which needs a layout pass before the first
 * frame and is exactly the "motion-on frame before the answer lands" the V4
 * root exists to avoid — native takes the reduced-motion relief as its normal
 * entrance. Same duration, same easing, same "once, never on update".
 *
 * It is never removed entirely: an element that appears with no transition
 * reads as a glitch (`design.md` §36.10), so Reduce Motion shortens the fade to
 * `V4_MOTION.standard` rather than dropping it.
 */
function ChartRevealV4({ animate, children, style, }) {
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const enter = React.useRef(new react_native_1.Animated.Value(animate ? 0 : 1)).current;
    React.useEffect(() => {
        if (!animate) {
            enter.setValue(1);
            return;
        }
        const run = react_native_1.Animated.timing(enter, {
            toValue: 1,
            duration: reduced ? motion_v4_1.V4_MOTION.standard : motion_v4_1.V4_MOTION.enter,
            easing: motion_v4_1.EASING_ENTER,
            useNativeDriver: true,
        });
        run.start();
        // Stopped on unmount, not left running. A 400ms timer that outlives its
        // component is a state update on a dead tree in an app and a "Jest
        // environment torn down" in a spec — the same leak, seen from two ends.
        return () => run.stop();
    }, [animate, enter, reduced]);
    return (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [{ opacity: enter }, style], children: children });
}
/**
 * **V4 pie chart** — a part-to-whole figure that never cycles the palette, and
 * where a sixth slice is folded rather than repainted.
 *
 * Requires `react-native-svg` (§7 open question 6).
 *
 * Four things changed, in the order they matter.
 *
 * 1. **Colour stopped meaning two things at once.** The base cycled
 *    `['primary', 'accent', 'success', 'warn', 'danger']`, so slice three was
 *    painted `success` and slice five `danger` — a green-amber-red arc that
 *    protanopia and deuteranopia collapse almost completely, spent on regions
 *    where nothing was passing or failing. V4 takes the derived palette in
 *    assignment order and reserves the status hues for `tone` (§1 rule 3).
 * 2. **A sixth slice is folded, not wrapped — and not dimmed.** The base did
 *    something worse than wrapping: `sliceOpacity` stepped every wrapped slice
 *    down by `0.25`, so slice six was slice one at 75% and slice eleven was
 *    invisible. `chartSlotColor` throws past slot 5 instead, and
 *    {@link foldPieDataV4} makes sure it never has to.
 * 3. **The gap became a number with a reason.** The base had no separation at
 *    all on native — adjacent slices touched — where web at least drew a 1px
 *    hairline. `CHART_MARK.gap` of `palette.ring` (the page colour) is that
 *    idea at the measured width, and it is not decoration: the palette's worst
 *    adjacent CVD ΔE is 6.5, inside the 6–8 floor band, and that band is legal
 *    *only* with secondary encoding.
 * 4. **It became a figure.** Title, summary, caption and a legend carrying
 *    every slice's name and share — which is also how the sub-3:1 fills
 *    discharge their contrast-relief obligation (§4.8).
 */
function PieChartV4({ data, size = 160, title, summary, caption, legend, loading = false, emptyLabel, otherLabel = exports.PIE_OTHER_LABEL, animate = true, accessibilityLabel, style, }) {
    const { colors } = (0, theme_1.useXenitionTheme)();
    const palette = (0, internal_v4_1.useChartPaletteV4)();
    const fold = React.useMemo(() => foldPieDataV4(data, otherLabel), [data, otherLabel]);
    const frame = (plot, legendNode) => ((0, jsx_runtime_1.jsx)(ChartFigureV4, { title: title, summary: summary, caption: caption, legend: legendNode, style: style, children: plot }));
    if (loading)
        return frame((0, jsx_runtime_1.jsx)(ChartLoadingV4, { width: size, height: size }));
    if (fold.segments.length === 0 || fold.total <= 0) {
        return frame((0, jsx_runtime_1.jsx)(RadialEmptyV4, { label: emptyLabel, width: size, height: size }));
    }
    const cx = size / 2;
    const cy = size / 2;
    // Half the surface gap is spent outside every arc, so a 160 pie occupies 160.
    const r = size / 2 - v4_chart_1.CHART_MARK.gap / 2;
    const showLegend = legend ?? fold.segments.length > 1;
    const legendNode = showLegend ? ((0, jsx_runtime_1.jsx)(RadialLegendV4, { items: fold.segments.map((segment, i) => ({
            label: segmentLegendLabelV4(segment),
            slot: i,
            ...(segment.tone === undefined ? {} : { tone: segment.tone }),
            value: `${shareOfV4(segment.value, fold.total)}%`,
        })) })) : undefined;
    const top = fold.segments.reduce((a, b) => (b.value > a.value ? b : a));
    const spoken = accessibilityLabel ??
        `Pie chart, ${fold.segments.length} slice${fold.segments.length === 1 ? '' : 's'}, ` +
            `largest ${top.label} at ${shareOfV4(top.value, fold.total)}%` +
            (fold.foldedCount > 0
                ? `, ${fold.foldedCount} smaller categories folded into ${otherLabel}`
                : '');
    let angle = -Math.PI / 2;
    const only = fold.segments[0];
    return frame((0, jsx_runtime_1.jsx)(ChartRevealV4, { animate: animate, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: spoken, children: (0, jsx_runtime_1.jsx)(react_native_svg_1.default, { width: size, height: size, viewBox: `0 0 ${size} ${size}`, children: (0, jsx_runtime_1.jsx)(react_native_svg_1.G, { children: fold.segments.length === 1 ? (
                    // One non-zero segment is a whole ring, and an arc path cannot
                    // express 360° — its endpoints coincide and nothing is drawn.
                    // The circle is the shape that survives it, which matters at
                    // exactly the moment a filter narrows a chart to one category.
                    (0, jsx_runtime_1.jsx)(react_native_svg_1.Circle, { cx: cx, cy: cy, r: r, fill: segmentFillV4(palette, colors, only, 0) })) : (fold.segments.map((segment, i) => {
                        const a0 = angle;
                        const a1 = angle + (segment.value / fold.total) * Math.PI * 2;
                        angle = a1;
                        return ((0, jsx_runtime_1.jsx)(react_native_svg_1.Path, { d: wedgePathV4(cx, cy, r, a0, a1), fill: segmentFillV4(palette, colors, segment, i), stroke: palette.ring, strokeWidth: v4_chart_1.CHART_MARK.gap }, segment.label));
                    })) }) }) }) }), legendNode);
}
//# sourceMappingURL=PieChartV4.js.map