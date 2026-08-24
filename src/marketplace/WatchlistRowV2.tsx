import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney } from '../commerce';
import { ConditionBadge } from './ConditionBadge';
import { activateOnKey } from './internal';
import type { WatchlistRowProps } from './WatchlistRow';

/** Same public contract as {@link WatchlistRow} — a drop-in alternate design. */
export type WatchlistRowV2Props = WatchlistRowProps;

/**
 * WatchlistRow, redesigned (v2): an **elevated saved-item card**. A larger
 * thumbnail, the title over a condition chip, the price with a struck compare-at
 * and a "Price drop" flag when it fell, and a prominent watch ♥ — shadowed and
 * lifting on hover. Ended items dim + show a Sold badge. Distinct from v1's flat
 * row. Same props, token-only.
 */
export const WatchlistRowV2 = React.forwardRef<HTMLDivElement, WatchlistRowV2Props>(
  function WatchlistRowV2(
    { title, priceCents, currency = 'USD', compareAtCents, imageUrl, condition, watched = true, ended, onToggleWatch, onClick, className, ...rest },
    ref
  ) {
    const interactive = typeof onClick === 'function';
    const dropped = typeof compareAtCents === 'number' && compareAtCents > priceCents;

    return (
      <div
        ref={ref}
        data-xen-watchlist-row=""
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={`${title}, ${formatMoney(priceCents, currency)}${ended ? ', sold' : ''}`}
        onClick={onClick}
        onKeyDown={interactive ? activateOnKey : undefined}
        className={cn(
          'flex items-center gap-3 rounded-lg bg-surface p-3 shadow-sm transition-transform',
          interactive && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0',
          ended && 'opacity-60',
          className
        )}
        {...rest}
      >
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-100 text-2xl">
          {imageUrl ? <img src={imageUrl} alt="" className="h-full w-full object-cover" /> : '🛍️'}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-on-surface">{title}</p>
          <div className="mt-0.5 flex items-center gap-2">
            {condition ? <ConditionBadge condition={condition} size="sm" /> : null}
            {ended ? (
              <span className="rounded-full bg-neutral-200 px-2 py-0.5 text-xs text-on-surface">Sold</span>
            ) : dropped ? (
              <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">
                ↓ Price drop
              </span>
            ) : null}
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-base font-bold text-on-surface">{formatMoney(priceCents, currency)}</span>
            {dropped ? (
              <span className="text-xs text-muted line-through">{formatMoney(compareAtCents!, currency)}</span>
            ) : null}
          </div>
        </div>
        {onToggleWatch ? (
          <button
            type="button"
            aria-label={watched ? 'Unwatch' : 'Watch'}
            aria-pressed={watched}
            onClick={(e) => {
              e.stopPropagation();
              onToggleWatch(!watched);
            }}
            className={cn('text-xl', watched ? 'text-danger' : 'text-muted')}
          >
            {watched ? '♥' : '♡'}
          </button>
        ) : null}
      </div>
    );
  }
);
