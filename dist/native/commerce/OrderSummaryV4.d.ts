import * as React from 'react';
import type { OrderSummaryProps } from './OrderSummary';
/** What an `OrderSummaryV4` shows in place of its line list when there are none. */
export interface OrderSummaryV4Empty {
    /** Headline. Default `No items in this order`. */
    title?: React.ReactNode;
    /** Supporting line under the headline. */
    description?: React.ReactNode;
    /** One action — a button, a link back to the catalog. */
    action?: React.ReactNode;
}
export interface OrderSummaryV4Props extends OrderSummaryProps {
    /**
     * The word on the status badge. Defaults to the capitalized `status`.
     *
     * Exposed because the six lifecycle names are a *data* vocabulary, not a
     * user-facing one: a marketplace calls `fulfilled` "Shipped to you", a
     * subscription calls `paid` "Active", and neither should have to redraw the
     * badge to say so.
     */
    statusLabel?: string;
    /**
     * What to show when `items` is empty. Brief §4.5: a component with nothing to
     * show renders an empty state, never a blank bordered box.
     */
    empty?: OrderSummaryV4Empty;
}
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
export declare function OrderSummaryV4({ items, subtotalCents, shippingCents, taxCents, totalCents, currency, status, statusLabel, orderNumber, title, empty, formatMoney: format, style, }: OrderSummaryV4Props): React.ReactElement;
/**
 * The checkout-time name for the same surface.
 *
 * `CheckoutSummary` has never had a file of its own — it is a named export from
 * `OrderSummary.tsx` on both twins, and so are its V2 and V3 variants. Keeping
 * that shape is deliberate: an order recap before payment and after it are the
 * same object, and giving the pre-payment name its own component is how two
 * files drift into two designs for one screen.
 */
export { OrderSummaryV4 as CheckoutSummaryV4 };
export type { OrderSummaryV4Props as CheckoutSummaryV4Props };
//# sourceMappingURL=OrderSummaryV4.d.ts.map