import * as React from 'react';
import { cn } from '../primitives/cn';
import { clampPct, clampRating, REVIEW_STATUS_META, TONE_TEXT_CLASS } from './internal';
import type { PerformanceReviewProps } from './PerformanceReview';

/** Drop-in alternate design for {@link PerformanceReview} — identical Props. */
export type PerformanceReviewV3Props = PerformanceReviewProps;

/**
 * PerformanceReview, design **V3** — a compact single row. Cycle + reviewer on
 * the left with the review status carried by a leading tone glyph + word (never
 * color alone), and a condensed star meter and goal percentage pinned right.
 * The rating is still announced numerically via `aria-label`. Same Props as
 * {@link PerformanceReview}; the goal ring/bar is dropped for density, on a
 * borderless divider row. Token-pure.
 */
export const PerformanceReviewV3 = React.forwardRef<HTMLDivElement, PerformanceReviewV3Props>(
  function PerformanceReviewV3(
    {
      cycle,
      reviewer,
      rating,
      ratingMax = 5,
      status,
      goalCompletion,
      onClick,
      className,
    },
    ref
  ) {
    const max = Math.max(1, Math.floor(ratingMax));
    const rated = clampRating(rating, max);
    const hasRating = rating != null && Number.isFinite(rating);
    const hasGoals = goalCompletion != null;
    const pct = clampPct(goalCompletion);
    const statusMeta = status ? REVIEW_STATUS_META[status] : undefined;
    const stars = Array.from({ length: max }, (_, i) => (i < Math.round(rated) ? '★' : '☆'));
    const interactive = onClick != null;

    return (
      <div
        ref={ref}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? `Review ${cycle}` : undefined}
        onClick={interactive ? onClick : undefined}
        onKeyDown={
          interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.();
                }
              }
            : undefined
        }
        className={cn(
          'flex items-center gap-3 border-b border-border bg-surface px-2 py-2 transition-colors motion-reduce:transition-none',
          interactive &&
            'cursor-pointer hover:bg-neutral-100 active:scale-[.99] motion-reduce:active:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          className
        )}
      >
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-on-surface">{cycle}</p>
          <span className="flex items-center gap-1">
            {statusMeta ? (
              <span aria-label={statusMeta.label} className={cn('text-xs font-semibold', TONE_TEXT_CLASS[statusMeta.tone])}>
                <span aria-hidden="true">{statusMeta.glyph}</span> {statusMeta.label}
              </span>
            ) : null}
            {reviewer ? <span className="truncate text-xs text-muted">· {reviewer}</span> : null}
          </span>
        </div>

        <div className="flex flex-col items-end gap-0.5">
          {hasRating ? (
            <span aria-label={`Rating ${rated} of ${max}`} className="text-sm tracking-wide text-accent">
              {stars.join('')}
            </span>
          ) : null}
          {hasGoals ? <span className="text-xs font-semibold text-muted">{pct}% goals</span> : null}
        </div>
      </div>
    );
  }
);
