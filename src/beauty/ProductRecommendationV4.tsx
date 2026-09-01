import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { RatingV4 } from '../primitives/RatingV4';
import { formatMoney as defaultFormatMoney } from '../commerce/money';
import { metaLine } from './internal/salon-v4';
import type { ProductRecommendationProps } from './ProductRecommendation';

export interface ProductRecommendationV4Props extends ProductRecommendationProps {
  /** Copy on the button once the item is in the basket. Default `'Added'`. */
  addedLabel?: string;
  /** Copy when the item cannot be bought. Default `'Sold out'`. */
  soldOutLabel?: string;
  /** Label above the reason. Default `'Why this'`. */
  reasonLabel?: string;
}

/**
 * **V4 product recommendation** — the web twin of the native
 * `ProductRecommendationV4`, same props as {@link ProductRecommendation} plus
 * `addedLabel`, `soldOutLabel` and `reasonLabel`.
 *
 * ## Four changes
 *
 * 1. **The rating carries its number** — this is a shelf where a shopper
 *    compares two products, and five glyphs is not a number.
 * 2. **Sold out `disabled`s the button** rather than only greying a live one.
 * 3. **The reason is labelled.** "Because you booked a keratin treatment" read
 *    as a second description; it is the whole point of a recommendation.
 * 4. **The thumbnail has a fixed ratio and a `muted` ground**, so a shelf does
 *    not reflow as images arrive.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export const ProductRecommendationV4 = React.forwardRef<
  HTMLDivElement,
  ProductRecommendationV4Props
>(function ProductRecommendationV4(
  {
    name,
    priceCents,
    currency = 'USD',
    brand,
    rating,
    imageUrl,
    reason,
    added = false,
    soldOut = false,
    formatMoney = defaultFormatMoney,
    addLabel = 'Add',
    addedLabel = 'Added',
    soldOutLabel = 'Sold out',
    reasonLabel = 'Why this',
    onAdd,
    onClick,
    className,
    ...rest
  },
  ref
) {
  if (!name) return null;

  const price = formatMoney(priceCents, currency);
  const cta = soldOut ? soldOutLabel : added ? addedLabel : addLabel;

  const body = (
    <>
      <div className="flex gap-md">
        <span className="aspect-square w-20 shrink-0 overflow-hidden rounded-[var(--xen-radius-md)] bg-muted">
          {imageUrl ? (
            <img src={imageUrl} alt="" loading="lazy" className="h-full w-full object-cover" />
          ) : null}
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-xs">
          {brand ? <span className="truncate text-xs text-muted-text">{brand}</span> : null}
          <span className="font-heading text-base font-bold text-on-card">{name}</span>
          {typeof rating === 'number' ? <RatingV4 value={rating} size="sm" showValue /> : null}
          <span className="font-heading text-lg font-bold text-on-card [font-variant-numeric:tabular-nums]">
            {price}
          </span>
        </div>

        {soldOut ? (
          <BadgeV4 tone="neutral" variant="soft" size="sm">
            {soldOutLabel}
          </BadgeV4>
        ) : null}
      </div>

      {reason ? (
        <div className="mt-sm flex flex-col gap-0.5">
          <span className="text-xs font-semibold text-muted-text">{reasonLabel}</span>
          <span className="text-sm text-on-card">{reason}</span>
        </div>
      ) : null}

      {onAdd ? (
        <ButtonV4
          variant={added ? 'secondary' : 'primary'}
          size="sm"
          // Sold out DISABLES the control. The base dimmed it and left it live.
          disabled={soldOut}
          onClick={onAdd}
          aria-label={`${cta}, ${name}`}
          className="mt-md w-full gap-xs"
        >
          {added ? <IconV4 name="check" size="sm" /> : null}
          {cta}
        </ButtonV4>
      ) : null}
    </>
  );

  if (!onClick) {
    return (
      <CardV4
        ref={ref}
        data-xen-product-recommendation=""
        className={cn(soldOut && 'opacity-[0.38]', className)}
        {...rest}
      >
        {body}
      </CardV4>
    );
  }

  return (
    <CardV4
      ref={ref}
      data-xen-product-recommendation=""
      className={cn('p-0', soldOut && 'opacity-[0.38]', className)}
      {...rest}
    >
      <button
        type="button"
        onClick={onClick}
        aria-label={metaLine([brand, name, price, soldOut ? soldOutLabel : null])}
        data-xen-v4-chrome="on-surface"
        className="flex w-full flex-col rounded-[var(--xen-radius-lg)] p-lg text-left"
      >
        {body}
      </button>
    </CardV4>
  );
});
