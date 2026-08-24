import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney } from '../commerce';
import { ConditionBadge } from './ConditionBadge';
import { activateOnKey } from './internal';
import type { ListingCardProps } from './ListingCard';

/** Same public contract as {@link ListingCard} — a drop-in alternate design. */
export type ListingCardV3Props = ListingCardProps;

/**
 * ListingCard, redesigned (v3): a **dense list row**. A small square thumbnail,
 * the title over a subtitle·condition meta line, the price (with a struck
 * compare-at) pinned right, and a compact watch ♥ — hairline-bordered for long
 * catalog lists. The opposite of v2's featured tile. Same props, token-only.
 */
export const ListingCardV3 = React.forwardRef<HTMLDivElement, ListingCardV3Props>(function ListingCardV3(
  { title, priceCents, currency = 'USD', compareAtCents, imageUrl, condition, subtitle, watched, onToggleWatch, variant, loading = false, onClick, className, ...rest },
  ref
) {
  void variant;
  const interactive = typeof onClick === 'function';
  const onSale = typeof compareAtCents === 'number' && compareAtCents > priceCents;

  if (loading) {
    return (
      <div
        ref={ref}
        data-xen-listing-card=""
        aria-label="Loading listing"
        className={cn('flex items-center gap-3 border-b border-border py-3', className)}
        {...rest}
      >
        <div className="h-12 w-12 animate-pulse rounded-md bg-neutral-100" />
        <div className="h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-xen-listing-card=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={`${title}, ${formatMoney(priceCents, currency)}`}
      onClick={onClick}
      onKeyDown={interactive ? activateOnKey : undefined}
      className={cn(
        'flex items-center gap-3 border-b border-border py-3',
        interactive && 'cursor-pointer transition-colors hover:bg-neutral-50',
        className
      )}
      {...rest}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-100 text-xl">
        {imageUrl ? <img src={imageUrl} alt="" className="h-full w-full object-cover" /> : '🛍️'}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">{title}</p>
        <div className="flex items-center gap-1.5">
          {subtitle ? <span className="truncate text-xs text-muted">{subtitle}</span> : null}
          {condition ? <ConditionBadge condition={condition} size="sm" /> : null}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-right">
          <p className="text-sm font-bold text-on-surface">{formatMoney(priceCents, currency)}</p>
          {onSale ? (
            <p className="text-xs text-muted line-through">{formatMoney(compareAtCents!, currency)}</p>
          ) : null}
        </div>
        {onToggleWatch ? (
          <button
            type="button"
            aria-label={watched ? 'Unwatch' : 'Watch'}
            aria-pressed={!!watched}
            onClick={(e) => {
              e.stopPropagation();
              onToggleWatch(!watched);
            }}
            className={cn('text-lg', watched ? 'text-danger' : 'text-muted')}
          >
            {watched ? '♥' : '♡'}
          </button>
        ) : null}
      </div>
    </div>
  );
});
