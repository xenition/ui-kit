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
exports.LegendV4 = exports.LEGEND_V4_CSS = exports.LEGEND_V4_STYLE_ID = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const TextV4_1 = require("../primitives/TextV4");
const nav_v4_1 = require("../primitives/internal/nav-v4");
const v4_chart_1 = require("../primitives/internal/v4-chart");
const v4_state_1 = require("../primitives/internal/v4-state");
const internal_v4_1 = require("./internal-v4");
/** The status hue for a `tone`, as the theme's own fill slot. */
const toneVar = (tone) => `var(--xen-${tone})`;
/** The one `<style>` id this component injects from. Idempotent. */
exports.LEGEND_V4_STYLE_ID = 'xen-v4-legend-styles';
/**
 * The swatch's fill, as a sheet reading an element-scoped custom property.
 *
 * The obvious spelling — `style={{ backgroundColor: chartVar(i) }}` — is wrong
 * for the same reason `internal/nav-v4.ts`, `internal/row-v4.ts` and the V4
 * surfaces all use sheets: **a CSSOM that does not parse `var()` drops the
 * declaration from an inline `style` outright.** jsdom is one such CSSOM, and
 * so is every SSR style extractor built on one, so the swatch would render
 * colourless in a snapshot test and — worse — in server-rendered HTML before
 * hydration. The shared chart adapter documents the same trap for
 * `color-mix()`, which is why it emits its palette as plain hexes.
 *
 * A *custom* property survives, because React sets it with `setProperty` and a
 * custom property has no value grammar to fail. So the element carries the
 * choice (`--xen-legend-swatch: var(--xen-chart-2)`) and this one static rule
 * paints it. The choice still goes through `chartVar`, so the five-slot throw
 * is intact — which a sheet keyed by slot number would have quietly lost.
 */
exports.LEGEND_V4_CSS = `
[data-xen-v4-legend-swatch] {
  background-color: var(--xen-legend-swatch);
}
`;
/**
 * **V4 legend** — the identity channel's redundancy, and on that argument the
 * most important component in the module.
 *
 * ## Why a legend is not decoration here
 *
 * `v4-chart.ts` records the measurement that decides this: the palette's worst
 * adjacent CVD ΔE is **6.5**, which lands inside the `dataviz` validator's 6–8
 * floor band rather than above the 8 target. That band is legal **only with
 * secondary encoding**. Eight slots clearing ΔE 8 for every possible brand hue
 * is not reachable by rotation from a single hue — that was measured, not
 * assumed — so the palette takes the band and the module pays for it in
 * redundancy. A legend is one of the four channels named in rule 5, and it is
 * the only one that is available to *every* form.
 *
 * Which is to say: a chart in this line that drops its legend is not a tidier
 * chart, it is a chart that has moved out of the band its palette was validated
 * in. That is why §4.2 defaults `legend` to `true` at two or more series
 * everywhere, and why this component is worth more than its 40 lines suggest.
 *
 * ## Four things the base got wrong
 *
 * 1. **The swatch was `h-2.5 w-2.5`** — 10px, a literal, named in brief §1 rule
 *    1 as a violation. It is now `CHART_MARK.dotSize` (8), *imported*, which is
 *    the same size a scatter or line dot is painted at. A key whose swatch is a
 *    different size from the mark it stands for is a key for a different chart.
 * 2. **The colour came from `seriesColor(i)`**, the cycling five-semantic
 *    vocabulary: a fourth series painted `warn`, a fifth painted `danger`, and a
 *    sixth silently painted the same colour as the first with the legend
 *    repeating the swatch as though that were fine. It is now `chartVar(i)`,
 *    which **throws** past the fifth slot. A legend is the last place a wrap
 *    should be tolerated, because the legend is the thing a reader consults to
 *    resolve exactly the ambiguity a wrap creates.
 * 3. **`opacity` was a prop.** It existed so a caller could distinguish series
 *    within one hue — the same trick `StackedBar` and `ComparisonBars` used —
 *    and it is retired everywhere in this pass. A drained swatch does not read
 *    as "another series"; it reads as disabled, because 0.38 alpha is precisely
 *    what disabled content is drawn at in this kit.
 * 4. **`role="img"` on an interactive element.** Not a base bug, but the trap
 *    waiting for anyone who added toggling to it: `role="img"` makes the
 *    subtree a single opaque graphic, so buttons inside it are unreachable. See
 *    below.
 *
 * ## Labels are never truncated
 *
 * There is no `truncate`, no `numberOfLines` and no `maxWidth` in this
 * component, and that is a decision rather than an omission. A clipped legend
 * label — "Organic sear…" — is an unreadable identity, and an unreadable
 * identity is worse than no legend at all, because the reader believes the
 * chart has told them something. Long labels **wrap**; a legend that needs two
 * lines takes two lines. The caller's fix for a legend that is too tall is a
 * shorter series name or `vertical`, not a narrower one.
 *
 * ## Interaction, and the two shapes this component has
 *
 * With `interactive` off (the default) the legend is a **picture**: `role="img"`
 * with one derived sentence naming every series, which is rule 6's textual
 * representation and reads far better than five separate swatch/label pairs.
 *
 * With `interactive` on it is a **group of toggles**: `role="group"`, and each
 * entry is a real `<button>` with `aria-pressed`. Three details follow from
 * that, and each is a requirement rather than a nicety:
 *
 * - **44 of hit area** (rule 10), via the nav line's `MIN_TAP_CLASS` — the same
 *   `calc(2xl - xs)` expression a tab, a page number and a button already land
 *   on, so a legend toggle is not a fifth nearly-44 size. The painted swatch
 *   stays 8.
 * - **The hidden state is announced, not just drawn.** `aria-pressed` carries
 *   it; the drained swatch and the `mutedText` label are the visual half. A
 *   toggle whose only signal is that a colour got quieter fails the same
 *   readers the legend exists for.
 * - **Toggling is the caller's data change.** This component reports; it does
 *   not filter anyone's series. `hidden` may be controlled, and when it is,
 *   nothing moves until the caller says so.
 */
