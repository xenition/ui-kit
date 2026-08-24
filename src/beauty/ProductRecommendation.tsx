import * as React from 'react';
import { cn } from '../primitives/cn';
import { Rating, Button } from '../primitives';
import { formatMoney, type MoneyFormatter } from '../commerce';

export interface ProductRecommendationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Product name. */
  name: string;
  /** Price in integer cents. */
  priceCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Brand / line. */
  brand?: string;
  /** Average rating (0–5). Hidden when omitted. */
  rating?: number;
  /** Thumbnail URL; a token-tinted square shows when absent. */
  imageUrl?: string;
  /** Why it's recommended (e.g. "Pairs with your color service"). */
  reason?: string;
  /** Whether the item is already in the bag; swaps the CTA. */
  added?: boolean;
  /** Out-of-stock — disables the CTA. */
  soldOut?: boolean;
  /** Override the cents → string money formatter. */
  formatMoney?: MoneyFormatter;
  /** Add-to-bag CTA label (default "Add"). */
  addLabel?: string;
  /** Fires when the CTA is pressed. */
  onAdd?: () => void;
  /** Fires when the row body is activated. */
  onClick?: () => void;
}

/**
 * A retail product recommendation row for after-service upsell: thumbnail,
 * brand + name, a star rating, a highlighted "reason" line, the price, and an
 * add-to-bag CTA. `added` swaps the CTA to a done state; `soldOut` disables it
 * (state + label, not color alone). Missing image degrades to a token-tinted
 * square. Prices are integer cents via {@link formatMoney}. Token-only colors.
 */
export const ProductRecommendation = React.forwardRef<HTMLDivElement, ProductRecommendationProps>(
  function ProductRecommendation(
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
      formatMoney: format = formatMoney,
      addLabel = 'Add',
      onAdd,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    const priceText = format(priceCents, currency);
    const interactive = !!onClick;

    return (
      <div
        ref={ref}
        data-xen-product-recommendation=""
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={`${brand ? `${brand} ` : ''}${name}, ${priceText}${
          soldOut ? ', sold out' : ''
        }${added ? ', in bag' : ''}`}
        onClick={onClick}
        onKeyDown={
          interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.currentTarget.click();
                }
              }
            : undefined
        }
        className={cn(
          'flex gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] text-on-surface',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          interactive && 'cursor-pointer transition-opacity hover:opacity-95',
          className
        )}
        {...rest}
      >
        <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100">
          {imageUrl ? (
            <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
          ) : (
            <span aria-hidden="true" className="text-xl">
              🧴
            </span>
          )}
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          {brand ? (
            <span className="text-xs font-bold uppercase text-muted">{brand}</span>
          ) : null}
          <span className="truncate text-base font-bold text-on-surface">{name}</span>
          {rating != null ? <Rating value={rating} size="sm" /> : null}
          {reason ? (
            <span className="line-clamp-2 text-xs font-semibold text-accent">{reason}</span>
          ) : null}
          <div className="mt-[var(--xen-space-xs)] flex items-center justify-between">
            <span className="text-base font-bold text-on-surface">{priceText}</span>
            {onAdd ? (
              <Button
                variant={added ? 'secondary' : 'primary'}
                size="sm"
                disabled={soldOut}
                onClick={(e) => {
                  e.stopPropagation();
                  onAdd();
                }}
              >
                {soldOut ? 'Sold out' : added ? '✓ Added' : addLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);
