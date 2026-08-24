import * as React from 'react';
import { cn } from '../primitives/cn';
import { Rating } from '../primitives/Rating';
import { PriceTag } from '../commerce';
import type { DishCardProps } from './DishCard';

/** Drop-in for {@link DishCard}: identical props, a distinct design. */
export type DishCardV2Props = DishCardProps;

/**
 * DishCard, alternate design **V2** — an *image-hero* tile. Where the base card
 * is a horizontal thumb-plus-text row, V2 leads with a full-width photo that
 * fills the top of the card, floats the {@link PriceTag} in a frosted pill over
 * the bottom-left of the image, and hangs a circular add button off the bottom-
 * right so it reads like a delivery-app feature card. Text lives below on the
 * solid surface (never over the photo) so contrast holds. `soldOut`, `loading`,
 * and every prop behave exactly as the base. Token-only, elevated with a soft
 * hover lift.
 */
export const DishCardV2 = React.forwardRef<HTMLDivElement, DishCardV2Props>(function DishCardV2(
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
    'overflow-hidden rounded-[var(--xen-radius-lg)] bg-surface shadow-md',
    soldOut && 'opacity-60',
    className
  );

  if (loading) {
    return (
      <div ref={ref} aria-busy="true" aria-label="Loading dish" className={containerClass} {...rest}>
        <div className="h-[168px] w-full bg-neutral-200" />
        <div className="flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-md)]">
          <div className="h-3.5 w-3/5 rounded-[var(--xen-radius-sm)] bg-neutral-200" />
          <div className="h-3 w-11/12 rounded-[var(--xen-radius-sm)] bg-neutral-100" />
        </div>
      </div>
    );
  }

  const hero = (
    <div className="relative h-[168px] w-full overflow-visible">
      <div className="h-full w-full overflow-hidden bg-neutral-100">
        {imageUrl ? (
          <img src={imageUrl} alt={name} loading="lazy" className="h-full w-full object-cover" />
        ) : null}
      </div>

      {/* Frosted price pill, overlaid bottom-left. */}
      <span className="absolute bottom-[var(--xen-space-sm)] left-[var(--xen-space-sm)] rounded-full bg-surface/90 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] shadow-sm backdrop-blur-sm">
        <PriceTag cents={priceCents} currency={currency} formatMoney={formatMoney} size="sm" />
      </span>

      {soldOut ? (
        <span className="absolute left-[var(--xen-space-sm)] top-[var(--xen-space-sm)] rounded-full bg-danger/10 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-bold text-danger">
          {soldOutLabel}
        </span>
      ) : null}

      {/* Floating add button hanging off the bottom-right of the hero. */}
      {!soldOut && onAdd ? (
        <button
          type="button"
          aria-label={addLabel}
          onClick={(e) => {
            e.stopPropagation();
            onAdd();
          }}
          className="absolute bottom-0 right-[var(--xen-space-md)] inline-flex h-11 min-w-11 translate-y-1/2 items-center justify-center rounded-full bg-primary px-[var(--xen-space-md)] text-sm font-bold text-on-primary shadow-md transition duration-200 hover:shadow-lg active:scale-[.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none"
        >
          {addLabel}
        </button>
      ) : null}
    </div>
  );

  const body = (
    <div className="flex flex-col gap-[var(--xen-space-xs)] px-[var(--xen-space-md)] pb-[var(--xen-space-md)] pt-[var(--xen-space-lg)]">
      <p className="line-clamp-2 font-heading text-lg font-bold text-on-surface">{name}</p>
      {description ? <p className="line-clamp-2 text-sm text-muted">{description}</p> : null}
      {typeof rating === 'number' ? <Rating value={rating} size="sm" showValue /> : null}
      {badges ? <div className="mt-[var(--xen-space-xs)] flex flex-wrap gap-[var(--xen-space-xs)]">{badges}</div> : null}
    </div>
  );

  const inner = (
    <>
      {hero}
      {body}
    </>
  );

  const interactive = typeof onClick === 'function';
  return (
    <div
      ref={ref}
      className={cn(
        containerClass,
        interactive &&
          'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none motion-reduce:hover:transform-none'
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
