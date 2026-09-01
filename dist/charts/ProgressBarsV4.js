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
exports.ProgressBarsV4 = exports.PROGRESS_BARS_V4_CSS = exports.PROGRESS_BARS_V4_STYLE_ID = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const TextV4_1 = require("../primitives/TextV4");
const v4_chart_1 = require("../primitives/internal/v4-chart");
const row_v4_1 = require("../dashboard/internal/row-v4");
const internal_v4_1 = require("./internal-v4");
/** The one `<style>` id this component injects from. Idempotent. */
exports.PROGRESS_BARS_V4_STYLE_ID = 'xen-v4-progress-bars-styles';
/**
 * The track and the fill, as a sheet.
 *
 * `style={{ backgroundColor: chartVar(0) }}` is wrong for the reason the rest
 * of the V4 line uses sheets: **a CSSOM that does not parse `var()` drops the
 * declaration from an inline `style` outright.** jsdom is one such CSSOM, as is
 * every SSR style extractor built on one, so the bars would come out colourless
 * in a snapshot and in server-rendered HTML before hydration. A *custom*
 * property survives — React sets it with `setProperty`, and a custom property
 * has no value grammar to fail — so the fill carries the choice and this sheet
 * paints it.
 *
 * The track needs no custom property because it has no choice to make: chart
 * chrome is `--xen-chart-grid`, always.
 *
 * ## Why both rules are scoped to the chart root
 *
 * `data-xen-v4-progress-fill` is not this component's alone — `ProgressV4` in
 * the primitives line marks its fill with the same attribute. Unscoped, this
 * sheet reached that bar too, and `var(--xen-progress-fill)` is not set there:
 * an invalid `var()` on a standard property computes to `unset`, so a
 * `ProgressV4` anywhere on a page that also rendered a `ProgressBarsV4` lost
 * its fill entirely. The two attribute selectors carry the same specificity,
 * so which one won came down to injection order — not something two unrelated
 * components should have to agree on. The descendant combinator settles it.
 */
exports.PROGRESS_BARS_V4_CSS = `
[data-xen-v4-chart] [data-xen-v4-progress-track] {
  background-color: var(--xen-chart-grid);
}
[data-xen-v4-chart] [data-xen-v4-progress-fill] {
  background-color: var(--xen-progress-fill);
}
`;
/**
 * **V4 progress bars** — native-only until this pass; this is the web twin,
 * built as V4 with no base to mirror (§6).
 *
 * ## This is a list, not a plot, and that decides almost everything
 *
 * Brief §5 Group D says it in one line — "the one chart-shaped thing that is
 * really a *list*, so it takes the row metric from
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` §4.3, not a chart metric" — and the
 * consequences are worth spelling out, because every one of them is a place the
 * naive reading would have gone wrong.
 *
 * - **The row height is the row family's.** `rowHeightClass(true)` — 72,
 *   composed as `2xl + lg`, M3's two-line list container — *imported* from
 *   `dashboard/internal/row-v4.ts` rather than restated. A row carrying a title
 *   and a bar is a two-line row: the bar sits where a supporting line sits. The
 *   point of importing is that a "top channels" list inside a dashboard card
 *   and the `SettingsRow` list on the next screen must be indistinguishable as
 *   a family, and they cannot be if one of them measured its own height.
 * - **The horizontal padding is `spacing.md`,** the row gutter, not the chart's
 *   plot inset. The list lives inside a card that is already inset by `lg`;
 *   paying the page gutter twice pushes every row's text into a narrow channel
 *   down the middle.
 * - **The accessible shape is a list.** Not `role="img"`. Rule 6 asks every
 *   *chart* to state its value in words because a rendered plot has no text a
 *   screen reader can reach — but this component's values already *are* text,
 *   in reading order, one per row. Collapsing them into a single `img` with a
 *   derived sentence would take working content away and give back a summary.
 *   So the container is a `list` with the derived sentence as its `aria-label`,
 *   and each row is a `listitem` naming itself and its value. This is a
 *   decision the brief did not settle; it is the one that loses nothing.
 * - **The bar is not coloured by its own value.** §4.1: bar length already
 *   shows magnitude, and spending the identity channel on it says nothing new.
 *   Every row is slot 1 unless it carries a `tone`, which is the *only* way a
 *   status hue is painted here (rule 3, §4.3). The base's `color` prop took any
 *   semantic slot, which is how a list of five rows ended up green, amber and
 *   red for no reason other than being third, fourth and fifth.
 *
 * ## What the bar itself is made of
 *
 * A track at `CHART_GRID_VAR` — chart *chrome*, the same recessive neutral the
 * grid lines take — under a fill at `chartVar(0)`. The track matters: without
 * it a reader cannot see how much of the row is unfilled, and rows stop being
 * comparable, which is the entire reason the form exists.
 *
 * `CHART_MARK.endRadius` at the **data end only** (§4.4). For a horizontal bar
 * the data end is the trailing edge and the baseline is the leading edge, so
 * the corners are rounded on the right and square on the left. A fill rounded
 * at both ends floats off its own zero.
 *
 * The bar's thickness is `CHART_MARK.dotSize` — the module's smallest painted
 * mark, reused rather than a new number, which is also the reason it does not
 * need to be a prop: a list whose rows have different bar weights is not one
 * list.
 *
 * ## Why it does not compose `MiniBarV4`
 *
 * The native base builds each row on `MiniBar`, and rule 8's "a V4 composite
 * composes V4 children" would point at `MiniBarV4`. It deliberately does not,
 * for a reason about the form rather than about build order: a `MiniBar` is a
 * **mark** — a fill with no track — and this row needs a track, because the
 * unfilled remainder is half of what a reader is comparing. Composing the mark
 * and then drawing a track behind it would leave the two halves of one bar
 * owned by two components.
 */
