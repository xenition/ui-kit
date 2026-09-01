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
exports.BarChartV4 = exports.BAR_CHART_V4_CSS = exports.BAR_CHART_V4_STYLE_ID = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const TextV4_1 = require("../primitives/TextV4");
const v4_chart_1 = require("../primitives/internal/v4-chart");
const internal_v4_1 = require("./internal-v4");
/**
 * `value / ceiling`, clamped, and **zero when the ceiling is not a usable
 * divisor**.
 *
 * The base charts route this through `safeMax`, which floors the ceiling at 1
 * — so a chart of `[0]` renders a bar at 0/1 and a chart of `[0.4]` renders one
 * at 40% of the plot, which is a lie about a single-datum series. Guarding the
 * divisor here instead keeps the honest answer (a flat chart is flat) and still
 * never produces `NaN` or `Infinity`, which is the single-datum defect the
 * spec asserts against.
 */
function barRatio(value, ceiling) {
    if (!Number.isFinite(value) || !Number.isFinite(ceiling) || ceiling <= 0)
        return 0;
    return Math.min(Math.max(value / ceiling, 0), 1);
}
/** The largest finite datum, or 0 when there is nothing to measure. */
function ceilingOf(values, override) {
    if (override !== undefined && Number.isFinite(override))
        return override;
    const finite = values.filter((v) => Number.isFinite(v));
    return finite.length > 0 ? Math.max(...finite) : 0;
}
/**
 * The sentence a screen reader gets (brief §1 rule 6, §4.8).
 *
 * HIG is explicit that a rendered chart plus a visible title is *not*
 * accessible — the textual representation is the accessibility story. So the
 * default names the form, the headline, the count and the range, and it
 * singularises at one datum rather than announcing "1 bars".
 */
