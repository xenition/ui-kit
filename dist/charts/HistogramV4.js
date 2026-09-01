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
exports.HistogramV4 = exports.HISTOGRAM_V4_CSS = exports.HISTOGRAM_V4_STYLE_ID = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const TextV4_1 = require("../primitives/TextV4");
const v4_chart_1 = require("../primitives/internal/v4-chart");
const internal_v4_1 = require("./internal-v4");
/** `count / ceiling`, clamped, and zero when the ceiling is not a usable divisor. */
function binRatio(value, ceiling) {
    if (!Number.isFinite(value) || !Number.isFinite(ceiling) || ceiling <= 0)
        return 0;
    return Math.min(Math.max(value / ceiling, 0), 1);
}
/** The largest finite bin, or 0 when there is nothing to measure. */
function ceilingOf(values, override) {
    if (override !== undefined && Number.isFinite(override))
        return override;
    const finite = values.filter((v) => Number.isFinite(v));
    return finite.length > 0 ? Math.max(...finite) : 0;
}
/**
 * How many bins pass between two drawn labels.
 *
 * Derived from {@link CHART_DIRECT_LABEL_MAX} rather than picked, so the number
 * of labels a histogram draws and the number of series a chart may direct-label
 * come from one decision instead of two that drift. Never below 1, so a
 * four-bin histogram labels every bin.
 */
function labelStride(count) {
    return Math.max(1, Math.ceil(count / v4_chart_1.CHART_DIRECT_LABEL_MAX));
}
/** The sentence a screen reader gets (brief §1 rule 6, §4.8). */
function histogramLabel(bins, title, format) {
    const finite = bins.filter((v) => Number.isFinite(v));
    const head = `Histogram${title ? `, ${title}` : ''}`;
    const count = `${bins.length} ${bins.length === 1 ? 'bin' : 'bins'}`;
    if (finite.length === 0)
        return `${head}, ${count}`;
    const lo = Math.min(...finite);
    const hi = Math.max(...finite);
    const range = lo === hi ? format(lo) : `${format(lo)} to ${format(hi)}`;
    return `${head}, ${count}, ${range}`;
}
/**
 * The custom property every mark in this chart reads its fill from.
 *
 * The palette reaches an element as `var(--xen-chart-1)`, and a `var()` in an
 * inline `background-color` is dropped outright by the jsdom CSSOM — the same
 * hazard `internal-v4.tsx` records against `color-mix()`. So the value goes
 * inline as a **custom property**, which no CSSOM validates, and one static
 * rule turns it into paint — which is also how every bin gets its colour from
 * one declaration instead of one string per bin.
 */
const MARK_FILL = '--xen-v4-mark-fill';
/** The one `<style>` id this component injects from. Idempotent. */
exports.HISTOGRAM_V4_STYLE_ID = 'xen-v4-histogram-styles';
/** Paint, keyed off the chart's own root attribute. */
exports.HISTOGRAM_V4_CSS = `
[data-xen-v4-histogram] [data-xen-v4-bin] { background-color: var(${MARK_FILL}); }
[data-xen-v4-histogram] [data-xen-v4-chart-axis] { background-color: ${internal_v4_1.CHART_AXIS_VAR}; }
[data-xen-v4-histogram] [data-xen-v4-chart-indicator] {
  width: ${v4_chart_1.CHART_MARK.dotSize}px;
  height: ${v4_chart_1.CHART_MARK.dotSize}px;
  border-radius: ${v4_chart_1.CHART_MARK.dotSize}px;
  background-color: var(${MARK_FILL});
}
`;
/**
 * **A histogram's bins sit flush.** The ruling on brief §4.4's "a
 * `CHART_MARK.gap` of surface separates adjacent bars", which Group B flagged
 * as producing a non-flush histogram — the opposite of what a distribution
 * should look like.
 *
 * The gap rule is about **categorical** bars. There, the gap is doing semantic
 * work: it says *these are separate things*, and it is one of the four
 * secondary encodings rule 5 obliges, because two adjacent fills a dichromat
 * reads as one colour are still visibly two bars when a hairline of page runs
 * between them.
 *
 * A histogram's bins are not separate things. They are **one continuous axis**
 * cut into buckets, and the bucket edges are adjacent by construction — the
 * right-hand edge of bin 3 *is* the left-hand edge of bin 4. Page between them
 * says there is a range of the variable that fell in neither bucket, which is
 * false for every histogram ever drawn. That is not a style preference; it is
 * the chart making a claim about the data that the data does not support, and
 * it is why every reference implementation of a histogram — and every
 * statistics textbook — draws the bars touching.
 *
 * Rule 5 is satisfied without the gap here anyway, and satisfied more cheaply
 * than anywhere else in the module: **a histogram is one series**, so colour is
 * not carrying identity at all and there is no adjacent pair for a reader to
 * confuse. The encoding a histogram needs is the step in the outline where one
 * bin's height meets the next, which flush bars give and a gap actually
 * weakens.
 *
 * Zero rather than "no `gap` property" so the bin row, the label row and the
 * press-bubble row read from one binding: the three are laid out with the same
 * flex rule and a gap on one of them silently misaligns a label from its bin.
 */
