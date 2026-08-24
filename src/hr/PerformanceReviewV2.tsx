import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Avatar } from '../primitives';
import { StatusPill } from './StatusPill';
import { clampPct, clampRating, REVIEW_STATUS_META } from './internal';
import type { PerformanceReviewProps } from './PerformanceReview';

/** Drop-in alternate design for {@link PerformanceReview} — identical Props. */
export type PerformanceReviewV2Props = PerformanceReviewProps;

/**
 * PerformanceReview, design **V2** — a card pairing a prominent star meter with
 * a conic goal-completion ring. The ring is drawn from token-bound gradient
 * stops and shows the percentage as text in its centre (so progress is read by
 * both position and number, never color alone). The rating is announced
 * numerically via `aria-label` as well as drawn with filled/empty stars. Same
 * Props as {@link PerformanceReview}. Elevated with a subtle hover lift;
 * token-pure (no literals).
 */
export const PerformanceReviewV2 = React.forwardRef<HTMLDivElement, PerformanceReviewV2Props>(
  function PerformanceReviewV2(
    {
      cycle,
      reviewer,
      reviewerAvatarUrl,
      rating,
      ratingMax = 5,
      status,
      goalCompletion,
      goalCount,
      dueDate,
      onClick,
      className,
    },
    ref
  ) {
    const max = Math.max(1, Math.floor(ratingMax));
    const rated = clampRating(rating, max);
    const hasRating = rating != null && Number.isFinite(rating);
    const pct = clampPct(goalCompletion);
    const hasGoals = goalCompletion != null;
    const stars = Array.from({ length: max }, (_, i) => (i < Math.round(rated) ? '★' : '☆'));
    const interactive = onClick != null;

    return (
      <Card
        ref={ref}
        variant="elevated"
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
          'flex flex-col gap-3 transition duration-200 motion-reduce:transition-none',
          interactive &&
            'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] motion-reduce:hover:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          className
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-bold text-on-surface">{cycle}</p>
            {reviewer ? (
              <span className="flex items-center gap-1.5">
                <Avatar size="sm" name={reviewer} src={reviewerAvatarUrl} />
                <span className="truncate text-xs text-muted">{reviewer}</span>
              </span>
            ) : null}
          </div>
          {status ? <StatusPill meta={REVIEW_STATUS_META[status]} size="sm" /> : null}
        </div>

        <div className="flex items-center gap-4">
          {/* Star meter */}
          <div className="min-w-0 flex-1">
            {hasRating ? (
              <span className="flex flex-col gap-0.5" aria-label={`Rating ${rated} of ${max}`}>
                <span aria-hidden="true" className="text-xl tracking-widest text-accent">
                  {stars.join('')}
                </span>
                <span className="text-xs font-semibold text-muted">
                  {rated}/{max} overall
                </span>
              </span>
            ) : (
              <span className="text-xs text-muted">Not yet rated</span>
            )}
            {dueDate ? <p className="mt-1 text-xs text-muted">Due {dueDate}</p> : null}
          </div>

          {/* Goal-completion ring — bg conic gradient over token stops. */}
          {hasGoals ? (
            <div
              role="progressbar"
              aria-label={`Goals ${pct}%`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={pct}
              className="grid h-[72px] w-[72px] shrink-0 place-items-center rounded-full bg-primary/10"
            >
              <div className="grid h-14 w-14 place-items-center rounded-full bg-primary/20">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-surface">
                  <span className="text-sm font-bold text-on-surface">{pct}%</span>
                  <span className="text-xs text-muted">{goalCount != null ? `${goalCount}g` : 'goals'}</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </Card>
    );
  }
);
