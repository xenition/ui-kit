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
exports.RangeBarV4 = exports.RANGE_BAR_V4_CSS = exports.RANGE_BAR_V4_STYLE_ID = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const TextV4_1 = require("../primitives/TextV4");
const nav_v4_1 = require("../primitives/internal/nav-v4");
const v4_chart_1 = require("../primitives/internal/v4-chart");
const internal_v4_1 = require("./internal-v4");
/** Where a domain value falls on the track, as a fraction in `[0, 1]`. */
function position(value, domainMin, span) {
    if (!Number.isFinite(value) || span <= 0)
        return 0;
    return Math.min(Math.max((value - domainMin) / span, 0), 1);
}
/** The sentence a screen reader gets (brief §1 rule 6, §4.8). */
function rangeBarLabel(lo, hi, domainMin, domainMax, title, format) {
    const head = `Range bar${title ? `, ${title}` : ''}`;
    const range = lo === hi ? format(lo) : `${format(lo)} to ${format(hi)}`;
    return `${head}, ${range}, on a scale of ${format(domainMin)} to ${format(domainMax)}`;
}
/**
 * The custom property the range mark reads its fill from.
 *
 * The palette reaches an element as `var(--xen-chart-1)`, and a `var()` in an
 * inline `background-color` is dropped outright by the jsdom CSSOM — the same
 * hazard `internal-v4.tsx` records against `color-mix()`. So the value goes
 * inline as a **custom property**, which no CSSOM validates, and one static
 * rule turns it into paint.
 */
const MARK_FILL = '--xen-v4-mark-fill';
/** The one `<style>` id this component injects from. Idempotent. */
exports.RANGE_BAR_V4_STYLE_ID = 'xen-v4-range-bar-styles';
/**
 * Paint, keyed off the chart's own root attribute. Three chrome roles, kept
 * distinct: the range is data, the track is grid, the domain rule is axis
 * (brief §3.3).
 */
exports.RANGE_BAR_V4_CSS = `
[data-xen-v4-range-bar] [data-xen-v4-range] { background-color: var(${MARK_FILL}); }
[data-xen-v4-range-bar] [data-xen-v4-chart-track] { background-color: ${internal_v4_1.CHART_GRID_VAR}; }
[data-xen-v4-range-bar] [data-xen-v4-chart-axis] { background-color: ${internal_v4_1.CHART_AXIS_VAR}; }
`;
/**
 * **V4 floating bar** — one band, `start` to `end`, on a domain.
 *
 * Web has never had this component. `RangeBar` exists only under
 * `native/charts/`, which is why `COMPONENTS.md` counts 20 and the web module
 * ships 16 (brief §6). It is built here as V4 only — there is no base to
 * mirror, so there is no base to write — with the native props verbatim and
 * `className` in place of `style`.
 *
 * **This is the one bar form rounded at both ends**, and the reason is worth
 * stating because it is the exception that proves brief §4.4's rule. Every
 * other bar in this family has a baseline: it grows from zero, and rounding the
 * end it grows *from* lifts it off its own axis. A range bar has no baseline.
 * Both of its ends are data — `start` is as much a measurement as `end` — so
 * `CHART_MARK.endRadius` applies to both, and a square end here would read as a
 * bar that had been clipped rather than one that had been measured.
 *
 * What it takes from the shared decisions:
 *
 * - **Track from {@link CHART_GRID_VAR}**, not `colors.border`. The native base
 *   paints `colors.border` — a hairline colour doing a fill's job, and one that
 *   does not follow the scheme the way the derived chrome neutral does.
 * - **The domain axis from {@link CHART_AXIS_VAR}**, one step more present than
 *   the track behind it (brief §3.3). The native base draws no axis at all, so
 *   its range floats on a grey pill with nothing to read it against.
 * - **Slot 1, or a `tone`.** Never `color?: ChartColor` as an identity: the
 *   native base's `color = 'primary'` default is a semantic slot standing in
 *   for a series colour, which is what brief §1 rule 2 exists to retire.
 * - **A zero-width range is a point, not nothing.** `start === end` is a real
 *   reading — a distribution collapsed to one value — so the mark floors at
 *   `CHART_MARK.dotSize`, this line's smallest painted point, rather than at
 *   the 1px hairline that would make it look like a rendering artefact.
 *
 * The value labels sit **under the axis** rather than floating over the mark.
 * Centring an unmeasured label over a percentage offset is not something React
 * Native can do without measuring first, and a twin pair where one platform
 * labels in place and the other labels underneath is a parity break dressed up
 * as a platform difference.
 */
