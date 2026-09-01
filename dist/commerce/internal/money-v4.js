"use strict";
/**
 * The one recipe shared by the **V4 money surfaces** on the web —
 * `CartSummaryV4`, `OrderSummaryV4` / `CheckoutSummaryV4`, and the trailing
 * figure of `CartLineItemV4`.
 *
 * A cart summary and an order summary are the same object wearing two labels:
 * a label column, a figure column, one rule, a total. Read side by side today
 * they are not: `CartSummary` draws its rule with `border-t` plus a `mt-xs`,
 * `OrderSummary` draws **two** rules (one under the line items and one above
 * the totals) plus a `divide-y` between every order line, and the two spell the
 * total at the same `text-base` as the rows above it — so the number the whole
 * surface exists to deliver has no more weight than the tax line.
 *
 * So the values that decide whether two money surfaces look like one family are
 * decided **once**, here, exactly as `dashboard/internal/row-v4.ts` decides the
 * row family once and `primitives/internal/field-v4.ts` decides the form line
 * once. Its native twin, `src/native/commerce/internal/money-v4.ts`, exports
 * the same names as resolved numbers and styles off `useXenitionTheme()`.
 *
 * ## Where the numbers come from
 *
 * Nowhere new. Every one is imported or composed:
 *
 * - The **row metric** is `dashboard/internal/row-v4.ts` — M3's list-item
 *   container heights, one-line 56 (`2xl + sm`). A summary row is a row, so it
 *   takes the row family's height rather than inventing a third one; that is
 *   what makes a `CartLineItemV4` and the `Subtotal` line under it sit on one
 *   rhythm. `charts/ProgressBarsV4` already reaches across module lines for the
 *   same import, for the same reason.
 * - The **one rule** is `LAYOUT-DASHBOARD-V4-BRIEF.md` §4.4 — 1px
 *   `--xen-border` and nothing else — and `primitives/internal/v4-data.ts`'s
 *   rule that a dense data surface keeps exactly one horizontal rule and lets
 *   spacing do the rest.
 * - The **type steps** are the kit's own scale. The total is one step up
 *   (`base` → `lg`), never a colour: `COMMERCE-MARKETPLACE-V4-BRIEF.md` §1.3
 *   reserves `success`/`warn`/`danger` for good, caution and bad, and a total
 *   is none of the three.
 *
 * ## What is deliberately NOT here
 *
 * **A formatter.** Every amount goes through `commerce/money.ts`'s
 * `formatMoney`, overridable per call. A second place that turns cents into a
 * string is how a kit ends up with `$1204.5` on one screen and `$1,204.50` on
 * the next (brief §1.1).
 *
 * **A discount colour.** A sale price, a discount line and a "you saved" figure
 * are **emphasis, not status** (brief §1.3). They take the type scale and the
 * struck original beside them, exactly as `PriceTagV4` settled it.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONEY_LINE_SIZE = exports.MONEY_TOTAL_SIZE = exports.MONEY_VALUE_SIZE = exports.MONEY_LABEL_SIZE = exports.SUMMARY_RULE_CLASS = exports.SUMMARY_ROW_CLASS = exports.MONEY_V4_CSS = exports.MONEY_V4_GROUND_ATTR = exports.MONEY_V4_STYLE_ID = void 0;
exports.subtotalLabel = subtotalLabel;
const row_v4_1 = require("../../dashboard/internal/row-v4");
/** The `<style>` id the V4 money surfaces inject their one sheet from. */
exports.MONEY_V4_STYLE_ID = 'xen-v4-commerce-money-styles';
/**
 * The attribute that marks a `CardV4` as painting the **card** ground rather
 * than the page ground.
 *
 * Brief §1.4: "a card's ground is `colors.card`, not `colors.surface`" — the
 * fix the dashboard pass made and the reason dark mode read flat. `CardV4`
 * writes `bg-surface` into its own `className`, and two utility classes setting
 * the same property are resolved by the order Tailwind emitted them in, not by
 * the order a component joined them in. The selector in {@link MONEY_V4_CSS}
 * carries **two** attributes, so its specificity (0-2-0) beats a single utility
 * class (0-1-0) whichever way round the sheet was built. That is the same
 * argument `dashboard/SectionCardV4.tsx` makes for its own ground attribute;
 * the rule is restated here rather than imported so `commerce` does not pull a
 * dashboard *component* module in for one string.
 */
