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
exports.ColumnChartV4 = exports.COLUMN_CHART_V4_CSS = exports.COLUMN_CHART_V4_STYLE_ID = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const TextV4_1 = require("../primitives/TextV4");
const nav_v4_1 = require("../primitives/internal/nav-v4");
const v4_chart_1 = require("../primitives/internal/v4-chart");
const internal_v4_1 = require("./internal-v4");
/** `value / ceiling`, clamped, and zero when the ceiling is not a usable divisor. */
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
/** The sentence a screen reader gets (brief §1 rule 6, §4.8). */
function columnChartLabel(data, title, format) {
    const finite = data.map((d) => d.value).filter((v) => Number.isFinite(v));
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
 * rule turns it into paint.
 */
const MARK_FILL = '--xen-v4-mark-fill';
/** The one `<style>` id this component injects from. Idempotent. */
exports.COLUMN_CHART_V4_STYLE_ID = 'xen-v4-column-chart-styles';
/**
 * Paint, keyed off the chart's own root attribute so it cannot reach another
 * component's marks. The three chrome roles are distinct on purpose: the fill
 * is data, the track is grid, the baseline is axis (brief §3.3).
 */
exports.COLUMN_CHART_V4_CSS = `
[data-xen-v4-column-chart] [data-xen-v4-bar] { background-color: var(${MARK_FILL}); }
[data-xen-v4-column-chart] [data-xen-v4-chart-track] { background-color: ${internal_v4_1.CHART_GRID_VAR}; }
[data-xen-v4-column-chart] [data-xen-v4-chart-axis] { background-color: ${internal_v4_1.CHART_AXIS_VAR}; }
`;
/**
 * **V4 horizontal bar chart** — one labelled row per datum.
 *
 * What the base got wrong, in the order it misleads a reader:
 *
 * 1. **`color?: ChartColor` as an identity.** `colorVar(color)` paints every
 *    bar with a semantic slot, so a second chart on the page reached for `warn`
 *    and became a chart that reads as a warning. V4 has one categorical answer
 *    — slot 1 from the shared palette — and one status answer, `tone`, which is
 *    opt-in and means something (brief §1 rule 3, §4.3).
 * 2. **Never colour by value.** A bar's *length* already encodes magnitude
 *    (brief §4.1); spending the identity channel on it says nothing new. Every
 *    bar here is one colour.
 * 3. **`fill="var(--xen-border)"` as the track.** `border` is a hairline
 *    colour; a track is chrome, and chrome is {@link CHART_GRID_VAR} — the
 *    derived neutral at `CHART_GRID_MIX`, which follows the scheme with no dark
 *    rule of its own. The **baseline** is one step more present at
 *    {@link CHART_AXIS_VAR}, and this chart has a real one: a horizontal bar
 *    grows rightward from a vertical axis at x = 0, which the base drew as
 *    nothing at all.
 * 4. **`rx={5}` on both ends.** A bar rounded at the baseline floats off its
 *    axis. `CHART_MARK.endRadius` rounds the **data end only** (brief §4.4) —
 *    here the right edge — and the track is rounded to match so a full bar and
 *    its track share one silhouette.
 * 5. **`showValues` defaulting off.** The palette's worst adjacent CVD ΔE is
 *    6.5, inside the 6–8 floor band, and that band is legal only with a second
 *    channel. At four rows or fewer the value label is that channel and it is
 *    now on by default; above four it stays available and the row labels carry
 *    identity on their own.
 *
 * ## Rows, not marks
 *
 * This is the one chart in the bar family that is really a *list*, so each row
 * is a real hit target at the 44 floor (`MIN_TAP_CLASS`, rule 10) rather than a
 * 12px-tall SVG node with no padding, and the rows sit on the spacing rhythm
 * rather than on `CHART_MARK.gap`: the constant is the hairline of page between
 * two fills that would otherwise *touch*, and two labelled rows never touch.
 * The gap obligation is discharged with room to spare.
 */
exports.ColumnChartV4 = React.forwardRef(function ColumnChartV4({ data, max, barHeight = 12, showValues, tone, format = String, title, summary, caption, height = 120, loading = false, emptyLabel = 'No data', animate = true, tooltip = true, onSelect, className, style, ...rest }, ref) {
    const chart = (0, internal_v4_1.useChartV4)();
    (0, inject_1.injectStyleOnce)(exports.COLUMN_CHART_V4_STYLE_ID, exports.COLUMN_CHART_V4_CSS);
    const [hovered, setHovered] = React.useState(null);
    const label = columnChartLabel(data, title, format);
    const fill = tone ? `var(--xen-${tone})` : (0, internal_v4_1.chartVar)(0);
    const header = title || summary || caption ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-col gap-xs", children: [title ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", numberOfLines: 1, children: title })) : null, summary ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", numeric: "tabular", children: summary })) : null, caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: caption })) : null] })) : null;
    const frame = (children) => ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-v4-column-chart": "", ...chart.rootProps, style: { ...chart.rootProps.style, [MARK_FILL]: fill, ...style }, className: (0, cn_1.cn)('flex w-full flex-col gap-sm', className), ...rest, children: [header, children] }));
    if (loading) {
        return frame((0, jsx_runtime_1.jsx)("div", { "aria-busy": "true", "aria-label": label, role: "img", children: (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "100%", height: height }) }));
    }
    if (data.length === 0)
        return frame((0, jsx_runtime_1.jsx)(internal_v4_1.ChartEmptyV4, { label: emptyLabel, height: height }));
    const ceiling = ceilingOf(data.map((d) => d.value), max);
    const directLabels = showValues ?? data.length <= v4_chart_1.CHART_DIRECT_LABEL_MAX;
    return frame((0, jsx_runtime_1.jsx)("div", { role: "img", "aria-label": label, "data-xen-v4-chart": "", "data-xen-v4-chart-plot": "", ...(animate ? { 'data-animate': 'true' } : {}), className: "flex w-full flex-col gap-sm", children: data.map((d, i) => {
            const showValue = directLabels || (tooltip && hovered === i);
            return ((0, jsx_runtime_1.jsxs)("div", { "data-xen-v4-bar-hit": "", className: (0, cn_1.cn)('flex flex-col justify-center gap-xs', nav_v4_1.MIN_TAP_CLASS), onPointerEnter: tooltip ? () => setHovered(i) : undefined, onPointerLeave: tooltip ? () => setHovered(null) : undefined, onClick: onSelect ? () => onSelect(i, d.value) : undefined, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, className: "min-w-0 flex-1", children: d.label }), showValue ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { "data-xen-v4-chart-value": "", "data-reveal": directLabels ? undefined : 'hover', size: "xs", tone: "mutedText", numeric: "tabular", className: "shrink-0", children: format(d.value) })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex w-full items-stretch", children: [(0, jsx_runtime_1.jsx)("div", { "data-xen-v4-chart-axis": "", style: { width: 1 } }), (0, jsx_runtime_1.jsx)("div", { "data-xen-v4-chart-track": "", className: "min-w-0 flex-1", style: {
                                    height: barHeight,
                                    borderTopRightRadius: v4_chart_1.CHART_MARK.endRadius,
                                    borderBottomRightRadius: v4_chart_1.CHART_MARK.endRadius,
                                }, children: (0, jsx_runtime_1.jsx)("div", { "data-xen-v4-bar": "", style: {
                                        width: `${barRatio(d.value, ceiling) * 100}%`,
                                        height: '100%',
                                        // `1` is the hairline exception in rule 1: a datum that
                                        // exists should be visible as a datum even at 0.
                                        minWidth: 1,
                                        borderTopRightRadius: v4_chart_1.CHART_MARK.endRadius,
                                        borderBottomRightRadius: v4_chart_1.CHART_MARK.endRadius,
                                    } }) })] })] }, i));
        }) }));
});
//# sourceMappingURL=ColumnChartV4.js.map