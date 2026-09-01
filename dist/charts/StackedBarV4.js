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
exports.StackedBarV4 = exports.STACKED_BAR_V4_CSS = exports.STACKED_BAR_V4_STYLE_ID = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const TextV4_1 = require("../primitives/TextV4");
const LegendV4_1 = require("./LegendV4");
const nav_v4_1 = require("../primitives/internal/nav-v4");
const v4_chart_1 = require("../primitives/internal/v4-chart");
const internal_v4_1 = require("./internal-v4");
/** A segment's non-negative contribution. `NaN` and `-1` both count as nothing. */
function share(value) {
    return Number.isFinite(value) && value > 0 ? value : 0;
}
/**
 * Rule 3, enforced rather than documented.
 *
 * The palette module already throws rather than cycling past slot 5, on the
 * grounds that a silent second meaning for one colour is worse than a loud
 * failure. Mixing status hues with slot hues in one stack is the same defect
 * wearing a different hat, so it gets the same answer.
 */
function assertOneColourVocabulary(segments) {
    const toned = segments.filter((s) => s.tone !== undefined).length;
    if (toned !== 0 && toned !== segments.length) {
        throw new RangeError('@xenition/ui charts: a stacked bar carries status colour or slot colour, never both. ' +
            `${toned} of ${segments.length} segments declare a tone — give every segment one, or none.`);
    }
}
/**
 * Fold a stack that is longer than the palette, instead of crashing on it.
 *
 * `chartVar(5)` throws, and it is right to: asking the palette for a sixth
 * slot is a mistake in the caller's own code. But a stack's segment count
 * arrives with the **data** — six lines on an expenses breakdown from a live
 * API — and a `RangeError` thrown out of render takes the whole page down.
 * The split the shared module draws is exactly this: *the primitive throws,
 * the component folds* (see `foldChartSeries`).
 *
 * A stack is a composition — the parts add up to the whole — so the tail is
 * **summed** into one segment named {@link CHART_OVERFLOW_LABEL}, the same
 * answer `PieChartV4` gives for the same reason. The total is unchanged, which
 * is the property a stack must not lose: a bar that dropped its sixth segment
 * would silently rescale every other one.
 *
 * Not sorted, deliberately. `foldChartSeries` does not sort and neither does
 * this: a stack's order is the composition the caller chose, and re-ranking it
 * moves a segment between slots exactly as re-ordering the palette would. A
 * pie sorts because its tail is genuinely "the small ones"; a stack's is "the
 * ones after the fifth".
 *
 * A **toned** stack never folds. It is not spending the categorical palette,
 * so there is no slot to run out of — and "Other" has no honest status hue:
 * the residual of a pass/fail split is neither passing nor failing.
 */
function foldSegmentsV4(segments) {
    if (segments.some((s) => s.tone !== undefined))
        return segments;
    const fold = (0, v4_chart_1.foldChartSeries)(segments);
    if (!fold.didFold)
        return fold.kept;
    return [
        ...fold.kept,
        {
            value: fold.folded.reduce((sum, s) => sum + share(s.value), 0),
            label: v4_chart_1.CHART_OVERFLOW_LABEL,
        },
    ];
}
/** The sentence a screen reader gets (brief §1 rule 6, §4.8). */
function stackedBarLabel(segments, total, title) {
    const head = `Stacked bar${title ? `, ${title}` : ''}`;
    const count = `${segments.length} ${segments.length === 1 ? 'segment' : 'segments'}`;
    if (total <= 0)
        return `${head}, ${count}`;
    const parts = segments.map((s, i) => {
        const name = s.label ?? `Segment ${i + 1}`;
        return `${name} ${Math.round((share(s.value) / total) * 100)}%`;
    });
    return `${head}, ${count}, ${parts.join(', ')}`;
}
/**
 * The custom property every mark in this chart reads its fill from.
 *
 * The palette reaches an element as `var(--xen-chart-1)`, and a `var()` in an
 * inline `background-color` is dropped outright by the jsdom CSSOM — the same
 * hazard `internal-v4.tsx` records against `color-mix()`. So the value goes
 * inline as a **custom property**, which no CSSOM validates, and one static
 * rule turns it into paint.
 *
 * A stack is the one chart in this group where the property is set **per
 * element** rather than once on the root: a segment and its legend swatch are
 * two nodes that must be the same colour, and inheritance is what guarantees
 * they never drift apart.
 */
