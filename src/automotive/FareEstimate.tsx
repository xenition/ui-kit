import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives';
import { formatMoney } from '../commerce';

/** Presentation for a {@link FareEstimate}. */
export type FareEstimateVariant = 'detailed' | 'summary';

/** A single line in the fare breakdown. */
export interface FareLineItem {
  /** Line label, e.g. `'Base fare'`. */
  label: string;
  /** Amount in integer minor units (cents); negatives render as discounts. */
  cents: number;
}

export interface FareEstimateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Line items making up the fare. */
  items?: FareLineItem[];
  /**
   * Explicit total in cents. When omitted the total is summed from `items`
   * (after applying `surgeMultiplier` to the summed subtotal).
   */
  totalCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Surge multiplier applied to the subtotal (e.g. `1.5`). */
  surgeMultiplier?: number;
  /** Estimated distance, pre-formatted (e.g. `'8.4 mi'`). */
  distanceLabel?: string;
  /** Estimated duration, pre-formatted (e.g. `'22 min'`). */
  durationLabel?: string;
  /** Presentation variant. `summary` hides the line-item breakdown. */
  variant?: FareEstimateVariant;
  /** Loading skeleton. */
  loading?: boolean;
}

/**
 * A ride fare estimate — an optional itemised breakdown (base, distance, time,
 * discounts) with an optional surge multiplier, plus distance/duration context
 * and a bold total. The total is either supplied or summed from the items (with
 * surge applied to the subtotal); a surge is spelled out in a badge, not color
 * alone. Presentational: shaped data only, nothing fetches. Colors come from
 * `--xen-*` token classes — no literal colors. `variant="summary"` collapses to
 * the total. Item indexing is guarded against a missing array. Web parity of the
 * native `FareEstimate`.
 */
export const FareEstimate = React.forwardRef<HTMLDivElement, FareEstimateProps>(function FareEstimate(
  {
    items,
    totalCents,
    currency = 'USD',
    surgeMultiplier,
    distanceLabel,
    durationLabel,
    variant = 'detailed',
    loading = false,
    className,
    ...rest
  },
  ref
) {
  const list = Array.isArray(items) ? items : [];
  const hasSurge = typeof surgeMultiplier === 'number' && surgeMultiplier > 1;

  const subtotal = list.reduce((sum, it) => sum + (Number.isFinite(it.cents) ? it.cents : 0), 0);
  const computed = hasSurge ? Math.round(subtotal * (surgeMultiplier as number)) : subtotal;
  const total = typeof totalCents === 'number' ? totalCents : computed;

  if (loading) {
    return (
      <div
        ref={ref}
        data-xen-fare-estimate=""
        aria-busy="true"
        aria-label="Loading fare estimate"
        className={cn(
          'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]',
          className
        )}
        {...rest}
      >
        <div className="h-3.5 w-3/5 animate-pulse rounded bg-neutral-100" />
        <div className="h-5 w-2/5 animate-pulse rounded bg-neutral-200" />
      </div>
    );
  }

  const showBreakdown = variant === 'detailed' && list.length > 0;
  const a11y = `Estimated fare ${formatMoney(total, currency)}${hasSurge ? `, ${surgeMultiplier}x surge` : ''}`;

  return (
    <div
      ref={ref}
      data-xen-fare-estimate=""
      aria-label={a11y}
      className={cn(
        'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]',
        className
      )}
      {...rest}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wide text-muted">Fare estimate</span>
        {hasSurge ? <Badge tone="warn">{`${surgeMultiplier}x surge`}</Badge> : null}
      </div>

      {distanceLabel || durationLabel ? (
        <span className="text-xs text-muted">{[distanceLabel, durationLabel].filter(Boolean).join(' · ')}</span>
      ) : null}

      {showBreakdown ? (
        <div className="mt-[var(--xen-space-xs)] flex flex-col gap-[var(--xen-space-xs)]">
          {list.map((it, i) => {
            const discount = it.cents < 0;
            return (
              <div key={`${it.label}-${i}`} className="flex justify-between">
                <span className="text-sm text-on-surface">{it.label}</span>
                <span className={cn('text-sm', discount ? 'font-bold text-success' : 'font-medium text-on-surface')}>
                  {formatMoney(it.cents, currency)}
                </span>
              </div>
            );
          })}
          {hasSurge ? (
            <div className="flex justify-between">
              <span className="text-xs text-muted">Surge ×{surgeMultiplier}</span>
            </div>
          ) : null}
        </div>
      ) : null}

      <div
        className={cn(
          'flex items-center justify-between',
          showBreakdown && 'border-t border-border pt-[var(--xen-space-sm)]'
        )}
      >
        <span className="text-base font-bold text-on-surface">Total</span>
        <span data-xen-fare-total="" className="text-2xl font-extrabold text-on-surface">
          {formatMoney(total, currency)}
        </span>
      </div>
    </div>
  );
});
