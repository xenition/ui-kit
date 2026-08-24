import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney } from '../commerce';
import { ConditionBadge } from './ConditionBadge';
import { activateOnKey } from './internal';
import type { ListingCardProps } from './ListingCard';

/** Same public contract as {@link ListingCard} — a drop-in alternate design. */
export type ListingCardV2Props = ListingCardProps;

/**
 * ListingCard, redesigned (v2): a **full-bleed featured card**. The photo fills
 * the tile; the watch ♥ floats top-right, the condition badge top-left, and the
 * title/subtitle/price sit on a gradient scrim at the bottom. Elevated,
 * hover-lift. Same props as {@link ListingCard}, token-only.
 */
export const ListingCardV2 = React.forwardRef<HTMLDivElement, ListingCardV2Props>(function ListingCardV2(
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
        className={cn('h-56 animate-pulse rounded-lg bg-neutral-100', className)}
        {...rest}
      />
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
        'relative flex h-56 flex-col justify-end overflow-hidden rounded-lg bg-neutral-100 shadow-md transition-transform',
        interactive && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        className
      )}
      {...rest}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-4xl">🛍️</div>
      )}

      <div className="absolute left-2 top-2">{condition ? <ConditionBadge condition={condition} /> : null}</div>
      {onToggleWatch ? (
        <button
          type="button"
          aria-label={watched ? 'Unwatch' : 'Watch'}
          aria-pressed={!!watched}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWatch(!watched);
          }}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-surface/90 text-base"
        >
          <span className={watched ? 'text-danger' : 'text-muted'}>{watched ? '♥' : '♡'}</span>
        </button>
      ) : null}

      <div className="relative bg-gradient-to-t from-neutral-900/70 to-transparent p-3 pt-8">
        <p className="truncate text-sm font-bold text-neutral-50">{title}</p>
        {subtitle ? <p className="truncate text-xs text-neutral-200">{subtitle}</p> : null}
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-base font-bold text-neutral-50">{formatMoney(priceCents, currency)}</span>
          {onSale ? (
            <span className="text-xs text-neutral-300 line-through">{formatMoney(compareAtCents!, currency)}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
});
