"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KpiRowV4 = KpiRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const GridV4_1 = require("../layout/GridV4");
const StatCardV4_1 = require("./StatCardV4");
/**
 * **V4 KPI row** — the summary strip at the top of a dashboard.
 *
 * shadcn's dashboard blocks confirm the composition order this component sits
 * in — navigation, then summary metric cards, then a chart, then a table — so
 * a `KpiRowV4` belongs above the section cards, not among them.
 *
 * Three changes, and the first is the reason the file exists.
 *
 * 1. **`flexBasis: '44%'` is gone.** Brief §1 names it a literal to remove,
 *    and it was doing the job of a column count by arithmetic: "44% plus a
 *    gap, so two fit and a third cannot" is a magic number that quietly
 *    becomes three-up the moment the gutter changes. V4 states the intent
 *    instead — `GridV4` with `columns`, on §4.1's `md` grid gutter.
 * 2. **`columns` is capped at 3** (§3, §5). See {@link KpiRowV4Columns}.
 * 3. **An empty strip renders `null`, not an empty flex box** (§4.5, and §5
 *    names it for this component specifically). The base returned a `View`
 *    with a gap on it, which on a screen laid out with `Column gap="xl"`
 *    leaves a 32px hole where nothing is — an empty component denting the
 *    page.
 *
 * The cards themselves are `StatCardV4`, so everything §3 decided about a stat
 * — the `card` ground, the `3xl` value, the trend glyph — arrives here by
 * composition rather than by being restated (§10.5).
 */
function KpiRowV4({ items, columns = 2, minItemWidth, raised = true, style, }) {
    // Nothing to show, so nothing is drawn — not an empty box with a gutter
    // (§4.5). The guard is before the grid so the screen's own rhythm closes up.
    if (items.length === 0)
        return null;
    // Belt and braces for a JavaScript caller the `2 | 3` type cannot reach.
    const tracks = columns === 3 ? 3 : 2;
    return ((0, jsx_runtime_1.jsx)(GridV4_1.GridV4, { columns: tracks, gap: "md", minItemWidth: minItemWidth, style: style, children: items.map((item, i) => ((0, jsx_runtime_1.jsx)(StatCardV4_1.StatCardV4, { raised: raised, ...item }, `${item.label}-${i}`))) }));
}
//# sourceMappingURL=KpiRowV4.js.map