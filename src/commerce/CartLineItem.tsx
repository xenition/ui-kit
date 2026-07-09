import * as React from 'react';
import { cn } from '../primitives/cn';
import { GenerativeCover } from '../marketing/GenerativeCover';
import { QuantityStepper } from './QuantityStepper';
import { formatMoney, MoneyFormatter } from './money';

export interface CartLineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Product title. */
  title: string;
  /** Chosen variant label (e.g. "Large / Black"). */
  variantTitle?: string;
  /** Quantity in the cart. */
  quantity: number;
  /** Unit price in integer cents. */
  unitPriceCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Thumbnail image URL. When absent a seeded `GenerativeCover` is drawn. */
  imageUrl?: string;
  /** Alt text for the thumbnail (defaults to the title). */
  imageAlt?: string;
  /** Stable id seeding the cover fallback (defaults to the title). */
  slug?: string;
  /** Quantity-change handler. When absent the stepper is hidden (read-only). */
  onQuantityChange?: (quantity: number) => void;
  /** Remove handler; renders a remove button when provided. */
  onRemove?: () => void;
  /** Minimum quantity (default 1). */
  min?: number;
  /** Maximum quantity. */
  max?: number;
  /** Remove button accessible label (default `Remove {title}`). */
  removeLabel?: string;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
}

/**
 * One line in a cart: thumbnail (image or seeded cover), title + variant, a
 * {@link QuantityStepper}, the line total (`unitPrice × quantity`), and a
 * remove control. Token-only. Money is integer cents throughout.
 */
export const CartLineItem = React.forwardRef<HTMLDivElement, CartLineItemProps>(
  function CartLineItem(
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
          'flex items-start gap-[var(--xen-space-md)] py-[var(--xen-space-md)]',
          className
        )}
        {...rest}
      >
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-[var(--xen-radius-md)] border border-border bg-neutral-100">
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

        <div className="flex min-w-0 flex-1 flex-col gap-[var(--xen-space-sm)]">
          <div className="flex flex-col">
            <span className="truncate font-heading text-sm font-semibold text-on-surface">
              {title}
            </span>
            {variantTitle ? (
              <span className="truncate text-xs text-muted">{variantTitle}</span>
            ) : null}
          </div>
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
        </div>

        <div className="flex flex-col items-end gap-[var(--xen-space-xs)]">
          <span data-xen-line-total="" className="font-heading text-sm font-semibold text-on-surface">
            {format(lineTotal, currency)}
          </span>
          {onRemove ? (
            <button
              type="button"
              onClick={onRemove}
              aria-label={removeLabel ?? `Remove ${title}`}
              className="text-xs text-muted underline-offset-2 hover:text-danger hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger"
            >
              Remove
            </button>
          ) : null}
        </div>
      </div>
    );
  }
);
