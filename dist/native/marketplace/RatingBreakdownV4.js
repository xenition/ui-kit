"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingBreakdownV4 = RatingBreakdownV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const CardV4_1 = require("../primitives/CardV4");
const RatingV4_1 = require("../primitives/RatingV4");
const TextV4_1 = require("../primitives/TextV4");
const charts_1 = require("../charts");
/** Normalize either input shape into a `[1★..5★]` count tuple. */
function toTuple(counts) {
    const get = (star) => {
        const raw = Array.isArray(counts)
            ? counts[star - 1]
            : counts[star];
        return typeof raw === 'number' && raw > 0 ? raw : 0;
    };
    return [get(1), get(2), get(3), get(4), get(5)];
}
/**
 * **V4 rating breakdown** — half of the trust pair, with `SellerCardV4`.
 *
 * ## It is a horizontal bar chart, so it is one
 *
 * Brief §3 Group C says it outright: "`RatingBreakdown` is a horizontal bar
 * chart in all but name: compose `ProgressBarsV4` from `charts` rather than
 * drawing its own bars." The base drew five `View`s with a percentage width, a
 * hand-mixed `withAlpha(colors.muted, 0.2)` track and its own
 * `accessibilityLabel` per row — which is `ProgressBarsV4` re-derived, badly.
 *
 * Composing the chart hands over four things this file no longer decides: the
 * row metric (§4.3 — 72, the two-line list container), the track colour (the
 * chart line's own recessive neutral rather than a local alpha mix), the
 * data-end-only corner radius (§4.4), and the animated fill that already knows
 * how to sit still under Reduce Motion.
 *
 * **`max` is the total, not the tallest bar.** `ProgressBarsV4` defaults `max`
 * to the largest item, which is right for "top channels" and wrong here: in a
 * rating distribution the reader is comparing each star level to *all* the
 * ratings, so the 5★ bar being full has to mean "everyone gave five stars",
 * not "5★ was the most common". This is the one decision the composition does
 * not make for us, and getting it wrong would make every distribution look
 * unanimous at its own mode.
 *
 * ## Rule 6: a number, and stars, and a count
 *
 * The summary is all three, in that order — the average as a display-sized
 * tabular figure, `RatingV4` beside it, and the total underneath. Stars alone
 * are the failure this rule names, and it matters most here, because this is
 * the block someone reads while deciding whether to send money to a stranger.
 *
 * The star row is not the accessible carrier: `RatingV4` announces itself as
 * "4.6 out of 5 stars", the figure is text, and the count is text. Nothing in
 * the block depends on seeing a shape.
 *
 * ## The empty case
 *
 * Zero ratings is not "a 0.0 average" — it is *no data*, and printing `0.0 ★`
 * beside five empty bars states something false about the seller. So with no
 * ratings the summary is withheld entirely and the chart's own empty state
 * carries {@link RatingBreakdownV4Props.emptyLabel}. §4.5: a component with
 * nothing to show renders an empty state, never a blank bordered box.
 *
 * Composes `CardV4`, `RatingV4`, `TextV4` and `ProgressBarsV4` (rule 7).
 */
function RatingBreakdownV4({ counts, average, hideSummary = false, framed = true, raised = false, loading = false, emptyLabel = 'No ratings yet', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const tuple = toTuple(counts);
    const total = tuple.reduce((a, b) => a + b, 0);
    const derivedAvg = total > 0 ? tuple.reduce((sum, count, i) => sum + count * (i + 1), 0) / total : 0;
    const avg = typeof average === 'number' ? average : derivedAvg;
    // A caller-supplied `average` with no counts behind it is still an average
    // worth printing — a seller page that has the number but not the histogram.
    // Zero counts AND no number is the honest empty case.
    const empty = total === 0;
    const showSummary = !hideSummary && !(empty && typeof average !== 'number');
    const items = empty
        ? []
        : [5, 4, 3, 2, 1].map((star) => ({
            label: star === 1 ? '1 star' : `${star} stars`,
            value: tuple[star - 1] ?? 0,
        }));
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [showSummary ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-v4-rating-summary", style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", tone: "onCard", numeric: "tabular", children: avg.toFixed(1) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(RatingV4_1.RatingV4, { value: avg, size: "sm" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numeric: "tabular", children: empty ? emptyLabel : `${total.toLocaleString()} ${total === 1 ? 'rating' : 'ratings'}` })] })] })) : null, (0, jsx_runtime_1.jsx)(charts_1.ProgressBarsV4, { items: items, max: total, loading: loading, emptyLabel: emptyLabel, valueFormat: (value) => value.toLocaleString() })] }));
    if (!framed) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: body });
    }
    return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { variant: raised ? 'elevated' : 'outlined', radius: "lg", padding: "lg", style: [{ gap: tokens.spacing.md, backgroundColor: colors.card }, style], children: body }));
}
//# sourceMappingURL=RatingBreakdownV4.js.map