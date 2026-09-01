"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceLineV4 = InvoiceLineV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const appearance_1 = require("../primitives/internal/appearance");
const row_v4_1 = require("../dashboard/internal/row-v4");
const money_1 = require("../commerce/money");
const MoneyAmountV4_1 = require("./MoneyAmountV4");
const ledger_v4_1 = require("./internal/ledger-v4");
/** A quantity, through `Intl` — `3.5`, and `3,5` where that is the decimal mark. */
const QUANTITY = new Intl.NumberFormat(undefined, { maximumFractionDigits: 3 });
/**
 * **V4 invoice line** — same props as {@link InvoiceLine}.
 *
 * ## Four changes
 *
 * 1. **A fractional line no longer under-reports.** The total was
 *    `Math.trunc(unitPriceCents) * quantity`, which truncated the *price* and
 *    left the *quantity* alone — so `333 × 3.5` produced `1165.5`, a
 *    non-integer cents value `MoneyAmount` then floored to `$11.65`, while the
 *    breakdown line directly above it honestly printed "3.5 × $3.33". The line
 *    under-reported the invoice and disagreed with itself on screen.
 *    `lineTotal()` rounds once, at the end.
 * 2. **`emphasized` actually changes something.** The amount is already bold,
 *    so `emphasized ? { fontWeight: '700' }` re-applied the weight it had and
 *    the grand total looked exactly like the line above it. The difference is
 *    now carried by props both twins honour — the amount's `size` step and the
 *    description's weight — rather than by a style override that applies on
 *    native and is dropped by `cn` on web.
 * 3. **The line is one announced object** carrying the description, the
 *    breakdown and the total, instead of three loose nodes — and the quantity
 *    goes through `Intl` rather than being concatenated.
 * 4. **The breakdown is `mutedText`**, and the line clears 44 from the shared
 *    row family rather than from a bare `paddingVertical`.
 *
 * **Renders nothing without a `description`** (§4.5).
 */
function InvoiceLineV4({ description, unitPriceCents, quantity = 1, currency = 'USD', amountCents, emphasized = false, appearance = 'classic', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!description)
        return null;
    const qty = Number.isFinite(quantity) ? quantity : 1;
    const total = typeof amountCents === 'number' ? amountCents : (0, ledger_v4_1.lineTotal)(unitPriceCents, qty);
    const showBreakdown = !emphasized && qty !== 1;
    const unitPrice = (0, money_1.formatMoney)(Number.isFinite(unitPriceCents) ? Math.trunc(unitPriceCents) : 0, currency);
    const breakdown = showBreakdown ? `${QUANTITY.format(qty)} × ${unitPrice}` : null;
    const surface = appearance === 'classic' ? undefined : (0, appearance_1.appearanceStyle)(appearance, colors, tokens);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, ledger_v4_1.spokenLine)([description, breakdown, (0, money_1.formatMoney)(total, currency)]), style: [surface, (0, row_v4_1.rowContainerStyle)(theme, { twoLine: showBreakdown }), style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: emphasized ? 'bold' : 'medium', tone: "onSurface", numberOfLines: 2, children: description }), breakdown != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: breakdown })) : null] }), (0, jsx_runtime_1.jsx)(MoneyAmountV4_1.MoneyAmountV4, { cents: total, currency: currency, tone: "neutral", size: emphasized ? 'md' : 'sm' })] }));
}
//# sourceMappingURL=InvoiceLineV4.js.map