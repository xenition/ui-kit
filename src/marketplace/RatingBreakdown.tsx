import * as React from 'react';
import { cn } from '../primitives/cn';
import { Rating } from '../primitives';

export interface RatingBreakdownProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Count of ratings per star, indexed by star value. Accepts either a 5-length
   * array ordered `[1★, 2★, 3★, 4★, 5★]` or a `{1..5: count}` map. Missing
   * entries are treated as 0.
   */
  counts: number[] | Partial<Record<1 | 2 | 3 | 4 | 5, number>>;
  /** Optional pre-computed average; when omitted it is derived from `counts`. */
  average?: number;
  /** Hide the summary header (average + total). Default `false`. */
  hideSummary?: boolean;
}

/** Normalize either input shape into a `[1★..5★]` count tuple. */
function toTuple(counts: RatingBreakdownProps['counts']): [number, number, number, number, number] {
  const get = (star: number): number => {
    const raw = Array.isArray(counts)
      ? counts[star - 1]
      : (counts as Record<number, number | undefined>)[star];
    return typeof raw === 'number' && raw > 0 ? raw : 0;
  };
  return [get(1), get(2), get(3), get(4), get(5)];
}

/**
 * A review-score distribution — a summary header (average + total count) over
 * five proportional bars, one per star level (5★ at the top). Accepts counts as
 * an ordered array or a `{1..5}` map, derives the average when not supplied, and
 * guards every lookup and the divide-by-zero empty case. Presentational, data
 * only. Each bar is announced via its `aria-label`. Reuses `Rating`; token-only
 * colors with a token-tinted bar track.
 */
export const RatingBreakdown = React.forwardRef<HTMLDivElement, RatingBreakdownProps>(function RatingBreakdown(
  { counts, average, hideSummary = false, className, ...rest },
  ref
) {
  const tuple = toTuple(counts);
  const total = tuple.reduce((a, b) => a + b, 0);
  const derivedAvg = total > 0 ? tuple.reduce((sum, count, i) => sum + count * (i + 1), 0) / total : 0;
  const avg = typeof average === 'number' ? average : derivedAvg;

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]',
        className
      )}
      {...rest}
    >
      {hideSummary ? null : (
        <div className="flex items-center gap-[var(--xen-space-md)]">
          <span className="text-2xl font-bold text-on-surface">{avg.toFixed(1)}</span>
          <div className="flex flex-col gap-0.5">
            <Rating value={avg} size="sm" />
            <span className="text-xs text-muted">
              {`${total.toLocaleString()} ${total === 1 ? 'rating' : 'ratings'}`}
            </span>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-[var(--xen-space-xs)]">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = tuple[star - 1] ?? 0;
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          return (
            <div
              key={star}
              aria-label={`${star} stars, ${count} ${count === 1 ? 'rating' : 'ratings'}`}
              className="flex items-center gap-[var(--xen-space-sm)]"
            >
              <span className="w-4 text-right text-xs text-muted">{star}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-[var(--xen-radius-full)] bg-neutral-200">
                <div className="h-full rounded-[var(--xen-radius-full)] bg-accent" style={{ width: `${pct}%` }} />
              </div>
              <span className="w-8 text-right text-xs text-muted">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
});
