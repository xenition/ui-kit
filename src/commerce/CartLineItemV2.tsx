import * as React from 'react';
import { cn } from '../primitives/cn';
import { GenerativeCover } from '../marketing/GenerativeCover';
import { QuantityStepper } from './QuantityStepper';
import { formatMoney } from './money';
import type { CartLineItemProps } from './CartLineItem';

/** Drop-in alternate of {@link CartLineItemProps} — identical prop contract. */
export type CartLineItemV2Props = CartLineItemProps;

/**
 * CartLineItem — design variant **V2**: a self-contained **elevated card** with
 * a large, prominent thumbnail. Where the base is a flat row with the stepper on
 * the right, V2 gives the line its own floating surface: a big cover on the left,
 * the title + variant paired with a **remove ×** in a header row, and a footer
 * row that couples the inline {@link QuantityStepper} with a bold line total.
 * Same props as {@link CartLineItemProps}. Token-only; money is integer cents.
 */
export const CartLineItemV2 = React.forwardRef<HTMLDivElement, CartLineItemV2Props>(
  function CartLineItemV2(
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
          'flex items-stretch gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] bg-surface p-[var(--xen-space-md)] shadow-md',
          'transition duration-200 hover:-translate-y-0.5 hover:shadow-lg',
          'motion-reduce:transition-none motion-reduce:hover:transform-none',
          className
        )}
        {...rest}
      >
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100">
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

        <div className="flex min-w-0 flex-1 flex-col justify-between gap-[var(--xen-space-sm)]">
          <div className="flex items-start gap-[var(--xen-space-sm)]">
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate font-heading text-base font-semibold text-on-surface">
                {title}
              </span>
              {variantTitle ? (
                <span className="truncate text-xs text-muted">{variantTitle}</span>
              ) : null}
            </div>
            {onRemove ? (
              <button
                type="button"
                onClick={onRemove}
                aria-label={removeLabel ?? `Remove ${title}`}
                className="-mr-1 -mt-1 shrink-0 rounded-[var(--xen-radius-full)] px-[var(--xen-space-xs)] text-lg leading-none text-muted transition-colors hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger"
              >
                <span aria-hidden="true">×</span>
              </button>
            ) : null}
          </div>

          <div className="flex items-center justify-between gap-[var(--xen-space-sm)]">
            {onQuantityChange ? (
              <QuantityStepper
                value={quantity}
                min={min}
                max={max}
                onChange={onQuantityChange}
                label={`Quantity for ${title}`}
              />
            ) : (
              <span className="text-xs text-muted">Qty {quantity}</span>
            )}
            <span
              data-xen-line-total=""
              className="font-heading text-base font-bold tabular-nums text-on-surface"
            >
              {format(lineTotal, currency)}
            </span>
          </div>
        </div>
      </div>
    );
  }
);
