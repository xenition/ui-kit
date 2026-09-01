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
exports.ComparisonBarsV4 = exports.COMPARISON_BARS_V4_CSS = exports.COMPARISON_BARS_V4_STYLE_ID = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const TextV4_1 = require("../primitives/TextV4");
const v4_chart_1 = require("../primitives/internal/v4-chart");
const internal_v4_1 = require("./internal-v4");
const LegendV4_1 = require("./LegendV4");
/** The one `<style>` id this component injects from. Idempotent. */
exports.COMPARISON_BARS_V4_STYLE_ID = 'xen-v4-comparison-bars-styles';
/**
 * The bar fill and the baseline, as a sheet reading element-scoped custom
 * properties.
 *
 * The obvious spelling — `style={{ backgroundColor: chartVar(si) }}` — is wrong
 * for the reason `internal/nav-v4.ts`, `internal/row-v4.ts` and the V4 surfaces
 * all use sheets: **a CSSOM that does not parse `var()` drops the declaration
 * from an inline `style` outright.** jsdom is one such CSSOM and so is every
 * SSR style extractor built on one, so the bars would come out colourless in a
 * snapshot and in server-rendered HTML before hydration.
 *
 * A *custom* property survives, because React sets it with `setProperty` and a
 * custom property has no value grammar to fail. So the bar carries the choice
 * and this sheet paints it — and the choice still runs through `chartVar`, so
 * the five-slot throw is intact, which a sheet keyed by slot number would have
 * quietly lost.
 */
exports.COMPARISON_BARS_V4_CSS = `
[data-xen-v4-bar] {
  background-color: var(--xen-bar-fill);
}
[data-xen-v4-comparison-axis] {
  background-color: var(--xen-chart-axis);
}
`;
/**
 * **V4 grouped comparison bars** — native-only until this pass; this is the web
 * twin, built as V4 with no base to mirror (§6).
 *
 * ## Why this one is flex and not SVG
 *
 * The rest of the web module draws into an inline `<svg>`, and this component
 * deliberately does not. A grouped bar chart is a nested list of rectangles
 * whose *gaps carry meaning* — `CHART_MARK.gap` inside a group, a full spacing
 * step between groups — and a flex row expresses exactly that, in tokens, with
 * the group labels sharing the same flex distribution as the bars they name. In
 * an SVG every one of those gaps would become arithmetic in a `viewBox`, and
 * the group labels would need `<text>` with a font size that no longer follows
 * the type scale.
 *
 * The second reason is parity. §6 says the four new web components take the
 * native props verbatim, and the native twin is `View`/flex; two twins built on
 * one layout model cannot drift the way an SVG and a flex stack would.
 *
 * ## The descending-opacity trick is retired
 *
 * The native base cycles two theme colours and then falls back to
 * `OPACITY_STEPS = [1, 0.6, 0.35, 0.2]`. Three things are wrong with it, and
 * they are the same three the palette module was written to end:
 *
 * 1. **A fourth series at 0.2 alpha reads as disabled**, because 0.38 alpha is
 *    exactly what disabled content is drawn at in this kit. The chart says
 *    "this series is switched off" when it means "this series is fourth".
 * 2. **Alpha is not a separable channel from lightness.** Two series at 0.6 and
 *    0.35 of one hue differ only in lightness, which is the *one* channel the
 *    palette deliberately reserves to keep adjacent slots apart for a dichromat
 *    — so the trick spends the safety margin rather than adding to it.
 * 3. **It cycles.** `seriesColors[si % seriesColors.length]` paints the third
 *    series the first colour again, at a different alpha, which is two
 *    encodings for one fact and neither is legible.
 *
 * V4 takes a slot per series in assignment order, and **folds past the fifth**
 * rather than reaching for a sixth. `chartVar(5)` still throws — asking the
 * palette for a slot it does not have is a mistake in the caller's own code —
 * but a grouped bar chart's series count arrives with the DATA, and a
 * `RangeError` out of render takes the page down. `foldChartSeries` in
 * `primitives/internal/v4-chart.ts` draws that line: the primitive throws, the
 * component folds. The tail's bars share the last slot and the legend carries
 * one row named `CHART_OVERFLOW_LABEL`.
 *
 * The bars are not summed. A group's bars are being *compared*, not composed,
 * so a bar whose height is the sum of the sixth and seventh series would be
 * taller than either and would read as a bigger measurement rather than as a
 * residual — the opposite of what a fold should say.
 *
 * ## The two gaps are the secondary encoding
 *
 * Rule 5 requires it and §5 names it for this component specifically:
 * `CHART_MARK.gap` of page between bars *inside* a group, and a full
 * `spacing.md` between groups. That difference is what makes the grouping
 * readable without colour at all — a reader counts three bars, a space, three
 * bars. The base used a bare `gap: 2` inside groups and `spacing.sm` between
 * them, which is nearly the same ratio arrived at by accident; this is the same
 * idea with both numbers traceable.
 *
 * ## Marks
 *
 * `CHART_MARK.endRadius` at the **data end only** (§4.4). A bar rounded at the
 * baseline floats off its axis, which is precisely what the base does — it sets
 * `borderTopLeftRadius`/`borderTopRightRadius` correctly, and that is the one
 * thing it got right, kept here. The baseline itself is `CHART_AXIS_VAR` at
 * `CHART_MARK.stroke`; the base painted it `colors.muted`, a *text* colour
 * doing an axis's job (§3).
 */