exports.ProgressBarsV4 = React.forwardRef(function ProgressBarsV4({ items, max, showValues = true, title, caption, valueFormat = String, onItemSelect, loading = false, emptyLabel = 'No data', animate = true, className, 'aria-label': ariaLabel, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(exports.PROGRESS_BARS_V4_STYLE_ID, exports.PROGRESS_BARS_V4_CSS);
    const chart = (0, internal_v4_1.useChartV4)(animate);
    const header = title !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", children: title })) : null;
    const footer = caption !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: caption })) : null;
    const frameClass = (0, cn_1.cn)('flex w-full flex-col gap-md', className);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: frameClass, ...rest, children: [header, (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "text", lines: Math.max(items.length, 1) }), footer] }));
    }
    if (items.length === 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: frameClass, ...rest, children: [header, (0, jsx_runtime_1.jsx)(internal_v4_1.ChartEmptyV4, { label: emptyLabel }), footer] }));
    }
    const finite = items.map((i) => i.value).filter(Number.isFinite);
    const ceiling = max ?? (finite.length > 0 ? Math.max(...finite) : 0);
    const label = ariaLabel ??
        `${title ?? 'Progress'}, ${items.length} ${items.length === 1 ? 'row' : 'rows'}, ` +
            `${items.map((i) => `${i.label} ${valueFormat(i.value)}`).join(', ')}.`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-v4-chart": "", style: chart.rootProps.style, className: frameClass, ...rest, children: [header, (0, jsx_runtime_1.jsx)("div", { role: "list", "aria-label": label, className: "flex w-full flex-col", children: items.map((item, i) => {
                    // A zero ceiling has no scale to map onto; every fill is then the
                    // hairline that says "nothing yet", not a divide-by-zero.
                    const ratio = ceiling === 0 || !Number.isFinite(item.value)
                        ? 0
                        : Math.min(Math.max(item.value / ceiling, 0), 1);
                    const interactive = onItemSelect !== undefined;
                    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex w-full min-w-0 items-baseline gap-md", children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", numberOfLines: 1, className: "min-w-0 flex-1", children: item.label }), showValues ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numeric: "tabular", className: "shrink-0", children: valueFormat(item.value) })) : null] }), (0, jsx_runtime_1.jsx)("div", { "data-xen-v4-progress-track": "", className: "w-full overflow-hidden", style: {
                                    height: v4_chart_1.CHART_MARK.dotSize,
                                    // §4.4: the rounded end is the DATA end — the trailing edge
                                    // for a horizontal bar. The leading edge is the baseline
                                    // and stays square.
                                    borderTopRightRadius: v4_chart_1.CHART_MARK.endRadius,
                                    borderBottomRightRadius: v4_chart_1.CHART_MARK.endRadius,
                                }, children: (0, jsx_runtime_1.jsx)("div", { "data-xen-v4-progress-fill": "", "data-xen-v4-chart-fill": "", style: {
                                        width: `${ratio * 100}%`,
                                        height: '100%',
                                        '--xen-progress-fill': item.tone !== undefined ? `var(--xen-${item.tone})` : (0, internal_v4_1.chartVar)(0),
                                        borderTopRightRadius: v4_chart_1.CHART_MARK.endRadius,
                                        borderBottomRightRadius: v4_chart_1.CHART_MARK.endRadius,
                                    } }) }), item.caption !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: item.caption })) : null] }));
                    // The row metric (§4.3), imported rather than restated.
                    const rowClass = (0, cn_1.cn)('flex w-full flex-col justify-center gap-xs px-md py-sm text-left', (0, row_v4_1.rowHeightClass)(true));
                    return ((0, jsx_runtime_1.jsx)("div", { role: "listitem", "data-xen-v4-progress-row": "", children: interactive ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `${item.label}: ${valueFormat(item.value)}`, onClick: () => onItemSelect(item, i), className: rowClass, children: body })) : ((0, jsx_runtime_1.jsx)("div", { className: rowClass, children: body })) }, i));
                }) }), footer] }));
});
//# sourceMappingURL=ProgressBarsV4.js.map