exports.RangeBarV4 = React.forwardRef(function RangeBarV4({ start, end, domainMin = 0, domainMax = 100, height = 10, tone, showValues = true, format = String, title, summary, caption, loading = false, emptyLabel = 'No data', animate = true, tooltip = true, onSelect, className, style, ...rest }, ref) {
    const chart = (0, internal_v4_1.useChartV4)();
    (0, inject_1.injectStyleOnce)(exports.RANGE_BAR_V4_STYLE_ID, exports.RANGE_BAR_V4_CSS);
    const [hovered, setHovered] = React.useState(false);
    const lo = Math.min(start, end);
    const hi = Math.max(start, end);
    const label = rangeBarLabel(lo, hi, domainMin, domainMax, title, format);
    const fill = tone ? `var(--xen-${tone})` : (0, internal_v4_1.chartVar)(0);
    const header = title || summary || caption ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-col gap-xs", children: [title ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", numberOfLines: 1, children: title })) : null, summary ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", numeric: "tabular", children: summary })) : null, caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: caption })) : null] })) : null;
    const frame = (children) => ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-v4-range-bar": "", ...chart.rootProps, style: { ...chart.rootProps.style, [MARK_FILL]: fill, ...style }, className: (0, cn_1.cn)('flex w-full flex-col gap-sm', className), ...rest, children: [header, children] }));
    if (loading) {
        return frame((0, jsx_runtime_1.jsx)("div", { "aria-busy": "true", "aria-label": label, role: "img", children: (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "100%", height: height }) }));
    }
    const span = domainMax - domainMin;
    // Not-a-number endpoints and an inverted or collapsed domain are all the same
    // picture: a track with nothing readable on it. The base divides by
    // `Math.max(domainMax - domainMin, 1)` and draws a mark anyway, which puts a
    // confident-looking band at an arbitrary place (brief §4.5).
    if (!Number.isFinite(lo) || !Number.isFinite(hi) || !Number.isFinite(span) || span <= 0) {
        return frame((0, jsx_runtime_1.jsx)(internal_v4_1.ChartEmptyV4, { label: emptyLabel, height: height }));
    }
    const left = position(lo, domainMin, span);
    const right = position(hi, domainMin, span);
    const showRange = showValues || (tooltip && hovered);
    return frame((0, jsx_runtime_1.jsxs)("div", { role: "img", "aria-label": label, className: "flex w-full flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("div", { "data-xen-v4-chart": "", "data-xen-v4-chart-plot": "", ...(animate ? { 'data-animate': 'true' } : {}), className: (0, cn_1.cn)('flex w-full items-center', nav_v4_1.MIN_TAP_CLASS), onPointerEnter: tooltip ? () => setHovered(true) : undefined, onPointerLeave: tooltip ? () => setHovered(false) : undefined, onClick: onSelect ? () => onSelect(lo, hi) : undefined, children: (0, jsx_runtime_1.jsx)("div", { "data-xen-v4-chart-track": "", className: "relative w-full", style: { height, borderRadius: v4_chart_1.CHART_MARK.endRadius }, children: (0, jsx_runtime_1.jsx)("div", { "data-xen-v4-range": "", "data-xen-v4-chart-fill": "", className: "absolute top-0", style: {
                            left: `${left * 100}%`,
                            width: `${(right - left) * 100}%`,
                            height: '100%',
                            // A range of zero width is a point, and a point in this line is
                            // `dotSize` — below that it stops reading as a mark at all.
                            minWidth: v4_chart_1.CHART_MARK.dotSize,
                            // Both ends, and only here: neither end of a range is a baseline.
                            borderRadius: v4_chart_1.CHART_MARK.endRadius,
                        } }) }) }), (0, jsx_runtime_1.jsx)("div", { "data-xen-v4-chart-axis": "", style: { height: 1 } }), showRange ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex w-full items-baseline justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: format(domainMin) }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { "data-xen-v4-chart-value": "", size: "xs", tone: "mutedText", weight: "semibold", numeric: "tabular", children: lo === hi ? format(lo) : `${format(lo)}–${format(hi)}` }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: format(domainMax) })] })) : null] }));
});
//# sourceMappingURL=RangeBarV4.js.map