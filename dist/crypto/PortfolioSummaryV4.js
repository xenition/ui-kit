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
exports.PortfolioSummaryV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const DonutChartV4_1 = require("../charts/DonutChartV4");
const PieChartV4_1 = require("../charts/PieChartV4");
const MoneyAmount_1 = require("../finance/MoneyAmount");
const market_v4_1 = require("./internal/market-v4");
const format_1 = require("./internal/format");
/**
 * **V4 portfolio summary** — the web twin of the native `PortfolioSummaryV4`,
 * same props as {@link PortfolioSummary} plus `directionLabels` and
 * `formatAllocation`.
 *
 * ## Five changes
 *
 * 1. **The allocation numbers are rendered.** The donut plus a bare `Legend`
 *    was colour-matching only: "how much is in ETH" could be answered solely
 *    by matching a swatch hue to a ring segment, which a colour-blind user
 *    cannot do and a screen-reader user cannot attempt at all. The chart is
 *    `DonutChartV4` with its own legend off and a `RadialLegendV4` built from
 *    the **same** `foldPieDataV4` result beside it, so swatch, segment and
 *    figure are the same object three times rather than three that happen to
 *    line up.
 *
 *    Two consequences, both deliberate. Neither `size` nor `thickness` is
 *    passed — web's thickness is a fraction of the radius and native's is a
 *    stroke in px, so the only way the ring means the same thing on both twins
 *    is for neither to state it. And `AllocationSlice.color` is **ignored**:
 *    `PieDatumV4` carries `tone`, which is status hues, and painting an
 *    identity — a token, an asset — with a status hue is what the tone rules
 *    exist to stop.
 * 2. **The glyph and the money are toned from one source.** Direction came
 *    from `changePct` while the money was toned from `changeCents`, so
 *    `changePct={0}` with `changeCents={-500}` drew a muted `•` beside a red
 *    −$5.00. The money leads when it is there, because it is the figure the
 *    user reads, and a percentage that rounds to `0.00` does not make a real
 *    loss flat.
 * 3. **A loss is no longer announced as a gain.** The label read
 *    `` `${pct >= 0 ? 'up' : 'down'} ${formatPct(Math.abs(pct))}` ``, and
 *    `formatPct` re-applies the sign — "down +3.20%". It also replaced the
 *    percentage's own text, so the figure itself went unspoken.
 * 4. **The change is inked, not filled.** `changeToneClass()` hands back
 *    `text-success` / `text-danger` / `text-muted`, all three of which are
 *    fill slots with no contrast promise for text.
 * 5. **Loading is the shape it is about to be.** A single 128px
 *    `bg-neutral-100` block — a ramp step, so a pale plate on a dark page —
 *    collapsed into the real layout on arrival.
 */
exports.PortfolioSummaryV4 = React.forwardRef(function PortfolioSummaryV4({ totalCents, currency = 'USD', changeCents, changePct, allocations = [], loading = false, directionLabels, formatAllocation, className, ...rest }, ref) {
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(Card_1.Card, { ref: ref, variant: "elevated", className: className, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { role: "status", "aria-live": "polite", "aria-label": "Loading portfolio", className: "flex flex-col gap-md", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-sm w-1/3', market_v4_1.PLACEHOLDER_CLASS) }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-xl w-3/5', market_v4_1.PLACEHOLDER_CLASS) }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-2xl w-full', market_v4_1.PLACEHOLDER_CLASS) })] }) }));
    }
    // One source for the glyph, the word, the ink and the money's tone.
    const change = (0, market_v4_1.changeParts)(changeCents ?? changePct, directionLabels);
    const changeMoneyTone = change.tone === 'neutral' ? 'neutral' : change.tone === 'success' ? 'income' : 'expense';
    // `color` is dropped on purpose — see change 1.
    const data = allocations.map((slice) => ({ label: slice.label, value: slice.value }));
    const fold = (0, PieChartV4_1.foldPieDataV4)(data);
    const printAllocation = formatAllocation ??
        ((_label, value) => `${(0, PieChartV4_1.shareOfV4)(value, fold.total)}%`);
    return ((0, jsx_runtime_1.jsx)(Card_1.Card, { ref: ref, variant: "elevated", className: className, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-muted-text", children: "Total balance" }), (0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: totalCents, currency: currency, tone: "neutral", size: "xl" }), changeCents != null || changePct != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, market_v4_1.changeInkClass)(change.tone), children: change.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: change.word }), changeCents != null ? ((0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: changeCents, currency: currency, tone: changeMoneyTone, size: "sm", signDisplay: "always" })) : null, changePct != null ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-semibold', market_v4_1.TABULAR_CLASS, (0, market_v4_1.changeInkClass)(change.tone)), children: (0, format_1.formatPct)(changePct) })) : null] })) : null] }), fold.segments.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm", children: [(0, jsx_runtime_1.jsx)(DonutChartV4_1.DonutChartV4, { data: data, legend: false }), (0, jsx_runtime_1.jsx)(PieChartV4_1.RadialLegendV4, { items: fold.segments.map((segment, index) => ({
                                label: (0, PieChartV4_1.segmentLegendLabelV4)(segment),
                                slot: index,
                                value: printAllocation(segment.label, segment.value),
                            })) })] })) : null] }) }));
});
//# sourceMappingURL=PortfolioSummaryV4.js.map