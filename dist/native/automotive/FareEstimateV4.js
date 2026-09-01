"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FareEstimateV4 = FareEstimateV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const TextV4_1 = require("../primitives/TextV4");
const money_1 = require("../commerce/money");
const fleet_v4_1 = require("./internal/fleet-v4");
/**
 * **V4 fare estimate** — same props as {@link FareEstimate} plus `totalLabel`,
 * `formatSurge` and `emptyMessage`.
 *
 * ## Four changes
 *
 * 1. **Every figure is tabular and the column has an edge.** A fare breakdown
 *    is a column of money; with proportional figures `$4.50` and `$11.20` are
 *    different widths and there is nothing to scan down. This is the whole job
 *    of the component and the base did not do it.
 * 2. **Surge is a labelled chip, not a red number.** The base tinted the total
 *    when `surgeMultiplier > 1` — colour alone, and `danger` on a price, which
 *    §35.4 reserves for something going wrong rather than costing more.
 * 3. **The total is separated by a hairline and set in the display face**, so
 *    the figure a rider is deciding on is not the same weight as the line
 *    items above it.
 * 4. **An empty estimate says so** rather than rendering a bordered blank.
 */
function FareEstimateV4({ items = [], totalCents, currency = 'USD', surgeMultiplier, distanceLabel, durationLabel, variant = 'detailed', totalLabel = 'Total', formatSurge, emptyMessage = 'No estimate yet.', loading = false, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { style: [{ gap: tokens.spacing.sm }, style], children: [60, 45, 80].map((w) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    height: tokens.typography.scale.sm,
                    width: `${w}%`,
                    borderRadius: tokens.radius.sm,
                    backgroundColor: (0, fleet_v4_1.skeletonFill)(theme),
                } }, w))) }));
    }
    const lines = variant === 'detailed' ? items : [];
    const hasTotal = typeof totalCents === 'number' && Number.isFinite(totalCents);
    const surging = typeof surgeMultiplier === 'number' && surgeMultiplier > 1;
    const caption = (0, fleet_v4_1.metaLine)([distanceLabel, durationLabel]);
    if (!hasTotal && lines.length === 0) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { style: style, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: emptyMessage }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { style: [{ gap: tokens.spacing.sm }, style], children: [caption || surging ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", style: { flex: 1 }, children: caption })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } })), surging ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "warn", variant: "soft", size: "sm", children: (formatSurge ?? ((m) => `${m}× surge`))(surgeMultiplier) })) : null] })) : null, lines.map((item) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", style: { flexShrink: 1 }, children: item.label }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onCard", numeric: "tabular", children: (0, money_1.formatMoney)(item.cents, currency) })] }, item.label))), hasTotal ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.md,
                    borderTopWidth: lines.length > 0 ? 1 : 0,
                    borderTopColor: colors.border,
                    paddingTop: lines.length > 0 ? tokens.spacing.sm : 0,
                }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", children: totalLabel }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "xl", weight: "bold", tone: "onCard", numeric: "tabular", children: (0, money_1.formatMoney)(totalCents, currency) })] })) : null] }));
}
//# sourceMappingURL=FareEstimateV4.js.map