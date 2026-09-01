"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioSummaryV4 = PortfolioSummaryV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const CardV4_1 = require("../primitives/CardV4");
const TextV4_1 = require("../primitives/TextV4");
const MoneyAmount_1 = require("../finance/MoneyAmount");
const DonutChartV4_1 = require("../charts/DonutChartV4");
const PieChartV4_1 = require("../charts/PieChartV4");
const money_1 = require("../../commerce/money");
const market_v4_1 = require("./internal/market-v4");
const format_1 = require("./internal/format");
/** The skeleton's three bands, in the shape the loaded card takes. */
const SKELETON_STEPS = { caption: 1, total: 2, chart: 8 };
/**
 * **V4 portfolio hero** — same props as {@link PortfolioSummary} plus
 * `directionLabels` and `formatAllocation`.
 *
 * ## Four changes
 *
 * 1. **The allocation numbers are rendered.** The donut was colour-matching
 *    only: "how much of this is ETH" was answerable solely by holding a legend
 *    swatch against a ring segment. Every segment now carries a figure through
 *    {@link PortfolioSummaryV4Props.formatAllocation}.
 * 2. **The direction and the money are toned from one source.** The base took
 *    the tone from `changePct ?? changeCents` and the money's own tone from
 *    the cents, so `changePct={0}` with `changeCents={-500}` drew a muted `•`
 *    beside a red `−$5.00`. Both now come from a single `changeParts()` call
 *    on the cents, falling back to the percentage.
 * 3. **A loss is announced as a loss.** `up +3.20%` / `down +3.20%` came from
 *    `pct >= 0 ? 'up' : 'down'` glued to `formatPct(Math.abs(pct))`, which
 *    re-applies the sign — and `>= 0` sent a flat `0` down the "up" branch
 *    while the glyph beside it drew `•`.
 * 4. **Loading is the card's own shape**, not a 120px grey slab, and the
 *    donut's `thickness` is left to the chart family so it means the same
 *    number on both twins — the bases read it as pixels here and as a
 *    fraction on the web.
 */
function PortfolioSummaryV4({ totalCents, currency = 'USD', changeCents, changePct, allocations = [], loading = false, directionLabels, formatAllocation, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (loading) {
        const band = (steps, width) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                height: tokens.spacing.md * steps,
                width,
                borderRadius: tokens.radius.sm,
                backgroundColor: (0, market_v4_1.skeletonFill)(theme),
            } }));
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { variant: "elevated", style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: "Loading portfolio", style: { gap: tokens.spacing.md }, children: [band(SKELETON_STEPS.caption, '35%'), band(SKELETON_STEPS.total, '60%'), band(SKELETON_STEPS.chart, '100%')] }) }));
    }
    // The money is the figure on screen, so the money decides the tone. The base
    // asked the percentage first and then toned the cents separately.
    const change = (0, market_v4_1.changeParts)(changeCents ?? changePct, directionLabels);
    const ink = (0, market_v4_1.changeInk)(theme, change.tone);
    const hasChange = changeCents != null || changePct != null;
    const fold = allocations.length > 0 ? (0, PieChartV4_1.foldPieDataV4)(allocations.map((a) => ({ label: a.label, value: a.value }))) : null;
    return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { variant: "elevated", style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "mutedText", children: "Total balance" }), (0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: totalCents, currency: currency, tone: "neutral", size: "xl" }), hasChange ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, market_v4_1.spokenLine)([
                                change.word,
                                changeCents != null ? (0, money_1.formatMoney)(changeCents, currency) : null,
                                changePct != null ? (0, format_1.formatPct)(changePct) : null,
                            ]), style: {
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: tokens.spacing.sm,
                            }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", style: { color: ink }, children: change.glyph }), changeCents != null ? ((0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: changeCents, currency: currency, tone: change.tone === 'success'
                                        ? 'income'
                                        : change.tone === 'danger'
                                            ? 'expense'
                                            : 'neutral', size: "sm", signDisplay: "always" })) : null, changePct != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", numeric: "tabular", style: { color: ink }, children: (0, format_1.formatPct)(changePct) })) : null] })) : null] }), fold != null && fold.segments.length > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(DonutChartV4_1.DonutChartV4, { data: allocations.map((a) => ({ label: a.label, value: a.value })), legend: false }), (0, jsx_runtime_1.jsx)(PieChartV4_1.RadialLegendV4, { items: fold.segments.map((segment, i) => ({
                                label: (0, PieChartV4_1.segmentLegendLabelV4)(segment),
                                slot: i,
                                value: formatAllocation != null
                                    ? formatAllocation(segment.label, segment.value)
                                    : `${(0, PieChartV4_1.shareOfV4)(segment.value, fold.total)}%`,
                            })) })] })) : null] }) }));
}
//# sourceMappingURL=PortfolioSummaryV4.js.map