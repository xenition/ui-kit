"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PremiumSummaryV4 = PremiumSummaryV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const CardV4_1 = require("../primitives/CardV4");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const TextV4_1 = require("../primitives/TextV4");
const money_1 = require("../../commerce/money");
const coverage_v4_1 = require("../../insurance/coverage-v4");
const tone_v4_1 = require("./internal/tone-v4");
const CADENCE_LABEL = {
    monthly: 'per month',
    quarterly: 'per quarter',
    annual: 'per year',
};
/** The empty state's next-step sentence — an empty breakdown still owes one. */
const EMPTY_DESCRIPTION = 'Coverages, riders and discounts appear here once the quote is priced.';
/** Default mismatch copy. */
function mismatchLine(total, derived) {
    return `Total does not match the lines below (${derived})`;
}
/**
 * **V4 premium summary** — same props as {@link PremiumSummary} plus
 * `totalLabel`, `emptyLabel`, `emptyDescription`, `loadingLabel` and
 * `formatMismatch` (`formatMoney` is already on the base).
 *
 * ## Five changes
 *
 * 1. **`items={[]}` renders a real empty state.** The base drew a card
 *    containing a horizontal rule and the words "Total $0.00" — a confident
 *    figure asserting that this policy costs nothing, which is
 *    indistinguishable from a breakdown that failed to load. It now says what
 *    is missing and what will fill it.
 * 2. **A total that contradicts its own lines says so.** The base's TSDoc
 *    promised the printed total "always reconciles with the lines shown" and
 *    the code then let `totalCents` win outright, so three lines summing to
 *    $120.00 printed above a $99.00 Total and nothing anywhere flagged it. The
 *    shared reader returns `reconciles: false` for exactly that, and the card
 *    prints the derived sum beside the warning rather than quietly picking a
 *    winner — the caller is the only one who can say which number is right.
 * 3. **A credit is not an achievement.** Every negative line was painted
 *    `success`, so a multi-policy discount and a *credited late fee* both
 *    arrived in celebration green. The minus sign already carries the
 *    direction; the ink is the same as every other line.
 * 4. **The skeleton is opaque and in the shape of the card.** It was three
 *    bars painted in `colors.border` — the hairline token used as a fill, so
 *    the placeholder was the colour of a divider — and it drew no total row, so
 *    the card jumped a line taller when the data arrived. `skeletonFill`
 *    composites against the card's own ground, and the placeholder includes the
 *    total.
 * 5. **`colors.muted` and `colors.primary` stop drawing text.** Both are fill
 *    slots with no contrast promise; the line labels and the total figure now
 *    use `mutedText` and `primaryText`.
 */
function PremiumSummaryV4({ items, totalCents, cadence = 'monthly', currency = 'USD', loading = false, totalLabel = 'Total', emptyLabel = 'No premium breakdown', emptyDescription = EMPTY_DESCRIPTION, loadingLabel = 'Loading premium', formatMismatch = mismatchLine, formatMoney: format = money_1.formatMoney, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const rows = Array.isArray(items) ? items : [];
    if (loading) {
        const bar = (width) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                height: tokens.typography.scale.base,
                borderRadius: tokens.radius.sm,
                backgroundColor: (0, tone_v4_1.skeletonFill)(theme),
                width,
            } }));
        return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { accessible: true, accessibilityLabel: loadingLabel, style: [{ gap: tokens.spacing.sm }, style], children: [['100%', '100%', '60%'].map((width, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { ...tone_v4_1.DECORATIVE, children: bar(width) }, i))), (0, jsx_runtime_1.jsx)(react_native_1.View, { ...tone_v4_1.DECORATIVE, style: {
                        marginTop: tokens.spacing.sm,
                        paddingTop: tokens.spacing.md,
                        borderTopWidth: 1,
                        borderTopColor: colors.border,
                    }, children: bar('45%') })] }));
    }
    if (rows.length === 0) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { style: style, children: (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: emptyLabel, description: emptyDescription }) }));
    }
    const parts = (0, coverage_v4_1.premiumParts)(rows.map((item) => item.amountCents), totalCents);
    const totalText = format(parts.total, currency);
    const derivedText = format(parts.derived, currency);
    const mismatch = parts.reconciles ? null : formatMismatch(totalText, derivedText);
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { style: [{ gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: rows.map((item, i) => {
                    const cents = Number.isFinite(item.amountCents) ? Math.trunc(item.amountCents) : 0;
                    const credit = cents < 0;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, tone_v4_1.spokenLine)([
                            item.label,
                            `${credit ? '−' : ''}${format(Math.abs(cents), currency)}`,
                        ]), style: {
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: tokens.spacing.md,
                        }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, style: { flex: 1 }, children: item.label }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onCard", numeric: "tabular", children: `${credit ? '−' : ''}${format(Math.abs(cents), currency)}` })] }, `${item.label}-${i}`));
                }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, tone_v4_1.spokenLine)([totalLabel, totalText, CADENCE_LABEL[cadence], mismatch]), style: {
                    paddingTop: tokens.spacing.md,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: tokens.spacing.md,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", children: totalLabel }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: CADENCE_LABEL[cadence] })] }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", tone: "primaryText", numeric: "tabular", children: totalText })] }), mismatch ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { ...tone_v4_1.DECORATIVE, size: "xs", weight: "semibold", style: { color: (0, tone_v4_1.toneInk)(theme, 'warn') }, children: mismatch })) : null] }));
}
//# sourceMappingURL=PremiumSummaryV4.js.map