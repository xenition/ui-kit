import * as React from 'react';
import { GenerativeCover } from '../marketing/GenerativeCover';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { TextV4 } from '../primitives/TextV4';
import { MIN_TAP_CLASS } from '../primitives/internal/nav-v4';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import {
  ROW_V4_LEADING_CLASS,
  ROW_V4_TEXT_CLASS,
  rowHeightClass,
} from '../dashboard/internal/row-v4';
import { PriceTagV4 } from './PriceTagV4';
import { QuantityStepperV4 } from './QuantityStepperV4';
import type { CartLineItemProps } from './CartLineItem';
import { MONEY_LINE_SIZE } from './internal/money-v4';

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
export const CartLineItemV4 = React.forwardRef<HTMLDivElement, CartLineItemV4Props>(
  function CartLineItemV4(
    {
      title,
      variantTitle,
      quantity,
      unitPriceCents,
      compareAtUnitPriceCents,
      currency = 'USD',
      imageUrl,
      imageAlt,
      slug,
      onQuantityChange,
      onRemove,
      min = 1,
      max,
      removeLabel,
      formatMoney: format,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    // §4.5: nothing to name, so nothing to draw. A thumbnail and a stepper
    // attached to no product is not a row, it is a hole in the list.
    if (title.trim() === '' && (variantTitle === undefined || variantTitle === '')) return null;

    const lineTotal = unitPriceCents * quantity;
    const compareLineTotal =
      typeof compareAtUnitPriceCents === 'number' && compareAtUnitPriceCents > unitPriceCents
        ? compareAtUnitPriceCents * quantity
        : undefined;

    return (
      <div
        ref={ref}
        data-xen-cart-line-item=""
        data-xen-v4-row=""
        className={cn(
          // `items-start` and not the row family's `items-center`: this row is
          // taller than its leading slot (it carries a stepper), and a 44
          // thumbnail floated in the middle of a 90-point row reads as
          // detached from the title it belongs to.
          'flex w-full items-start gap-md bg-transparent px-md py-sm',
          rowHeightClass(true),
          className
        )}
        {...rest}
      >
        <div
          className={cn(
            ROW_V4_LEADING_CLASS,
            'overflow-hidden rounded-[var(--xen-radius-md)] border border-border'
          )}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt ?? title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            // The seeded cover is a *fallback*, not a design-line element —
            // same art, same seed, same props as the base drew.
            <GenerativeCover seed={slug ?? title} label={title} className="h-full w-full" />
          )}
        </div>

        <div className={ROW_V4_TEXT_CLASS}>
          <TextV4 size="base" weight="semibold" tone="onSurface" numberOfLines={1}>
            {title}
          </TextV4>
          {variantTitle ? (
            // `mutedText`, not `muted`. `muted` is a fill and carries no
            // contrast promise; the whole base line used it as a text colour.
            <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
              {variantTitle}
            </TextV4>
          ) : null}
          {onQuantityChange ? (
            <QuantityStepperV4
              value={quantity}
              min={min}
              max={max}
              onChange={onQuantityChange}
              label={`Quantity for ${title}`}
              className="mt-xs"
            />
          ) : (
            <TextV4 size="sm" tone="mutedText" numeric="tabular">
              {`Qty ${quantity}`}
            </TextV4>
          )}
        </div>

        <div className="flex shrink-0 flex-col items-end gap-xs">
          <span data-xen-line-total="">
            <PriceTagV4
              cents={lineTotal}
              compareAtCents={compareLineTotal}
              currency={currency}
              size={MONEY_LINE_SIZE}
              // Passed straight through: `PriceTagV4` already defaults it to
              // `formatMoney`, so there is exactly one place cents become a
              // string on this row (brief §1.1).
              formatMoney={format}
            />
          </span>
          {onRemove ? (
            <button
              type="button"
              onClick={onRemove}
              aria-label={removeLabel ?? `Remove ${title}`}
              data-xen-v4-state=""
              data-xen-cart-remove=""
              className={cn(
                'inline-flex items-center justify-center rounded-[var(--xen-radius-md)] px-sm',
                MIN_TAP_CLASS,
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              )}
            >
              <TextV4 size="sm" tone="mutedText">
                Remove
              </TextV4>
            </button>
          ) : null}
        </div>
      </div>
    );
  }
);
