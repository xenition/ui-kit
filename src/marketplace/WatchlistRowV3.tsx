import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney } from '../commerce';
import { activateOnKey } from './internal';
import type { WatchlistRowProps } from './WatchlistRow';

/** Same public contract as {@link WatchlistRow} — a drop-in alternate design. */
export type WatchlistRowV3Props = WatchlistRowProps;

/**
 * WatchlistRow, redesigned (v3): an **ultra-dense saved line**. A tiny thumbnail,
 * the title inline, the price pinned right (struck compare-at beneath when it
 * dropped), and a compact ♥ toggle — a single hairline row for a long watchlist.
 * Ended items dim + strike the title. The opposite of v2's card. Same props,
 * token-only.
 */
export const WatchlistRowV3 = React.forwardRef<HTMLDivElement, WatchlistRowV3Props>(
  function WatchlistRowV3(
    { title, priceCents, currency = 'USD', compareAtCents, imageUrl, condition, watched = true, ended, onToggleWatch, onClick, className, ...rest },
    ref
  ) {
    void condition;
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
          'flex items-center gap-3 border-b border-border py-2',
          interactive && 'cursor-pointer transition-colors hover:bg-neutral-50',
          ended && 'opacity-60',
          className
        )}
        {...rest}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded bg-neutral-100 text-base">
          {imageUrl ? <img src={imageUrl} alt="" className="h-full w-full object-cover" /> : '🛍️'}
        </div>
        <p className={cn('min-w-0 flex-1 truncate text-sm text-on-surface', ended && 'text-muted line-through')}>
          {title}
        </p>
        <div className="text-right">
          <span className="text-sm font-semibold text-on-surface">{formatMoney(priceCents, currency)}</span>
          {dropped ? (
            <p className="text-xs text-success">↓ {formatMoney(compareAtCents!, currency)}</p>
          ) : null}
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
            className={cn('text-base', watched ? 'text-danger' : 'text-muted')}
          >
            {watched ? '♥' : '♡'}
          </button>
        ) : null}
      </div>
    );
  }
);