exports.MONEY_V4_GROUND_ATTR = 'data-xen-v4-money-ground';
/**
 * The card ground and its ink, and nothing else.
 *
 * No border and no shadow: `CardV4` already owns both, and §4.2 is explicit
 * that the house look is a hairline **plus** a soft shadow, never a heavy
 * border *and* a heavy shadow.
 */
exports.MONEY_V4_CSS = `
[data-xen-v4-card][${exports.MONEY_V4_GROUND_ATTR}="card"] {
  background-color: var(--xen-card);
  color: var(--xen-on-card);
}
`;
/**
 * A summary row: label at the leading end, figure at the trailing end, on the
 * row family's one-line height.
 *
 * `items-baseline` and not `items-center`, because the two halves of a money
 * row are both text and a reader compares them along the baseline — the same
 * decision `PriceTagV4` makes between a price and its struck original.
 *
 * `px-md` is the row metric's horizontal padding and it is why every money
 * surface hands `padding="none"` to its `CardV4`: the rows pay the gutter, so a
 * rule can run flush edge to edge while the text still lines up with the header
 * above it.
 */
exports.SUMMARY_ROW_CLASS = [
    'flex w-full items-baseline justify-between gap-md px-md',
    (0, row_v4_1.rowHeightClass)(false),
].join(' ');
/**
 * The **one** horizontal rule a money surface keeps, above the total.
 *
 * A `div` with a 1px height rather than a `border-t` on the total row: a border
 * on a row is subject to the same collapsing rules a border anywhere is, and it
 * ties the rule's presence to the row's box, so a surface that later grows a
 * second rule has no single element to point at. `h-px` is the hairline — the
 * one bare number brief §1 allows, and the same 1 the native twin writes.
 *
 * It runs **flush**, not inset: §4.4 insets a separator only to clear a leading
 * slot, and a money row has none.
 */
exports.SUMMARY_RULE_CLASS = 'h-px w-full shrink-0 bg-border';
/** A summary row's label — `base`, the row family's title step. */
exports.MONEY_LABEL_SIZE = 'base';
/** A summary row's figure — the same step as its label, so the pair reads as one line. */
exports.MONEY_VALUE_SIZE = 'base';
/**
 * The total — **one step up the scale**, never a colour (brief §3, §1.3).
 *
 * `base` → `lg`. The base line set the total at `text-base` with a semibold
 * weight, i.e. the same size as the tax line above it, which leaves the one
 * figure the surface exists to deliver indistinguishable from its inputs at a
 * glance (§6: hierarchy before styling).
 */
exports.MONEY_TOTAL_SIZE = 'lg';
/**
 * The trailing figure of a cart line — one step under a `PriceTagV4` at `md`,
 * because a line total is a component of the total, not the decision itself.
 */
exports.MONEY_LINE_SIZE = 'sm';
/**
 * `Subtotal`, or `Subtotal (3 items)` when the caller knows the count.
 *
 * Pluralised here rather than at two call sites so the cart summary and the
 * order summary cannot disagree about the wording, and singular-aware because
 * "1 items" is the tell that a string was concatenated rather than written.
 */
function subtotalLabel(itemCount) {
    if (itemCount === undefined)
        return 'Subtotal';
    return `Subtotal (${itemCount} ${itemCount === 1 ? 'item' : 'items'})`;
}
//# sourceMappingURL=money-v4.js.map