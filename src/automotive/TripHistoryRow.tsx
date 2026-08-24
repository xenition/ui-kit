import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Rating, type BadgeTone } from '../primitives';
import { EmptyState, formatMoney } from '../commerce';

/** Outcome of a past trip. */
export type TripOutcome = 'completed' | 'cancelled' | 'no-show';
/** Presentation for a {@link TripHistoryRow}. */
export type TripHistoryVariant = 'default' | 'compact';

/** Outcome → badge tone + spelled-out word (never color alone). */
const OUTCOME: Record<TripOutcome, { tone: BadgeTone; word: string }> = {
  completed: { tone: 'success', word: 'Completed' },
  cancelled: { tone: 'danger', word: 'Cancelled' },
  'no-show': { tone: 'warn', word: 'No-show' },
};

export interface TripHistoryRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Pickup label / address (short). */
  from: string;
  /** Drop-off label / address (short). */
  to: string;
  /** When the trip happened, pre-formatted (e.g. `'Sep 3, 8:14 AM'`). */
  dateLabel?: string;
  /** Fare charged in integer minor units (cents). */
  fareCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Trip outcome. */
  outcome?: TripOutcome;
  /** Star rating the rider gave (0–5); hidden when omitted. */
  rating?: number;
  /** Presentation variant. */
  variant?: TripHistoryVariant;
  /** Fires when the row is pressed (receipt / detail). */
  onClick?: () => void;
}

/**
 * One past trip in a history list — the from→to route, when it happened, the
 * fare, an outcome (completed/cancelled/no-show, shown as a text-labelled badge
 * so meaning never rests on color), and an optional rider rating. Data +
 * `onClick` only; nothing fetches. Colors come from `--xen-*` token classes — no
 * literal colors. When `onClick` is set the row is a keyboard-operable
 * `role="button"`. `variant="compact"` tightens the row. For an empty history
 * list, render {@link TripHistoryEmpty} instead. Web parity of the native
 * `TripHistoryRow`.
 */
export const TripHistoryRow = React.forwardRef<HTMLDivElement, TripHistoryRowProps>(
  function TripHistoryRow(
    {
      from,
      to,
      dateLabel,
      fareCents,
      currency = 'USD',
      outcome = 'completed',
      rating,
      variant = 'default',
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    const o = OUTCOME[outcome] ?? OUTCOME.completed;
    const compact = variant === 'compact';

    const a11y = `Trip from ${from} to ${to}${dateLabel ? `, ${dateLabel}` : ''}, ${o.word}${
      typeof fareCents === 'number' ? `, ${formatMoney(fareCents, currency)}` : ''
    }`;

    const body = (
      <div className="flex items-center gap-[var(--xen-space-sm)]">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-sm font-bold text-on-surface">
            {from} → {to}
          </span>
          <div className="flex flex-wrap items-center gap-[var(--xen-space-xs)]">
            {dateLabel ? <span className="text-xs text-muted">{dateLabel}</span> : null}
            <Badge tone={o.tone}>{o.word}</Badge>
            {typeof rating === 'number' && !compact ? <Rating value={rating} size="sm" /> : null}
          </div>
        </div>
        {typeof fareCents === 'number' ? (
          <span className="text-base font-bold text-on-surface">{formatMoney(fareCents, currency)}</span>
        ) : null}
      </div>
    );

    const rootClass = cn(
      'rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-md)]',
      compact ? 'py-[var(--xen-space-sm)]' : 'py-[var(--xen-space-md)]',
      onClick &&
        'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
      className
    );

    if (!onClick) {
      return (
        <div ref={ref} data-xen-trip-history-row="" aria-label={a11y} className={rootClass} {...rest}>
          {body}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        data-xen-trip-history-row=""
        role="button"
        tabIndex={0}
        aria-label={a11y}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        className={rootClass}
        {...rest}
      >
        {body}
      </div>
    );
  }
);

export interface TripHistoryEmptyProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Headline for the empty state. */
  title?: string;
  /** Supporting line. */
  message?: string;
}

/**
 * The empty-state companion to {@link TripHistoryRow} — shown when a rider or
 * driver has no past trips. Wraps the shared {@link EmptyState}; token-only.
 */
export const TripHistoryEmpty = React.forwardRef<HTMLDivElement, TripHistoryEmptyProps>(
  function TripHistoryEmpty(
    { title = 'No trips yet', message = 'Completed rides will appear here.', ...rest },
    ref
  ) {
    return (
      <EmptyState
        ref={ref}
        data-xen-trip-history-empty=""
        icon={<span aria-hidden="true" className="text-2xl">🚗</span>}
        title={title}
        description={message}
        {...rest}
      />
    );
  }
);
