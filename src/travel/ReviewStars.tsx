import * as React from 'react';
import { cn } from '../primitives/cn';
import { Rating } from '../primitives/Rating';

/** One bar in the rating distribution (`stars` 1–5 → `count`). */
export interface ReviewBucket {
  stars: number;
  count: number;
}

export interface ReviewStarsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Average score, 0–5. */
  average: number;
  /** Total number of reviews. */
  total?: number;
  /** Per-star distribution; renders horizontal proportion bars when present. */
  distribution?: readonly ReviewBucket[];
  /** Qualitative summary word, e.g. `'Excellent'`. */
  summary?: string;
  /** Compact single-line layout (hides the distribution). */
  compact?: boolean;
}

/**
 * Web parity of the native `ReviewStars`: an aggregate review widget — a large
 * average, a star row, the review count, and an optional per-star distribution
 * drawn as token proportion bars. Bar widths are guarded against a zero total.
 * Token-only colors.
 */
export const ReviewStars = React.forwardRef<HTMLDivElement, ReviewStarsProps>(function ReviewStars(
  { average, total, distribution = [], summary, compact = false, className, ...rest },
  ref
) {
  const maxCount = distribution.reduce((m, b) => Math.max(m, b.count), 0);
  const subline = [summary, typeof total === 'number' ? `${total} reviews` : undefined]
    .filter(Boolean)
    .join(' · ');

  return (
    <div
      ref={ref}
      data-xen-review-stars=""
      aria-label={`${average} out of 5${typeof total === 'number' ? `, ${total} reviews` : ''}`}
      className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)}
      {...rest}
    >
      <div className="flex items-center gap-[var(--xen-space-md)]">
        <span className="text-2xl font-bold text-on-surface">{average.toFixed(1)}</span>
        <div className="flex flex-col gap-[2px]">
          <Rating value={average} size="sm" />
          {subline ? <span className="text-xs text-muted">{subline}</span> : null}
        </div>
      </div>

      {!compact && distribution.length > 0 ? (
        <div className="flex flex-col gap-[var(--xen-space-xs)]">
          {distribution.map((b, i) => {
            const pct = maxCount > 0 ? Math.round((b.count / maxCount) * 100) : 0;
            return (
              <div key={`${b.stars}-${i}`} className="flex items-center gap-[var(--xen-space-sm)]">
                <span className="w-4 text-xs text-muted">{b.stars}</span>
                <div className="h-[6px] flex-1 overflow-hidden rounded-full bg-border">
                  <div style={{ width: `${pct}%` }} className="h-[6px] rounded-full bg-accent" />
                </div>
                <span className="w-8 text-right text-xs text-muted">{b.count}</span>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
});
