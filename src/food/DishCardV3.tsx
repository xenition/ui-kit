import * as React from 'react';
import { cn } from '../primitives/cn';
import { Rating } from '../primitives/Rating';
import { PriceTag } from '../commerce';
import type { DishCardProps } from './DishCard';

/** Drop-in for {@link DishCard}: identical props, a distinct design. */
export type DishCardV3Props = DishCardProps;

/**
 * DishCard, alternate design **V3** — a *text-first* menu line. Borderless and
 * dense, separated from its neighbours by a single hairline rule rather than a
 * card. The name and price share the top baseline (name left, price right,
 * bridged by a dotted leader), the description follows, and a small square
 * thumbnail sits on the *right* — the inverse of the base left-thumb row. Adding
 * is a quiet text button, not a filled pill. Same props as the base; token-only.
 */
export const DishCardV3 = React.forwardRef<HTMLDivElement, DishCardV3Props>(function DishCardV3(
  {
    name,
    description,
    priceCents,
    currency = 'USD',
    imageUrl,
    rating,
    badges,
    soldOut = false,
    loading = false,
    onClick,
    onAdd,
    addLabel = 'Add',
    soldOutLabel = 'Sold out',
    formatMoney,
    className,
    ...rest
  },
  ref
) {
  const containerClass = cn(
    'flex flex-row items-start gap-[var(--xen-space-md)] border-b border-border bg-transparent py-[var(--xen-space-md)]',
    soldOut && 'opacity-60',
    className
  );

  if (loading) {
    return (
      <div ref={ref} aria-busy="true" aria-label="Loading dish" className={containerClass} {...rest}>
        <div className="flex flex-1 flex-col gap-[var(--xen-space-sm)]">
          <div className="h-3.5 w-1/2 rounded-[var(--xen-radius-sm)] bg-neutral-200" />
          <div className="h-3 w-4/5 rounded-[var(--xen-radius-sm)] bg-neutral-100" />
        </div>
        <div className="h-14 w-14 shrink-0 rounded-[var(--xen-radius-md)] bg-neutral-200" />
      </div>
    );
  }

  const body = (
    <div className="flex flex-1 flex-col gap-[var(--xen-space-xs)]">
      <div className="flex items-baseline gap-[var(--xen-space-sm)]">
        <p className="min-w-0 shrink truncate font-heading font-bold text-on-surface">{name}</p>
        <span className="mb-1 h-0 flex-1 self-end border-b border-dotted border-border" aria-hidden="true" />
        <PriceTag cents={priceCents} currency={currency} formatMoney={formatMoney} size="sm" />
      </div>
      {description ? <p className="line-clamp-2 text-sm text-muted">{description}</p> : null}
      <div className="mt-[var(--xen-space-xs)] flex flex-wrap items-center gap-[var(--xen-space-md)]">
        {typeof rating === 'number' ? <Rating value={rating} size="sm" showValue /> : null}
        {badges ? <div className="flex flex-wrap gap-[var(--xen-space-xs)]">{badges}</div> : null}
        {soldOut ? (
          <span className="text-sm font-semibold text-danger">{soldOutLabel}</span>
        ) : onAdd ? (
          <button
            type="button"
            aria-label={addLabel}
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            className="text-sm font-bold text-primary transition-opacity duration-200 hover:opacity-70 active:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none"
          >
            + {addLabel}
          </button>
        ) : null}
      </div>
    </div>
  );

  const media = (
    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100">
      {imageUrl ? (
        <img src={imageUrl} alt={name} loading="lazy" className="h-full w-full object-cover" />
      ) : null}
    </div>
  );

  const inner = (
    <>
      {body}
      {media}
    </>
  );

  const interactive = typeof onClick === 'function';
  return (
    <div
      ref={ref}
      className={cn(
        containerClass,
        interactive &&
          'cursor-pointer transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none'
      )}
      {...rest}
      {...(interactive
        ? {
            role: 'button',
            tabIndex: soldOut ? -1 : 0,
            'aria-label': name,
            'aria-disabled': soldOut || undefined,
            onClick,
            onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            },
          }
        : {})}
    >
      {inner}
    </div>
  );
});
