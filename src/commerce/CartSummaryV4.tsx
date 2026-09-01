import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { TextV4 } from '../primitives/TextV4';
import { cn } from '../primitives/cn';
import { formatMoney } from './money';
import type { CartSummaryProps } from './CartSummary';
import {
  MONEY_LABEL_SIZE,
  MONEY_TOTAL_SIZE,
  MONEY_V4_CSS,
  MONEY_V4_STYLE_ID,
  MONEY_VALUE_SIZE,
  SUMMARY_ROW_CLASS,
  SUMMARY_RULE_CLASS,
  subtotalLabel,
} from './internal/money-v4';

export interface CartSummaryV4Props extends CartSummaryProps {
  /**
   * How many items the subtotal covers. When given, the subtotal row reads
   * `Subtotal (3 items)`.
   *
   * A cart summary sits beside a list the shopper has just scrolled past, and
   * "does this total cover everything I added" is the question it exists to
   * answer. The count is the cheapest possible answer and the base had no way
   * to say it, so every app printed its own line above the card.
   */
  itemCount?: number;
  /**
   * A quiet line under the total — "Taxes and shipping calculated at checkout",
   * a returns window, a delivery estimate.
   *
   * Rendered at `sm` in `mutedText` **below** the total, never above it: it is
   * a footnote to the figure, and putting it between the rows and the total
   * breaks the one column of numbers the surface is built around.
   */
  note?: React.ReactNode;
}

/**
 * **V4 cart summary** — the web twin of the native `CartSummaryV4`, the base
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
 *    exactly one horizontal rule and lets spacing do the rest
 *    (`primitives/internal/v4-data.ts`, §9). The base drew its rule as a
 *    `border-t` plus a `mt-xs` on a wrapper, which is two decisions for one
 *    hairline.
 * 3. **The total is one step up the type scale, not a colour.** `base` → `lg`.
 *    The base set the total at `text-base` — the same size as the tax line
 *    above it — so the one figure the surface exists to deliver had no more
 *    weight than its own inputs (§6: hierarchy before styling). It is
 *    emphatically **not** tinted: brief §1.3 reserves `success`/`warn`/`danger`
 *    for good, caution and bad, and a total is none of the three.
 * 4. **Tabular figures.** Every amount, via `TextV4 numeric="tabular"`. A
 *    column of prices only reads as a column if the digits line up; with
 *    proportional figures `$9.99` and `$11.11` are different widths and there
 *    is no edge to scan down (brief §1.2, §33).
 * 5. **The ground is `card`, not `surface`** (brief §1.4). The base painted the
 *    page colour and leaned on a border, which is why a summary on a dark page
 *    read as a flat rectangle with a line round it.
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
export const CartSummaryV4 = React.forwardRef<HTMLDivElement, CartSummaryV4Props>(
  function CartSummaryV4(
    {
      subtotalCents,
      shippingCents,
      taxCents,
      discountCents,
      totalCents,
      currency = 'USD',
      onCheckout,
      checkoutLabel = 'Checkout',
      formatMoney: format = formatMoney,
      itemCount,
      note,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(MONEY_V4_STYLE_ID, MONEY_V4_CSS);

    const row = (key: string, label: string, value: string): React.ReactElement => (
      <div key={key} data-xen-summary-row={key} className={SUMMARY_ROW_CLASS}>
        {/* `mutedText`, not `muted`: `muted` is a fill and carries no contrast
            promise, and the base line used it as a text colour throughout. */}
        <TextV4 size={MONEY_LABEL_SIZE} tone="mutedText">
          {label}
        </TextV4>
        <TextV4 size={MONEY_VALUE_SIZE} tone="onSurface" numeric="tabular">
          {value}
        </TextV4>
      </div>
    );

    return (
      <CardV4
        ref={ref}
        variant="elevated"
        radius="lg"
        // The card never pays the padding — the rows do, from the row metric's
        // own `padX`. That is what lets the one rule run flush edge to edge
        // while the labels still line up with the total underneath it.
        padding="none"
        data-xen-cart-summary=""
        data-xen-v4-money-ground="card"
        className={cn('flex flex-col py-sm', className)}
        {...rest}
      >
        {row('subtotal', subtotalLabel(itemCount), format(subtotalCents, currency))}
        {typeof shippingCents === 'number'
          ? row(
              'shipping',
              'Shipping',
              shippingCents === 0 ? 'Free' : format(shippingCents, currency)
            )
          : null}
        {typeof taxCents === 'number' ? row('tax', 'Tax', format(taxCents, currency)) : null}
        {typeof discountCents === 'number' && discountCents > 0
          ? // A minus sign and the ordinary figure treatment. Not `success`,
            // not `danger` — see the component doc.
            row('discount', 'Discount', `−${format(discountCents, currency)}`)
          : null}

        <div data-xen-summary-rule="" role="presentation" className={SUMMARY_RULE_CLASS} />

        <div data-xen-summary-row="total" className={SUMMARY_ROW_CLASS}>
          <TextV4 size={MONEY_TOTAL_SIZE} weight="semibold" tone="onSurface">
            Total
          </TextV4>
          <TextV4
            data-xen-cart-total=""
            size={MONEY_TOTAL_SIZE}
            weight="bold"
            tone="onSurface"
            numeric="tabular"
          >
            {format(totalCents, currency)}
          </TextV4>
        </div>

        {note != null && note !== '' ? (
          <div data-xen-summary-note="" className="px-md pb-sm">
            <TextV4 size="sm" tone="mutedText">
              {note}
            </TextV4>
          </div>
        ) : null}

        {onCheckout ? (
          // Inset by the row gutter so the CTA lines up with the column of
          // figures above it rather than running to the card's own edge (HIG:
          // a full-width button is inset, aligned with adjacent margins).
          <div className="px-md pb-sm pt-xs">
            <ButtonV4 type="button" size="md" onClick={onCheckout} className="w-full">
              {checkoutLabel}
            </ButtonV4>
          </div>
        ) : null}
      </CardV4>
    );
  }
);