const BIN_GAP = 0;
/**
 * **V4 frequency histogram** — a distribution, which is the one bar form whose
 * colour question answers itself.
 *
 * **Bins are one series by definition.** A histogram counts one variable into
 * ordered buckets; there is no second identity to encode, so there is no second
 * colour to spend. The base takes `color?: ChartColor` and V4 takes a `tone`
 * that changes *which* single colour is used and never *how many* — because a
 * histogram painted five colours has invented five categories the data does not
 * have, and a histogram coloured by bin height has spent the identity channel
 * restating the bar length (brief §4.1).
 *
 * The rest of what the base got wrong:
 *
 * - **`stroke="var(--xen-surface)" strokeWidth={1}` between bins.** A stroke is
 *   centred on the edge, so it eats half a pixel of each neighbour and the two
 *   bins end up different widths. It is gone, and — see {@link BIN_GAP} —
 *   nothing replaces it: a histogram's bins are flush, because they are one
 *   continuous axis rather than a row of separate things.
 * - **`stroke="var(--xen-muted)"` as the axis.** `muted` is a text colour with
 *   no contrast promise as a rule. The axis is chrome and chrome is
 *   {@link CHART_AXIS_VAR} (brief §3.3).
 * - **Square tops.** `CHART_MARK.endRadius` at the data end only, so the family
 *   has one bar silhouette; the baseline stays square because a bar rounded
 *   there floats off its axis (brief §4.4).
 *
 * ## Bin labels thin, they do not rotate
 *
 * HIG's density rule: a chart stays simple and lets people ask for detail. A
 * rotated axis label is a chart admitting it has more labels than room, and it
 * costs every reader legibility to serve the few who wanted the twelfth bin's
 * edge. So a histogram draws every {@link labelStride}th label upright and
 * leaves the rest to the tooltip, which carries the precise count anyway.
 *
 * ## The one documented tap-target exception
 *
 * Brief §1 rule 10 names the histogram bin, alongside the heatmap cell, as the
 * place where density genuinely forbids 44 and HIG's absolute floor of 28
 * applies instead — and says the exception holds only where a component states
 * it. This is that statement. A bin's hit area is its full-height column slot:
 * at the default 120 height it clears 44 vertically, and horizontally it is
 * whatever twenty bins in a card leaves, which is the honest answer rather than
 * a padded rect that overlaps its neighbours and steals their presses.
 */
