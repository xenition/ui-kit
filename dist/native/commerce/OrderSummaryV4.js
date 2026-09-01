"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSummaryV4 = OrderSummaryV4;
exports.CheckoutSummaryV4 = OrderSummaryV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const CardV4_1 = require("../primitives/CardV4");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const TextV4_1 = require("../primitives/TextV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const money_1 = require("./money");
const StatusBadgeV4_1 = require("./StatusBadgeV4");
const money_v4_1 = require("./internal/money-v4");
/**
 * **V4 order summary** — the native twin of the web `OrderSummaryV4`, the base
 * {@link OrderSummary}'s props plus {@link OrderSummaryV4Props.statusLabel} and
 * {@link OrderSummaryV4Props.empty}, a different design line.
 *
 * The read-only half of the money surface `CartSummaryV4` opens: a header, the
 * lines, the totals, one rule, the total. Everything `CartSummaryV4`'s doc says
 * about the row metric, the single rule, the total's type step, tabular figures
 * and the `card` ground applies here verbatim — the two are one recipe, held in
 * `internal/money-v4.ts`, which is the whole point. On top of that:
 *
 * 1. **The hairline between order lines is gone.** The base drew a rule between
 *    every line *and* a rule above the totals — two weights of separation on a
 *    surface whose entire job is one column of numbers. The V4 data line keeps
 *    **exactly one** horizontal rule and lets spacing do the rest (§9), and
 *    that one rule sits above the total, because that is the only boundary a
 *    reader actually needs marked.
 * 2. **The status is `StatusBadgeV4`, not a pill this file drew** (brief §1.6,
 *    §1.7). The base composed the base `StatusBadge`, a tinted pill with a
 *    label and nothing else — so `paid` and `cancelled` differed only by hue.
 *    The V4 badge ships an icon *and* a word, and its status → tone / glyph /
 *    ink table lives in `internal/status-v4.ts` where both twins and every
 *    other component that prints a status read one copy of it.
 * 3. **The empty order renders an empty state**, not a bordered box with a
 *    header and a hole in it (§4.5).
 *
 * `CheckoutSummaryV4` is the same component under its checkout-time name,
 * exported from this file exactly as the base and both variants already do — it
 * has never had a file of its own and does not get one here.
 */
function OrderSummaryV4({ items, subtotalCents, shippingCents, taxCents, totalCents, currency = 'USD', status, statusLabel, orderNumber, title = 'Order summary', empty, formatMoney: format = money_1.formatMoney, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const metrics = (0, row_v4_1.rowMetrics)(theme);
    const rowStyle = (0, money_v4_1.summaryRowStyle)(theme);
    const row = (key, label, value) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: `xen-summary-row-${key}`, style: rowStyle, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: money_v4_1.MONEY_LABEL_SIZE, tone: "mutedText", children: label }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: money_v4_1.MONEY_VALUE_SIZE, tone: "onSurface", numeric: "tabular", children: value })] }, key));
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: "elevated", radius: "lg", padding: "none", testID: "xen-order-summary", style: [
            // §1.4's headline fix. `CardV4` paints `colors.surface`, which is the
            // page colour; `colors.card` is the slot that was split out so a raised
            // surface reads as raised in dark mode too.
            { backgroundColor: colors.card, paddingVertical: tokens.spacing.sm },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: metrics.gap,
                    paddingHorizontal: metrics.padX,
                    paddingTop: tokens.spacing.xs,
                    paddingBottom: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [typeof title === 'string' ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "semibold", tone: "onSurface", children: title })) : (title), orderNumber ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: `#${orderNumber}` })) : null] }), status ? (
                    // §1.7: a V4 composite composes V4 children. `StatusBadgeV4` owns the
                    // status → tone / glyph / ink table for both twins (it lives in
                    // `internal/status-v4.ts`), so an order recap and an order list
                    // cannot show two different marks for "shipped" — and rule §1.6's
                    // "an icon AND a word" is answered in one place rather than in every
                    // component that happens to print a status.
                    //
                    // The `testID` sits on a wrapper because `StatusBadgeV4` takes only a
                    // `style` on this twin; naming the badge is a spec's need, not a
                    // reason to widen another component's props.
                    (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: `xen-status-badge-${status}`, children: (0, jsx_runtime_1.jsx)(StatusBadgeV4_1.StatusBadgeV4, { status: status, children: statusLabel }) })) : null] }), items.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-order-empty", style: { paddingHorizontal: metrics.padX }, children: (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: empty?.title ?? 'No items in this order', description: empty?.description, action: empty?.action }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-order-lines", children: items.map((item, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-order-line", 
                    // The row metric again, two-line because a line carries a variant
                    // and a quantity under its title. No rule between lines —
                    // spacing is the separation (§9).
                    style: {
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: metrics.gap,
                        paddingHorizontal: metrics.padX,
                        paddingVertical: tokens.spacing.sm,
                        minHeight: metrics.twoLine,
                    }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", numberOfLines: 1, children: item.title }), item.variantTitle ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: item.variantTitle })) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: `Qty ${item.quantity}` })] }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { testID: "xen-order-line-total", size: money_v4_1.MONEY_VALUE_SIZE, tone: "onSurface", numeric: "tabular", children: format(item.unitPriceCents * item.quantity, currency) })] }, i))) })), row('subtotal', 'Subtotal', format(subtotalCents, currency)), typeof shippingCents === 'number'
                ? row('shipping', 'Shipping', shippingCents === 0 ? 'Free' : format(shippingCents, currency))
                : null, typeof taxCents === 'number' ? row('tax', 'Tax', format(taxCents, currency)) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-summary-rule", style: (0, money_v4_1.summaryRuleStyle)(theme) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-summary-row-total", style: rowStyle, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: money_v4_1.MONEY_TOTAL_SIZE, weight: "semibold", tone: "onSurface", children: "Total" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { testID: "xen-order-total", size: money_v4_1.MONEY_TOTAL_SIZE, weight: "bold", tone: "onSurface", numeric: "tabular", children: format(totalCents, currency) })] })] }));
}
//# sourceMappingURL=OrderSummaryV4.js.map