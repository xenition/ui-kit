import * as React from 'react';
import { cn } from '../primitives/cn';
import { GenerativeCover } from '../marketing/GenerativeCover';
import { QuantityStepper } from './QuantityStepper';
import { formatMoney } from './money';
import type { CartLineItemProps } from './CartLineItem';

/** Drop-in alternate of {@link CartLineItemProps} — identical prop contract. */
export type CartLineItemV3Props = CartLineItemProps;

/**
 * CartLineItem — design variant **V3**: a **compact, dense single row**. Where
 * the base stacks each field into its own column and V2 is an elevated card, V3
 * packs a small thumbnail, the title with an inline `·` variant, the stepper (or
 * a `×qty` chip), the line total, and a tiny remove `×` onto one tight line
 * separated only by a hairline underline — built for long, scannable carts.
 * Same props as {@link CartLineItemProps}. Token-only; money is integer cents.
 */
export const CartLineItemV3 = React.forwardRef<HTMLDivElement, CartLineItemV3Props>(
  function CartLineItemV3(
    {
      title,
      variantTitle,
      quantity,
      unitPriceCents,
      currency = 'USD',
      imageUrl,
      imageAlt,
      slug,
      onQuantityChange,
      onRemove,
      min = 1,
      max,
      removeLabel,
      formatMoney: format = formatMoney,
      className,
      ...rest
    },
    ref
  ) {
    const lineTotal = unitPriceCents * quantity;

    return (
      <div
        ref={ref}
        data-xen-cart-line-item=""
        className={cn(
          'flex items-center gap-[var(--xen-space-sm)] border-b border-border py-[var(--xen-space-sm)]',
          className
        )}
        {...rest}
      >
        <div className="h-9 w-9 shrink-0 overflow-hidden rounded-[var(--xen-radius-sm)] bg-neutral-100">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt ?? title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <GenerativeCover seed={slug ?? title} label={title} className="h-full w-full" />
          )}
        </div>

        <p className="min-w-0 flex-1 truncate text-sm text-on-surface">
          <span className="font-semibold">{title}</span>
          {variantTitle ? <span className="text-xs text-muted"> · {variantTitle}</span> : null}
        </p>

        {onQuantityChange ? (
          <QuantityStepper
            value={quantity}
            min={min}
            max={max}
            onChange={onQuantityChange}
            label={`Quantity for ${title}`}
          />
        ) : (
          <span className="shrink-0 text-xs text-muted">×{quantity}</span>
        )}

        <span
          data-xen-line-total=""
          className="w-14 shrink-0 text-right text-sm font-semibold tabular-nums text-on-surface"
        >
          {format(lineTotal, currency)}
        </span>

        {onRemove ? (
          <button
            type="button"
            onClick={onRemove}
            aria-label={removeLabel ?? `Remove ${title}`}
            className="shrink-0 rounded-[var(--xen-radius-sm)] px-[var(--xen-space-xs)] text-base leading-none text-muted transition-colors hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger"
          >
            <span aria-hidden="true">×</span>
          </button>
        ) : null}
      </div>
    );
  }
);
