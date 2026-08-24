import * as React from 'react';
import { cn } from '../primitives/cn';
import { Rating } from '../primitives/Rating';

export type RatingSummaryVariant = 'compact' | 'detailed';

export interface RatingSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Average rating (0–5). */
  average: number;
  /** Total number of ratings. */
  count: number;
  /**
   * Optional star-bucket counts, highest star first: `[5★, 4★, 3★, 2★, 1★]`.
   * When provided and `variant` is `detailed`, a distribution bar chart shows.
   */
  distribution?: number[];
  /** Presentation (default `compact`). */
  variant?: RatingSummaryVariant;
  /** Copy shown when `count` is 0 (default `No ratings yet`). */
  emptyLabel?: string;
}

/**
 * Aggregate rating block — a large average, a `Rating` star row, and the total
 * count. In `detailed` mode with a `distribution` it also draws a five-row bar
 * chart (5★→1★) using token-tinted fills. When `count` is 0 it shows a muted
 * empty label instead. Bar widths are guarded against a zero denominator. Web
 * parity of the native `RatingSummary`; token-only.
 */
export const RatingSummary = React.forwardRef<HTMLDivElement, RatingSummaryProps>(
  function RatingSummary(
    { average, count, distribution, variant = 'compact', emptyLabel = 'No ratings yet', className, ...rest },
    ref
  ) {
    if (count <= 0) {
      return (
        <div ref={ref} className={cn('flex flex-col gap-[var(--xen-space-xs)]', className)} {...rest}>
          <Rating value={0} size="sm" />
          <p className="text-sm text-muted">{emptyLabel}</p>
        </div>
      );
    }

    const header = (
      <div className="flex items-center gap-[var(--xen-space-md)]">
        <span className="font-heading text-3xl font-extrabold text-on-surface">{average.toFixed(1)}</span>
        <div className="flex flex-col gap-0.5">
          <Rating value={average} size="md" />
          <span className="text-sm text-muted">
            {count} {count === 1 ? 'rating' : 'ratings'}
          </span>
        </div>
      </div>
    );

    const a11yLabel = `${average.toFixed(1)} out of 5, ${count} ratings`;

    if (variant !== 'detailed' || !distribution || distribution.length === 0) {
      return (
        <div ref={ref} aria-label={a11yLabel} className={className} {...rest}>
          {header}
        </div>
      );
    }

    const maxBucket = Math.max(1, ...distribution);

    return (
      <div
        ref={ref}
        aria-label={a11yLabel}
        className={cn('flex flex-col gap-[var(--xen-space-md)]', className)}
        {...rest}
      >
        {header}
        <div className="flex flex-col gap-[var(--xen-space-xs)]">
          {distribution.map((bucket, i) => {
            const stars = distribution.length - i; // first entry = highest star
            const pct = Math.max(0, Math.min(1, bucket / maxBucket));
            return (
              <div key={stars} className="flex items-center gap-[var(--xen-space-sm)]">
                <span className="w-4 text-right text-xs text-muted">{stars}</span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-200">
                  <span className="block h-full bg-accent" style={{ width: `${pct * 100}%` }} />
                </span>
                <span className="w-8 text-xs text-muted tabular-nums">{bucket}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
