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
exports.KpiRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
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
 * 1. **`basis-[44%]` is gone.** Brief §1 names it a literal to remove, and it
 *    was doing the job of a column count by arithmetic: "44% plus a gap, so two
 *    fit and a third cannot" is a magic number that quietly becomes three-up
 *    the moment the gutter changes. V4 states the intent instead — `GridV4`
 *    with `columns`, on §4.1's `md` grid gutter — and takes `minItemWidth`
 *    with it, so the same strip can be three-up on a tablet without a second
 *    percentage being guessed.
 * 2. **`columns` is capped at 3** (§3, §5). See {@link KpiRowV4Columns}.
 * 3. **An empty strip renders `null`, not an empty flex box** (§4.5, and §5
 *    names it for this component specifically). The base returned a `<div>`
 *    with a `gap` on it, which on a page laid out with `Column gap="xl"`
 *    leaves a 32px hole where nothing is — an empty component denting the
 *    page.
 *
 * The cards themselves are `StatCardV4`, so everything §3 decided about a stat
 * — the `card` ground, the `3xl` value, the trend glyph — arrives here by
 * composition rather than by being restated (§10.5).
 */
exports.KpiRowV4 = React.forwardRef(function KpiRowV4({ items, columns = 2, minItemWidth, raised = true, className, ...rest }, ref) {
    // Nothing to show, so nothing is drawn — not an empty box with a gutter
    // (§4.5). The guard is before the grid so the page's own rhythm closes up.
    if (items.length === 0)
        return null;
    // Belt and braces for a JavaScript caller the `2 | 3` type cannot reach.
    const tracks = columns === 3 ? 3 : 2;
    return ((0, jsx_runtime_1.jsx)(GridV4_1.GridV4, { ref: ref, "data-xen-v4-kpi-row": "", columns: tracks, gap: "md", minItemWidth: minItemWidth, className: (0, cn_1.cn)('items-stretch', className), ...rest, children: items.map((item, i) => ((0, jsx_runtime_1.jsx)(StatCardV4_1.StatCardV4, { raised: raised, ...item, 
            // `h-full` so two cards in one row are the same height when one
            // carries a caption and the other does not — a ragged bottom edge is
            // the fastest way for a summary strip to stop reading as a set.
            className: (0, cn_1.cn)('h-full', item.className) }, `${item.label}-${i}`))) }));
});
//# sourceMappingURL=KpiRowV4.js.map