exports.LegendV4 = React.forwardRef(function LegendV4({ items, vertical = false, indicator = 'dot', interactive = false, hidden, defaultHidden, onToggle, emptyLabel = 'No series', className, 'aria-label': ariaLabel, ...rest }, ref) {
    const chart = (0, internal_v4_1.useChartV4)(false);
    (0, inject_1.injectStyleOnce)(exports.LEGEND_V4_STYLE_ID, exports.LEGEND_V4_CSS);
    // The toggle's hover/press feedback IS the shared state layer — a legend
    // entry must not grow an effect of its own (rule 9).
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const [internal, setInternal] = React.useState(defaultHidden ?? []);
    const active = hidden ?? internal;
    if (items.length === 0)
        return (0, jsx_runtime_1.jsx)(internal_v4_1.ChartEmptyV4, { label: emptyLabel });
    const label = ariaLabel ?? `Legend: ${items.map((item) => item.label).join(', ')}.`;
    const toggle = (index) => {
        const next = !active.includes(index);
        if (hidden === undefined) {
            setInternal(next ? [...active, index] : active.filter((i) => i !== index));
        }
        onToggle?.(index, next);
    };
    const rowClass = (0, cn_1.cn)('inline-flex min-w-0 items-center gap-sm text-left', 
    // No `truncate`, and `whitespace-normal` in case a container set otherwise:
    // a clipped legend label is an unreadable identity.
    'whitespace-normal break-words');
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-v4-legend": "", "data-xen-v4-chart-legend": "", ...chart.rootProps, role: interactive ? 'group' : 'img', "aria-label": label, className: (0, cn_1.cn)('flex gap-md', vertical ? 'flex-col flex-nowrap' : 'flex-row flex-wrap items-center', className), ...rest, children: items.map((item, i) => {
            const off = active.includes(i);
            // Resolved before the hidden check on purpose: a sixth untoned series
            // must throw whether or not it happens to be toggled off right now.
            const fill = item.tone !== undefined ? toneVar(item.tone) : (0, internal_v4_1.chartVar)(item.slot ?? i);
            const ink = off ? internal_v4_1.CHART_GRID_VAR : fill;
            const swatch = indicator === 'dot' ? ((0, jsx_runtime_1.jsx)("span", { "data-xen-v4-legend-swatch": "", "data-xen-v4-chart-swatch": "dot", className: "block shrink-0 rounded-full", style: {
                    width: v4_chart_1.CHART_MARK.dotSize,
                    height: v4_chart_1.CHART_MARK.dotSize,
                    // A hidden series drains to the grid colour — the chrome
                    // vocabulary, which is what "not part of the data right now"
                    // already means everywhere else in this module.
                    '--xen-legend-swatch': ink,
                } })) : (
            // A rule rather than a dot, for the line family. The colour goes on
            // as an SVG `stroke` **attribute**, not a style: a `var()` in an
            // inline style is dropped outright by a CSSOM that cannot parse it
            // (jsdom, and every SSR extractor built on one), which is the same
            // trap the swatch sheet above exists to dodge. An attribute is not
            // parsed as a declaration, so it survives.
            (0, jsx_runtime_1.jsx)("svg", { "data-xen-v4-chart-swatch": indicator, "aria-hidden": "true", focusable: "false", width: v4_chart_1.CHART_MARK.dotSize, height: v4_chart_1.CHART_MARK.stroke, viewBox: `0 0 ${v4_chart_1.CHART_MARK.dotSize} ${v4_chart_1.CHART_MARK.stroke}`, className: "shrink-0", children: (0, jsx_runtime_1.jsx)("line", { x1: 0, y1: v4_chart_1.CHART_MARK.stroke / 2, x2: v4_chart_1.CHART_MARK.dotSize, y2: v4_chart_1.CHART_MARK.stroke / 2, stroke: ink, strokeWidth: v4_chart_1.CHART_MARK.stroke, strokeLinecap: "round", strokeDasharray: indicator === 'dashed'
                        ? `${v4_chart_1.CHART_MARK.stroke} ${v4_chart_1.CHART_MARK.stroke}`
                        : undefined }) }));
            const text = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: off ? 'mutedText' : 'onSurface', children: item.label }), item.value !== undefined ? (
                    // The module's direct-value marker, the same one a bar's or a
                    // range's own label carries: a legend readout IS a direct label
                    // for a form whose marks are too small to carry one.
                    (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { "data-xen-v4-chart-value": "", size: "xs", tone: "mutedText", numeric: "tabular", children: item.value })) : null] }));
            if (!interactive) {
                return ((0, jsx_runtime_1.jsxs)("span", { "data-xen-v4-legend-item": "", className: rowClass, children: [swatch, text] }, item.key ?? i));
            }
            return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "data-xen-v4-legend-item": "", "data-xen-v4-state": "", "aria-pressed": !off, onClick: () => toggle(i), className: (0, cn_1.cn)(rowClass, nav_v4_1.MIN_TAP_CLASS, 'rounded-md px-sm'), children: [swatch, text] }, item.key ?? i));
        }) }));
});
//# sourceMappingURL=LegendV4.js.map