function barChartLabel(data, title, format) {
    const finite = data.filter((v) => Number.isFinite(v));
    const head = `Bar chart${title ? `, ${title}` : ''}`;
    const count = `${data.length} ${data.length === 1 ? 'bar' : 'bars'}`;
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
 * rule turns it into paint. It is also how the fill reaches four different
 * elements (the bars, the tooltip's swatch) from one declaration on the root
 * rather than four copies of the same string.
 */
const MARK_FILL = '--xen-v4-mark-fill';
/** The one `<style>` id this component injects from. Idempotent. */
exports.BAR_CHART_V4_STYLE_ID = 'xen-v4-bar-chart-styles';
/**
 * Paint, keyed off the chart's own root attribute so it cannot reach another
 * component's marks. Every number in it is `CHART_MARK`, interpolated rather
 * than retyped (brief §1 rule 1).
 */
exports.BAR_CHART_V4_CSS = `
[data-xen-v4-bar-chart] [data-xen-v4-bar] { background-color: var(${MARK_FILL}); }
[data-xen-v4-bar-chart] [data-xen-v4-chart-axis] { background-color: ${internal_v4_1.CHART_AXIS_VAR}; }
[data-xen-v4-bar-chart] [data-xen-v4-chart-indicator] { width: ${v4_chart_1.CHART_MARK.dotSize}px; }
[data-xen-v4-bar-chart] [data-xen-v4-chart-indicator][data-shape="dot"] {
  height: ${v4_chart_1.CHART_MARK.dotSize}px;
  border-radius: ${v4_chart_1.CHART_MARK.dotSize}px;
  background-color: var(${MARK_FILL});
}
[data-xen-v4-bar-chart] [data-xen-v4-chart-indicator][data-shape="line"] {
  border-top: ${v4_chart_1.CHART_MARK.stroke}px solid var(${MARK_FILL});
}
[data-xen-v4-bar-chart] [data-xen-v4-chart-indicator][data-shape="dashed"] {
  border-top: ${v4_chart_1.CHART_MARK.stroke}px dashed var(${MARK_FILL});
}
`;
/**
 * **V4 vertical bar chart** — the bar family's reference implementation, and
 * where four of the brief's rules land at once.
 *
 * The base is five decisions the V4 line exists to retire:
 *
 * 1. **`color?: ChartColor` as an identity.** The base takes `'primary' |
 *    'accent' | 'success' | 'warn' | 'danger'` and paints every bar with it, so
 *    a caller who wanted a second bar chart on the page reached for `warn` and
 *    got a chart that reads as a warning. V4 has one categorical answer — slot
 *    1, from the shared palette — and one status answer, {@link
 *    BarChartV4Props.tone}, which is opt-in and means something (brief §1
 *    rule 3, §4.3).
 * 2. **Colour by value.** Brief §4.1 forbids it and this component is where the
 *    temptation is strongest: bar *length* already encodes magnitude, so
 *    spending the identity channel on it says nothing new and costs the reader
 *    the one channel that could have told two series apart. A single-series bar
 *    chart is **one colour** for every bar.
 * 3. **`stroke="var(--xen-muted)"` as the axis.** `muted` is a *text* colour
 *    with no contrast promise as a rule; the axis is chrome, and chrome is
 *    {@link CHART_AXIS_VAR} — the derived neutral at `CHART_AXIS_MIX`, one step
 *    more present than the grid behind it (brief §3.3).
 * 4. **`rx={2}` on the whole rect.** A bar rounded at the baseline floats off
 *    its axis. `CHART_MARK.endRadius` rounds the **data end only** (brief
 *    §4.4), which is the difference between a bar that sits on an axis and a
 *    lozenge hovering near one.
 * 5. **No secondary encoding.** The palette's worst adjacent CVD ΔE is 6.5,
 *    inside the 6–8 floor band, and that band is legal only with a second
 *    channel. Here it is `CHART_MARK.gap` of page between adjacent bars plus
 *    direct value labels at four bars or fewer.
 *
 * ## Why this twin is flex and not `<svg>`
 *
 * The base draws `<rect>`s into a 320-unit viewBox under
 * `preserveAspectRatio="none"`, which scales x and y by different factors the
 * moment the container is not 320 wide. Under that transform `CHART_MARK.gap`
 * is not 2px and `CHART_MARK.endRadius` is not a 4px corner — both are
 * whatever the container width happens to make them, and the corner comes out
 * as a stretched ellipse. Those two constants are the *whole* mark spec for
 * this family, so a rendering that cannot honour them exactly is not an
 * implementation of it.
 *
 * Laying the bars out as flex children instead keeps both in real pixels, makes
 * each bar a genuine hit target rather than an SVG node with no padding, and
 * costs nothing: a bar chart has no curves, no path data and no clipping. The
 * line family keeps its SVG, because a polyline genuinely needs one. The
 * palette plumbing is unchanged either way — {@link useChartV4} puts the custom
 * properties on the root and `[data-xen-v4-chart]` picks the scheme in CSS, on
 * a `<div>` exactly as on an `<svg>`.
 *
 * ## Tap targets
 *
 * Rule 10 asks for 44 of hit area on anything a pointer can hit. Each bar's hit
 * area is its full-height column slot, so at the default 120 height it clears
 * 44 on the vertical axis and takes the whole slot on the horizontal — which is
 * the most a bar chart can offer, since 12 bars in a 320-wide card cannot each
 * be 44 wide. A chart with more bars than its width can carry is a composition
 * problem (facet it, or bin it into a {@link HistogramV4}), not a padding one.
 */
exports.BarChartV4 = React.forwardRef(function BarChartV4({ data, labels, height = 120, max, tone, showValues, format = String, title, summary, caption, loading = false, emptyLabel = 'No data', animate = true, tooltip = true, indicator = 'dot', onSelect, className, style, ...rest }, ref) {
    // Hooks run before every early return — `useChartV4` injects the sheet and
    // memoises the palette, and a component that skips it on the empty path has
    // a different hook count on its next render.
    const chart = (0, internal_v4_1.useChartV4)();
    (0, inject_1.injectStyleOnce)(exports.BAR_CHART_V4_STYLE_ID, exports.BAR_CHART_V4_CSS);
    const [hovered, setHovered] = React.useState(null);
    const label = barChartLabel(data, title, format);
    // Status is a *fill* here (rule 3): the bar is painted with it, and the
    // direct label beside it is what discharges the "never colour alone"
    // obligation. Without a tone the answer is slot 1, always — never a cycle,
    // never the value.
    const fill = tone ? `var(--xen-${tone})` : (0, internal_v4_1.chartVar)(0);
    const header = title || summary || caption ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-col gap-xs", children: [title ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", numberOfLines: 1, children: title })) : null, summary ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", numeric: "tabular", children: summary })) : null, caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: caption })) : null] })) : null;
    const frame = (children) => ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-v4-bar-chart": "", ...chart.rootProps, style: { ...chart.rootProps.style, [MARK_FILL]: fill, ...style }, className: (0, cn_1.cn)('flex w-full flex-col gap-sm', className), ...rest, children: [header, children] }));
    // Loading and empty both keep the plot's footprint. A chart that collapses to
    // zero height while its data is in flight is the single most common dashboard
    // jank and is free to avoid (brief §4.5).
    if (loading) {
        return frame((0, jsx_runtime_1.jsx)("div", { "aria-busy": "true", "aria-label": label, role: "img", children: (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "100%", height: height }) }));
    }
    if (data.length === 0)
        return frame((0, jsx_runtime_1.jsx)(internal_v4_1.ChartEmptyV4, { label: emptyLabel, height: height }));
    const ceiling = ceilingOf(data, max);
    const directLabels = showValues ?? data.length <= v4_chart_1.CHART_DIRECT_LABEL_MAX;
    return frame((0, jsx_runtime_1.jsxs)("div", { role: "img", "aria-label": label, className: "flex w-full flex-col", style: { position: 'relative' }, children: [(0, jsx_runtime_1.jsxs)("div", { "data-xen-v4-chart": "", "data-xen-v4-chart-plot": "", ...(animate ? { 'data-animate': 'true' } : {}), className: "flex w-full flex-col", style: { height }, children: [directLabels ? ((0, jsx_runtime_1.jsx)("div", { className: "flex w-full", style: { gap: v4_chart_1.CHART_MARK.gap }, children: data.map((value, i) => ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { "data-xen-v4-chart-value": "", size: "xs", tone: "mutedText", align: "center", numeric: "tabular", className: "min-w-0 flex-1 truncate", children: format(value) }, i))) })) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex w-full flex-1 items-end", style: { gap: v4_chart_1.CHART_MARK.gap }, children: data.map((value, i) => ((0, jsx_runtime_1.jsx)("div", { "data-xen-v4-bar-hit": "", className: "flex h-full min-w-0 flex-1 cursor-default items-end", onPointerEnter: tooltip ? () => setHovered(i) : undefined, onPointerLeave: tooltip ? () => setHovered(null) : undefined, onClick: onSelect ? () => onSelect(i, value) : undefined, children: (0, jsx_runtime_1.jsx)("div", { "data-xen-v4-bar": "", className: "w-full", style: {
                                    height: `${barRatio(value, ceiling) * 100}%`,
                                    // `1` is the hairline exception in rule 1: a zero-height bar
                                    // is invisible, and a datum that exists should be visible as
                                    // a datum even when its value is 0.
                                    minHeight: 1,
                                    borderTopLeftRadius: v4_chart_1.CHART_MARK.endRadius,
                                    borderTopRightRadius: v4_chart_1.CHART_MARK.endRadius,
                                } }) }, i))) }), (0, jsx_runtime_1.jsx)("div", { "data-xen-v4-chart-axis": "", style: { height: 1 } })] }), labels ? ((0, jsx_runtime_1.jsx)("div", { className: "flex w-full", style: { gap: v4_chart_1.CHART_MARK.gap }, children: labels.map((l, i) => ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", align: "center", numberOfLines: 1, className: "min-w-0 flex-1", children: l }, i))) })) : null, tooltip && hovered !== null && data[hovered] !== undefined ? ((0, jsx_runtime_1.jsxs)("div", { "data-xen-v4-chart-tooltip": "", role: "presentation", className: "pointer-events-none absolute flex items-center gap-xs rounded-[var(--xen-radius-md)] border border-border bg-popover px-sm py-xs", style: {
                    left: `${((hovered + 0.5) / data.length) * 100}%`,
                    top: 0,
                    transform: 'translateX(-50%)',
                }, children: [(0, jsx_runtime_1.jsx)("span", { "data-xen-v4-chart-indicator": "", "data-shape": indicator }), (0, jsx_runtime_1.jsxs)(TextV4_1.TextV4, { size: "xs", tone: "onPopover", numeric: "tabular", children: [labels?.[hovered] ? `${labels[hovered]}: ` : '', format(data[hovered])] })] })) : null] }));
});
//# sourceMappingURL=BarChartV4.js.map