const MARK_FILL = '--xen-v4-mark-fill';
/** The one `<style>` id this component injects from. Idempotent. */
exports.STACKED_BAR_V4_STYLE_ID = 'xen-v4-stacked-bar-styles';
/** Paint, keyed off the chart's own root attribute. */
exports.STACKED_BAR_V4_CSS = `
[data-xen-v4-stacked-bar] [data-xen-v4-segment] { background-color: var(${MARK_FILL}); }
/*
  The legend swatch is LegendV4's since the consolidation pass, and is painted
  by that component's own sheet — so it is deliberately NOT selected here. A
  more specific rule reaching for a custom property LegendV4 never sets would
  paint every swatch transparent.
*/
[data-xen-v4-stacked-bar] [data-xen-v4-chart-indicator] {
  width: ${v4_chart_1.CHART_MARK.dotSize}px;
  height: ${v4_chart_1.CHART_MARK.dotSize}px;
  border-radius: ${v4_chart_1.CHART_MARK.dotSize}px;
  background-color: var(${MARK_FILL});
}
`;
/**
 * **V4 stacked bar** — one horizontal bar split into its parts.
 *
 * The base is the module's clearest example of the defect this whole pass
 * exists to fix, because it makes the mistake twice:
 *
 * 1. **`seriesColor(i)` cycles the semantic slots.** Segment 3 is painted
 *    `success`, segment 4 `warn`, segment 5 `danger` — so a three-part revenue
 *    split renders as green, amber, red and reads as a health indicator.
 *    Nothing is wrong with segment 4; it is simply fourth. V4 takes the shared
 *    palette's slots in order, and status is opt-in per {@link
 *    StackedBarV4Tone}.
 * 2. **`opacity` as the way to tell segments apart.** The base's own doc
 *    comment recommends it: "distinguish series by varying the `opacity` of one
 *    theme color". Opacity is not a categorical channel — it is a *magnitude*
 *    channel, so a descending ramp says the fourth segment matters less than
 *    the first, and at the bottom of the ramp it says the fourth segment is
 *    **disabled**, because 0.38 of a colour is exactly what `v4-state.ts` uses
 *    to mean that. Retired outright: every segment is painted at full strength.
 *
 * ## The gap is the encoding
 *
 * `CHART_MARK.gap` of page between segments is not a style choice here, it is
 * the secondary encoding the palette's 6.5 adjacent CVD ΔE obliges (brief §1
 * rule 5). Two segments a dichromat cannot tell apart by hue are still visibly
 * two segments when a hairline of page runs between them — and a stack is the
 * one form where every pair of series is guaranteed to be adjacent, so it is
 * the form that needs it most. The base drew its segments flush.
 *
 * ## Where a stack's direct labels go
 *
 * Brief §4.4 asks for direct labels at four series or fewer. A stack cannot
 * take them in place: a segment is as wide as its share, so the 8% segment has
 * no room for "8%" and the label that does not fit is the one the reader most
 * wanted. So the legend carries the values instead — same channel, same four-
 * or-fewer rule, somewhere they fit. The tooltip carries the precise number
 * for the rest.
 *
 * ## Rounding
 *
 * `CHART_MARK.endRadius` at the **data end only** (brief §4.4): the stack's
 * right edge is where the total lands, and its left edge is the baseline. A bar
 * rounded at the baseline floats off its axis, which is why the base's
 * `rx={5}` pill is gone.
 */