exports.HistogramV4 = React.forwardRef(function HistogramV4({ bins, labels, height = 120, max, tone, format = String, title, summary, caption, loading = false, emptyLabel = 'No data', animate = true, tooltip = true, onSelect, className, style, ...rest }, ref) {
    const chart = (0, internal_v4_1.useChartV4)();
    (0, inject_1.injectStyleOnce)(exports.HISTOGRAM_V4_STYLE_ID, exports.HISTOGRAM_V4_CSS);
    const [hovered, setHovered] = React.useState(null);
    const label = histogramLabel(bins, title, format);
    const fill = tone ? `var(--xen-${tone})` : (0, internal_v4_1.chartVar)(0);
    const header = title || summary || caption ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-col gap-xs", children: [title ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", numberOfLines: 1, children: title })) : null, summary ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", numeric: "tabular", children: summary })) : null, caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: caption })) : null] })) : null;
    const frame = (children) => ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-v4-histogram": "", ...chart.rootProps, style: { ...chart.rootProps.style, [MARK_FILL]: fill, ...style }, className: (0, cn_1.cn)('flex w-full flex-col gap-sm', className), ...rest, children: [header, children] }));
    if (loading) {
        return frame((0, jsx_runtime_1.jsx)("div", { "aria-busy": "true", "aria-label": label, role: "img", children: (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "100%", height: height }) }));
    }
    if (bins.length === 0)
        return frame((0, jsx_runtime_1.jsx)(internal_v4_1.ChartEmptyV4, { label: emptyLabel, height: height }));
    const ceiling = ceilingOf(bins, max);
    const stride = labelStride(bins.length);
    return frame((0, jsx_runtime_1.jsxs)("div", { role: "img", "aria-label": label, className: "flex w-full flex-col", style: { position: 'relative' }, children: [(0, jsx_runtime_1.jsxs)("div", { "data-xen-v4-chart": "", "data-xen-v4-chart-plot": "", ...(animate ? { 'data-animate': 'true' } : {}), className: "flex w-full flex-col", style: { height }, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex w-full flex-1 items-end", style: { gap: BIN_GAP }, children: bins.map((count, i) => ((0, jsx_runtime_1.jsx)("div", { "data-xen-v4-bin-hit": "", className: "flex h-full min-w-0 flex-1 cursor-default items-end", onPointerEnter: tooltip ? () => setHovered(i) : undefined, onPointerLeave: tooltip ? () => setHovered(null) : undefined, onClick: onSelect ? () => onSelect(i, count) : undefined, children: (0, jsx_runtime_1.jsx)("div", { "data-xen-v4-bin": "", className: "w-full", style: {
                                    height: `${binRatio(count, ceiling) * 100}%`,
                                    // `1` is the hairline exception in rule 1: an empty bin is
                                    // still a bin, and a gap in a distribution is information.
                                    minHeight: 1,
                                    borderTopLeftRadius: v4_chart_1.CHART_MARK.endRadius,
                                    borderTopRightRadius: v4_chart_1.CHART_MARK.endRadius,
                                } }) }, i))) }), (0, jsx_runtime_1.jsx)("div", { "data-xen-v4-chart-axis": "", style: { height: 1 } })] }), labels ? ((0, jsx_runtime_1.jsx)("div", { className: "flex w-full", style: { gap: BIN_GAP }, children: bins.map((_, i) => ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", align: "center", numberOfLines: 1, className: "min-w-0 flex-1", children: i % stride === 0 ? (labels[i] ?? '') : '' }, i))) })) : null, tooltip && hovered !== null && bins[hovered] !== undefined ? ((0, jsx_runtime_1.jsxs)("div", { "data-xen-v4-chart-tooltip": "", role: "presentation", className: "pointer-events-none absolute flex items-center gap-xs rounded-[var(--xen-radius-md)] border border-border bg-popover px-sm py-xs", style: {
                    left: `${((hovered + 0.5) / bins.length) * 100}%`,
                    top: 0,
                    transform: 'translateX(-50%)',
                }, children: [(0, jsx_runtime_1.jsx)("span", { "data-xen-v4-chart-indicator": "" }), (0, jsx_runtime_1.jsxs)(TextV4_1.TextV4, { size: "xs", tone: "onPopover", numeric: "tabular", children: [labels?.[hovered] ? `${labels[hovered]}: ` : '', format(bins[hovered])] })] })) : null] }));
});
//# sourceMappingURL=HistogramV4.js.map