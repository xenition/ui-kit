"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartSummaryV4 = CartSummaryV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const TextV4_1 = require("../primitives/TextV4");
const money_1 = require("./money");
const money_v4_1 = require("./internal/money-v4");
/**
 * **V4 cart summary** — the native twin of the web `CartSummaryV4`, the base
 * {@link CartSummary}'s props plus {@link CartSummaryV4Props.itemCount} and
 * {@link CartSummaryV4Props.note}, a different design line.
 *
 * With `OrderSummaryV4` this is the densest money surface in the kit: a label
 * column, a figure column, one rule, a total. Five changes.
 *
 * 1. **The row metric.** Every line takes the row family's one-line height
 *    (M3's 56) and its 16 gutters, imported from
 *    `dashboard/internal/row-v4.ts` via `internal/money-v4.ts` rather than
 *    restated — so the `Subtotal` line and the `CartLineItemV4` above it are
 *    the same object at two settings, which is what makes a cart read as one
 *    list instead of a list and then a box.
 * 2. **One rule, above the total, and nothing else.** The V4 data line keeps
 *    exactly one horizontal rule and lets spacing do the rest (§9).
 * 3. **The total is one step up the type scale, not a colour.** `base` → `lg`.
 *    The base set the total at the same size as the tax line above it, so the
 *    one figure the surface exists to deliver had no more weight than its own
 *    inputs (§6: hierarchy before styling). It is emphatically **not** tinted:
 *    brief §1.3 reserves `success`/`warn`/`danger` for good, caution and bad,
 *    and a total is none of the three.
 * 4. **Tabular figures.** Every amount, via `TextV4 numeric="tabular"` — which
 *    the base did not set on this twin at all, so a native cart's figures were
 *    proportional while the web twin's were not (brief §1.2).
 * 5. **The ground is `colors.card`, not `colors.surface`** (brief §1.4). The
 *    base painted the page colour and leaned on a border, which is why a
 *    summary on a dark page read as a flat rectangle with a line round it.
 *
 * **The discount line is not green and not red.** It is the same `base`
 * `onSurface` figure as every other row, carrying a minus sign. A discount is
 * *emphasis*, not status — the same call `PriceTagV4` makes about a sale price,
 * for the same reason: spending the status palette on good news teaches the
 * reader to distrust it when it is actually bad news (§35.4).
 *
 * Money still goes through {@link formatMoney}, overridable per call, and
 * nowhere else.
 */
function CartSummaryV4({ subtotalCents, shippingCents, taxCents, discountCents, totalCents, currency = 'USD', onCheckout, checkoutLabel = 'Checkout', formatMoney: format = money_1.formatMoney, itemCount, note, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const rowStyle = (0, money_v4_1.summaryRowStyle)(theme);
    const row = (key, label, value) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: `xen-summary-row-${key}`, style: rowStyle, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: money_v4_1.MONEY_LABEL_SIZE, tone: "mutedText", children: label }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: money_v4_1.MONEY_VALUE_SIZE, tone: "onSurface", numeric: "tabular", children: value })] }, key));
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: "elevated", radius: "lg", 
        // The card never pays the padding — the rows do, from the row metric's
        // own `padX`. That is what lets the one rule run flush edge to edge while
        // the labels still line up with the total underneath it.
        padding: "none", testID: "xen-cart-summary", style: [
            // §1.4's headline fix. `CardV4` paints `colors.surface`, which is the
            // page colour; `colors.card` is the slot that was split out so a raised
            // surface reads as raised in dark mode too.
            { backgroundColor: colors.card, paddingVertical: tokens.spacing.sm },
            style,
        ], children: [row('subtotal', (0, money_v4_1.subtotalLabel)(itemCount), format(subtotalCents, currency)), typeof shippingCents === 'number'
                ? row('shipping', 'Shipping', shippingCents === 0 ? 'Free' : format(shippingCents, currency))
                : null, typeof taxCents === 'number' ? row('tax', 'Tax', format(taxCents, currency)) : null, typeof discountCents === 'number' && discountCents > 0
                ? // A minus sign and the ordinary figure treatment. Not `success`, not
                    // `danger` — see the component doc.
                    row('discount', 'Discount', `−${format(discountCents, currency)}`)
                : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-summary-rule", style: (0, money_v4_1.summaryRuleStyle)(theme) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-summary-row-total", style: rowStyle, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: money_v4_1.MONEY_TOTAL_SIZE, weight: "semibold", tone: "onSurface", children: "Total" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { testID: "xen-cart-total", size: money_v4_1.MONEY_TOTAL_SIZE, weight: "bold", tone: "onSurface", numeric: "tabular", children: format(totalCents, currency) })] }), note != null && note !== '' ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-summary-note", style: { paddingHorizontal: tokens.spacing.md, paddingBottom: tokens.spacing.sm }, children: typeof note === 'string' ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: note })) : (note) })) : null, onCheckout ? (
            // Inset by the row gutter so the CTA lines up with the column of
            // figures above it rather than running to the card's own edge (HIG: a
            // full-width button is inset, aligned with adjacent margins).
            (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    paddingHorizontal: tokens.spacing.md,
                    paddingTop: tokens.spacing.xs,
                    paddingBottom: tokens.spacing.sm,
                }, children: (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "md", onPress: onCheckout, children: checkoutLabel }) })) : null] }));
}
//# sourceMappingURL=CartSummaryV4.js.map