exports.StackedBarV4 = React.forwardRef(function StackedBarV4({ segments, height = 16, legend, showValues, format = String, title, summary, caption, loading = false, emptyLabel = 'No data', animate = true, tooltip = true, onSelect, className, style, ...rest }, ref) {
    const chart = (0, internal_v4_1.useChartV4)();
    (0, inject_1.injectStyleOnce)(exports.STACKED_BAR_V4_STYLE_ID, exports.STACKED_BAR_V4_CSS);
    const [hovered, setHovered] = React.useState(null);
    assertOneColourVocabulary(segments);
    // Everything below draws the **folded** stack: past the palette's five
    // slots the tail is summed into one "Other" segment rather than thrown at.
    // See {@link foldSegmentsV4}.
    const drawn = foldSegmentsV4(segments);
    const total = drawn.reduce((sum, s) => sum + share(s.value), 0);
    const label = stackedBarLabel(drawn, total, title);
    const header = title || summary || caption ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-col gap-xs", children: [title ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", numberOfLines: 1, children: title })) : null, summary ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", numeric: "tabular", children: summary })) : null, caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: caption })) : null] })) : null;
    const frame = (children) => ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-v4-stacked-bar": "", ...chart.rootProps, style: { ...chart.rootProps.style, ...style }, className: (0, cn_1.cn)('flex w-full flex-col gap-sm', className), ...rest, children: [header, children] }));
    if (loading) {
        return frame((0, jsx_runtime_1.jsx)("div", { "aria-busy": "true", "aria-label": label, role: "img", children: (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "100%", height: height }) }));
    }
    // No segments and an all-zero stack are the same picture — a bar with
    // nothing in it — so they get the same answer rather than the base's
    // silent `null`-shaped divergence.
    if (drawn.length === 0 || total <= 0) {
        return frame((0, jsx_runtime_1.jsx)(internal_v4_1.ChartEmptyV4, { label: emptyLabel, height: height }));
    }
    const showLegend = legend ?? drawn.length >= 2;
    const legendValues = showValues ?? drawn.length <= v4_chart_1.CHART_DIRECT_LABEL_MAX;
    const fillOf = (segment, i) => segment.tone ? `var(--xen-${segment.tone})` : (0, internal_v4_1.chartVar)(i);
    const last = drawn.length - 1;
    return frame((0, jsx_runtime_1.jsxs)("div", { role: "img", "aria-label": label, className: "flex w-full flex-col gap-sm", children: [(0, jsx_runtime_1.jsxs)("div", { "data-xen-v4-chart": "", "data-xen-v4-chart-plot": "", ...(animate ? { 'data-animate': 'true' } : {}), className: (0, cn_1.cn)('flex w-full items-center', nav_v4_1.MIN_TAP_CLASS), style: { position: 'relative' }, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex w-full", style: { height, gap: v4_chart_1.CHART_MARK.gap }, children: drawn.map((segment, i) => {
                            const value = share(segment.value);
                            if (value <= 0)
                                return null;
                            return ((0, jsx_runtime_1.jsx)("div", { "data-xen-v4-segment": "", className: "h-full cursor-default", style: {
                                    flexGrow: value / total,
                                    flexBasis: 0,
                                    // `1` is the hairline exception in rule 1: a segment that
                                    // exists must be visible, however small its share.
                                    minWidth: 1,
                                    [MARK_FILL]: fillOf(segment, i),
                                    borderTopRightRadius: i === last ? v4_chart_1.CHART_MARK.endRadius : undefined,
                                    borderBottomRightRadius: i === last ? v4_chart_1.CHART_MARK.endRadius : undefined,
                                }, onPointerEnter: tooltip ? () => setHovered(i) : undefined, onPointerLeave: tooltip ? () => setHovered(null) : undefined, onClick: onSelect ? () => onSelect(i, segment.value) : undefined }, i));
                        }) }), tooltip && hovered !== null && drawn[hovered] !== undefined ? ((0, jsx_runtime_1.jsxs)("div", { "data-xen-v4-chart-tooltip": "", role: "presentation", className: "pointer-events-none absolute flex items-center gap-xs rounded-[var(--xen-radius-md)] border border-border bg-popover px-sm py-xs", style: { left: 0, top: 0 }, children: [(0, jsx_runtime_1.jsx)("span", { "data-xen-v4-chart-indicator": "", style: {
                                    [MARK_FILL]: fillOf(drawn[hovered], hovered),
                                } }), (0, jsx_runtime_1.jsxs)(TextV4_1.TextV4, { size: "xs", tone: "onPopover", numeric: "tabular", children: [drawn[hovered]?.label ? `${drawn[hovered]?.label}: ` : '', format(drawn[hovered]?.value)] })] })) : null] }), showLegend ? ((0, jsx_runtime_1.jsx)(LegendV4_1.LegendV4, { items: drawn.map((segment, i) => ({
                    key: String(i),
                    label: segment.label ?? `Segment ${i + 1}`,
                    slot: i,
                    ...(segment.tone === undefined ? {} : { tone: segment.tone }),
                    ...(legendValues ? { value: format(segment.value) } : {}),
                })) })) : null] }));
});
//# sourceMappingURL=StackedBarV4.js.map