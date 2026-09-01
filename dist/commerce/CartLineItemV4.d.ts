import * as React from 'react';
import type { CartLineItemProps } from './CartLineItem';
export interface CartLineItemV4Props extends CartLineItemProps {
    /**
     * The line's **unit** compare-at price in integer cents — what one of these
     * used to cost.
     *
     * When it is higher than `unitPriceCents`, the trailing figure becomes a
     * `PriceTagV4` carrying the struck original beside the line total, both
     * multiplied by `quantity` so the two numbers are comparable. That is the
     * whole discount treatment: **a sale price does not turn red** (brief §1.3,
     * `design.md` §35.4). A discount is emphasis, not status, and the struck
     * original is what a shopper already reads it from.
     */
    compareAtUnitPriceCents?: number;
}
/**
 * **V4 cart line** — the web twin of the native `CartLineItemV4`, the base
 * {@link CartLineItem}'s props plus
 * {@link CartLineItemV4Props.compareAtUnitPriceCents}, a different design line.
 *
 * A cart line is a **row**, so it takes the row metric from
 * `dashboard/internal/row-v4.ts` — M3's list-item tokens, two-line container 72
 * as a floor, 16 gutters, a 44 leading slot — rather than the ad-hoc
 * `py-md` + 64 thumbnail the base drew. The point of importing rather than
 * restating: a cart line, a settings row and the `Subtotal` line underneath it
 * are then demonstrably one family, which is what
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` §4.3 calls the decision that matters most.
 *
 * Four changes beyond the metric:
 *
 * 1. **It composes, and does not redraw.** `PriceTagV4` for the money and
 *    `QuantityStepperV4` for the control — brief §1.7, a V4 composite composes
 *    V4 children, never the base line and never a hand-rolled price. The base
 *    printed the line total itself in a `font-heading` span, which is how a
 *    cart ended up setting the same figure differently from the product card it
 *    came from.
 * 2. **The discount is carried by the price tag**, via
 *    {@link CartLineItemV4Props.compareAtUnitPriceCents} — the one component in
 *    the module that has already settled how a struck price is drawn and
 *    announced (`Was …`, an `<s>`, no red).
 * 3. **The remove control clears the tap floor.** The base's "Remove" was a
 *    bare `text-xs` link — roughly 14 points tall — sitting beside a stepper
 *    that a shopper is already tapping repeatedly. It keeps the word (a glyph
 *    alone is not a label) and gains a 44 hit area.
 * 4. **The row survives its empty case.** A line with no title and no variant
 *    renders nothing rather than an empty 72-point box with a thumbnail in it
 *    (§4.5).
 *
 * **The remove control stays `mutedText`, not `danger`.** Removing a line from
 * a cart is reversible and routine; spending the error tone on it is the same
 * mistake as painting a sale price red, one component along. The base's
 * `hover:text-danger` goes with it.
 */
export declare const CartLineItemV4: React.ForwardRefExoticComponent<CartLineItemV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CartLineItemV4.d.ts.map