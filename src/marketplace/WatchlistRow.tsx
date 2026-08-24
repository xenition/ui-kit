import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives';
import { PriceTag } from '../commerce';
import { ConditionBadge } from './ConditionBadge';
import { activateOnKey, type Condition } from './internal';

export interface WatchlistRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Listing title. */
  title: string;
  /** Current price in integer minor units (cents). */
  priceCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Optional prior price in cents; struck when higher than `priceCents`. */
  compareAtCents?: number;
  /** Thumbnail image URL. Omit for a token placeholder. */
  imageUrl?: string;
  /** Item condition; renders a small `ConditionBadge`. */
  condition?: Condition;
  /** Whether the item is currently watched (drives the ♥ toggle). Default `true`. */
  watched?: boolean;
  /** Marks the item as sold/unavailable → a neutral badge + dimmed row. */
  ended?: boolean;
  /** Fires when the watch toggle is clicked (kept out of the row press target). */
  onToggleWatch?: (next: boolean) => void;
  /**
   * Fires when the row body is activated (open detail). When set, that body
   * becomes a `role="button"` with keyboard support.
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

/**
 * A row in a saved / watchlist screen — thumbnail, title, price (with optional
 * compare-at drop), a condition chip, and a ♥ watch toggle. The toggle is a real
 * `<button>` outside the row's press target, so un-watching never also
 * navigates. Presentational: shaped data + callbacks only. `ended` dims the row
 * and shows a "Sold" badge (state via text + tone, not color alone). Reuses
 * `PriceTag`, `Badge`, and `ConditionBadge`; token-only colors.
 */
export const WatchlistRow = React.forwardRef<HTMLDivElement, WatchlistRowProps>(function WatchlistRow(
  {
    title,
    priceCents,
    currency = 'USD',
    compareAtCents,
    imageUrl,
    condition,
    watched = true,
    ended = false,
    onToggleWatch,
    onClick,
    className,
    ...rest
  },
  ref
) {
  const interactive = onClick != null;

  const content = (
    <div className={cn('flex flex-1 items-center gap-[var(--xen-space-md)]', ended && 'opacity-60')}>
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100">
        {imageUrl ? (
          <img src={imageUrl} alt="" className="h-16 w-16 object-cover" loading="lazy" />
        ) : (
          <span className="text-xs text-muted">No photo</span>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="line-clamp-2 text-base font-semibold text-on-surface">{title}</p>
        <PriceTag cents={priceCents} currency={currency} compareAtCents={compareAtCents} size="sm" />
        <div className="flex items-center gap-[var(--xen-space-sm)]">
          {condition ? <ConditionBadge condition={condition} size="sm" /> : null}
          {ended ? <Badge tone="neutral">Sold</Badge> : null}
        </div>
      </div>
    </div>
  );

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface p-[var(--xen-space-md)]',
        className
      )}
      {...rest}
    >
      {interactive ? (
        <div
          role="button"
          tabIndex={0}
          onClick={onClick}
          onKeyDown={activateOnKey}
          aria-label={title}
          className="flex flex-1 cursor-pointer items-center rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {content}
        </div>
      ) : (
        content
      )}
      {onToggleWatch != null ? (
        <button
          type="button"
          aria-label={watched ? `Remove ${title} from watchlist` : `Add ${title} to watchlist`}
          aria-pressed={watched}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWatch(!watched);
          }}
          className={cn('p-[var(--xen-space-xs)] text-lg leading-none', watched ? 'text-danger' : 'text-muted')}
        >
          <span aria-hidden="true">{watched ? '♥' : '♡'}</span>
        </button>
      ) : null}
    </div>
  );
});
