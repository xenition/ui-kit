import * as React from 'react';
import { cn } from '../primitives/cn';
import { PriceTag, formatMoney } from '../commerce';
import { ConditionBadge } from './ConditionBadge';
import { activateOnKey, type Condition } from './internal';

/** Layout treatment of the card. */
export type ListingCardVariant = 'grid' | 'list' | 'featured';

export interface ListingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Listing headline. */
  title: string;
  /** Asking price in integer minor units (cents). */
  priceCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Optional struck "was" price in cents (higher than `priceCents`). */
  compareAtCents?: number;
  /** Hero image URL. Omit for a token-styled placeholder. */
  imageUrl?: string;
  /** Item condition; renders a `ConditionBadge` when set. */
  condition?: Condition;
  /** Short location / seller line (e.g. "Brooklyn · 2mi"). */
  subtitle?: string;
  /** Whether the current user is watching this listing (drives the ♥ chip). */
  watched?: boolean;
  /** Fires when the watch chip is clicked (kept out of the card press target). */
  onToggleWatch?: (next: boolean) => void;
  /** Layout variant. Default `grid`. */
  variant?: ListingCardVariant;
  /** Renders a token placeholder recap instead of data. */
  loading?: boolean;
  /**
   * Fires when the card body is activated (open detail). When set, the card
   * becomes a `role="button"` with keyboard (Enter/Space) support.
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const MEDIA_CLASS: Record<ListingCardVariant, string> = {
  grid: 'aspect-[4/3] w-full',
  list: 'h-24 w-24 shrink-0',
  featured: 'aspect-video w-full',
};

/**
 * A single marketplace listing summary — hero media, price (with optional
 * compare-at), title, condition chip, and a location/seller line, plus an
 * optional ♥ watch toggle. Presentational: shaped data + callbacks only, nothing
 * fetches. `grid` (default) stacks media over text, `list` is a compact
 * horizontal row, `featured` enlarges the media. Colors come exclusively from
 * the `--xen-*` token classes. Pass `loading` for a recap. The watch toggle is a
 * real `<button>` outside the card press target, so watching never also
 * navigates.
 */
export const ListingCard = React.forwardRef<HTMLDivElement, ListingCardProps>(function ListingCard(
  {
    title,
    priceCents,
    currency = 'USD',
    compareAtCents,
    imageUrl,
    condition,
    subtitle,
    watched = false,
    onToggleWatch,
    variant = 'grid',
    loading = false,
    onClick,
    className,
    ...rest
  },
  ref
) {
  const horizontal = variant === 'list';
  const interactive = onClick != null;

  const watchChip =
    onToggleWatch != null ? (
      <button
        type="button"
        aria-label={watched ? `Unwatch ${title}` : `Watch ${title}`}
        aria-pressed={watched}
        onClick={(e) => {
          e.stopPropagation();
          onToggleWatch(!watched);
        }}
        className={cn(
          'absolute right-[var(--xen-space-sm)] top-[var(--xen-space-sm)] inline-flex h-8 w-8 items-center justify-center',
          'rounded-[var(--xen-radius-full)] bg-surface/85 text-base leading-none shadow-sm',
          watched ? 'text-danger' : 'text-muted'
        )}
      >
        <span aria-hidden="true">{watched ? '♥' : '♡'}</span>
      </button>
    ) : null;

  const media = (
    <div
      className={cn(
        'flex items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100',
        MEDIA_CLASS[variant]
      )}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <span className="text-sm text-muted">No photo</span>
      )}
    </div>
  );

  const info = (
    <div className="flex flex-1 flex-col justify-center gap-0.5">
      {loading ? (
        <span className="text-sm text-muted">Loading listing…</span>
      ) : (
        <>
          <PriceTag
            cents={priceCents}
            currency={currency}
            compareAtCents={compareAtCents}
            size={variant === 'featured' ? 'lg' : 'md'}
          />
          <p className="line-clamp-2 text-base font-semibold text-on-surface">{title}</p>
          <div className="flex flex-wrap items-center gap-[var(--xen-space-sm)]">
            {condition ? <ConditionBadge condition={condition} size="sm" /> : null}
            {subtitle ? <span className="min-w-0 truncate text-sm text-muted">{subtitle}</span> : null}
          </div>
        </>
      )}
    </div>
  );

  const priceLabel = formatMoney(priceCents, currency);

  return (
    <div
      ref={ref}
      {...(interactive
        ? {
            role: 'button',
            tabIndex: 0,
            onClick,
            onKeyDown: activateOnKey,
            'aria-label': `${title}, ${priceLabel}${condition ? `, ${condition}` : ''}`,
          }
        : {})}
      className={cn(
        'relative gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)]',
        horizontal ? 'flex flex-row' : 'flex flex-col',
        interactive && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      {...rest}
    >
      {media}
      {info}
      {watchChip}
    </div>
  );
});