exports.ComparisonBarsV4 = React.forwardRef(function ComparisonBarsV4({ data, series, max, height = 120, title, summary, caption, legend, tooltip = true, showValues, valueFormat = String, onBarSelect, loading = false, emptyLabel = 'No data', animate = true, className, 'aria-label': ariaLabel, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(exports.COMPARISON_BARS_V4_STYLE_ID, exports.COMPARISON_BARS_V4_CSS);
    const chart = (0, internal_v4_1.useChartV4)(animate);
    const seriesCount = series?.length ?? (data.length === 0 ? 0 : Math.max(...data.map((g) => g.values.length), 0));
    const resolved = series ??
        Array.from({ length: seriesCount }, (_, i) => ({
            key: `series-${i + 1}`,
            label: `Series ${i + 1}`,
        }));
    const header = title !== undefined || summary !== undefined ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-col gap-xs", children: [title !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", children: title })) : null, summary !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", numeric: "tabular", children: summary })) : null] })) : null;
    const footer = caption !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: caption })) : null;
    const frameClass = (0, cn_1.cn)('flex w-full flex-col gap-md', className);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: frameClass, ...rest, children: [header, (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "100%", height: height }), footer] }));
    }
    if (data.length === 0 || seriesCount === 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: frameClass, ...rest, children: [header, (0, jsx_runtime_1.jsx)(internal_v4_1.ChartEmptyV4, { label: emptyLabel, height: height }), footer] }));
    }
    const values = data.flatMap((g) => g.values).filter(Number.isFinite);
    const ceiling = Math.max(max ?? (values.length > 0 ? Math.max(...values) : 0), 0);
    const lowest = values.length > 0 ? Math.min(...values) : 0;
    const labelled = showValues ?? data.length <= v4_chart_1.CHART_DIRECT_LABEL_MAX;
    const label = ariaLabel ??
        `Grouped bar chart${title !== undefined ? `, ${title}` : ''}, ${data.length} groups, ` +
            `${resolved.length} series, ${valueFormat(lowest)} to ${valueFormat(ceiling)}.`;
    /*
      Past the palette's five slots the tail shares the last one. See the
      component doc: the primitive throws, the component folds, and a grouped
      bar chart's series count is data.
    */
    const fold = (0, v4_chart_1.foldChartSeries)(resolved);
    const slotOf = (si) => Math.min(si, v4_chart_1.CHART_SERIES_COUNT - 1);
    /**
     * A series' fill. Resolved through `chartVar` on the **folded** slot, so
     * the five-slot rule stays live even for a series whose bars all happen to
     * be zero, and a sixth series shares the fifth slot rather than throwing.
     */
    const fillOf = (si) => resolved[si]?.tone !== undefined
        ? `var(--xen-${resolved[si]?.tone})`
        : (0, internal_v4_1.chartVar)(slotOf(si));
    const legendItems = fold.didFold
        ? [
            ...fold.kept.map((s, i) => ({
                label: s.label,
                slot: i,
                ...(s.tone !== undefined ? { tone: s.tone } : {}),
            })),
            {
                label: `${v4_chart_1.CHART_OVERFLOW_LABEL} (${fold.folded.length} series)`,
                slot: v4_chart_1.CHART_SERIES_COUNT - 1,
            },
        ]
        : resolved.map((s, i) => ({
            label: s.label,
            slot: i,
            ...(s.tone !== undefined ? { tone: s.tone } : {}),
        }));
    const showLegend = legend ?? resolved.length >= 2;
    /** Every group renders the same column structure so the rows stay aligned. */
    const columns = (render) => data.map((group, gi) => ((0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1", style: { gap: v4_chart_1.CHART_MARK.gap }, children: resolved.map((_, si) => ((0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 flex-col items-center justify-end", children: render(gi, si, group.values[si] ?? 0) }, si))) }, gi)));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-v4-chart": "", style: chart.rootProps.style, className: frameClass, ...rest, children: [header, (0, jsx_runtime_1.jsxs)("div", { ...chart.rootProps, role: "img", "aria-label": label, className: "flex flex-col gap-xs", children: [labelled ? ((0, jsx_runtime_1.jsx)("div", { className: "flex gap-md", "aria-hidden": "true", children: columns((_gi, _si, value) => ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: valueFormat(value) }))) })) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex items-end gap-md", style: { height }, children: columns((gi, si, value) => {
                            // A zero ceiling has no scale to map onto; every bar is then the
                            // hairline that says "nothing here", not a divide-by-zero.
                            const ratio = ceiling === 0 ? 0 : Math.min(Math.max(value / ceiling, 0), 1);
                            return ((0, jsx_runtime_1.jsx)("div", { "data-xen-v4-bar": "", "data-group": gi, "data-series": si, role: onBarSelect !== undefined ? 'button' : undefined, tabIndex: onBarSelect !== undefined ? 0 : undefined, "aria-label": onBarSelect !== undefined
                                    ? `${data[gi]?.label ?? ''} ${resolved[si]?.label ?? ''}: ${valueFormat(value)}`
                                    : undefined, onClick: onBarSelect !== undefined ? () => onBarSelect(gi, si, value) : undefined, className: "w-full", title: tooltip
                                    ? `${data[gi]?.label ?? ''} ${resolved[si]?.label ?? ''}: ${valueFormat(value)}`
                                    : undefined, style: {
                                    // A bar for a real value is never invisible: the floor is
                                    // a hairline, which is what "present but tiny" looks like.
                                    height: Math.max(ratio * height, 1),
                                    '--xen-bar-fill': fillOf(si),
                                    // §4.4: the rounded end is the DATA end. A bar rounded at
                                    // the baseline floats off its axis.
                                    borderTopLeftRadius: v4_chart_1.CHART_MARK.endRadius,
                                    borderTopRightRadius: v4_chart_1.CHART_MARK.endRadius,
                                    cursor: onBarSelect !== undefined ? 'pointer' : undefined,
                                } }));
                        }) }), (0, jsx_runtime_1.jsx)("div", { "data-xen-v4-comparison-axis": "", style: { height: v4_chart_1.CHART_MARK.stroke } }), (0, jsx_runtime_1.jsx)("div", { className: "flex gap-md", "aria-hidden": "true", children: data.map((group, gi) => ((0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 justify-center", children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", align: "center", children: group.label }) }, gi))) })] }), showLegend ? (0, jsx_runtime_1.jsx)(LegendV4_1.LegendV4, { items: legendItems }) : null, footer] }));
});
//# sourceMappingURL=ComparisonBarsV4.js.map