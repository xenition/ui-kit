import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Avatar, Progress } from '../primitives';
import { StatusPill } from './StatusPill';
import {
  clampRating,
  clampPct,
  REVIEW_STATUS_META,
  type ReviewStatus,
} from './internal';

export type PerformanceReviewVariant = 'default' | 'compact';

export interface PerformanceReviewProps {
  /** Review cycle label (e.g. "H1 2026"). */
  cycle: string;
  /** Reviewer / manager name. */
  reviewer?: string;
  /** Reviewer avatar. */
  reviewerAvatarUrl?: string;
  /** Overall rating 0…`ratingMax`. Rendered as a star meter. */
  rating?: number;
  /** Rating scale ceiling (default 5). */
  ratingMax?: number;
  /** Review lifecycle status — glyph + word pill. */
  status?: ReviewStatus;
  /** Goal-completion percentage 0–100 (rendered as a meter). */
  goalCompletion?: number;
  /** Number of goals under review. */
  goalCount?: number;
  /** Pre-formatted due / meeting date. */
  dueDate?: string;
  /** Density. */
  variant?: PerformanceReviewVariant;
  /** Click handler (open the review; web parity of native `onPress`). */
  onClick?: () => void;
  className?: string;
}

/**
 * Performance-review summary: cycle, reviewer, a star rating meter, review
 * status, and an optional goal-completion meter (the shared `Progress`
 * primitive). Status is a glyph + word pill (never color alone) and the rating
 * is announced numerically via `aria-label` as well as drawn with filled/empty
 * stars. `compact` drops the goal meter. All colors are `--xen-*` token classes
 * — no literals. `forwardRef` to the root `<div>`.
 */
export const PerformanceReview = React.forwardRef<HTMLDivElement, PerformanceReviewProps>(
  function PerformanceReview(
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
      variant = 'default',
      onClick,
      className,
    },
    ref
  ) {
    const compact = variant === 'compact';
    const max = Math.max(1, Math.floor(ratingMax));
    const rated = clampRating(rating, max);
    const hasRating = rating != null && Number.isFinite(rating);
    const pct = clampPct(goalCompletion);
    const showGoals = !compact && goalCompletion != null;
    const stars = Array.from({ length: max }, (_, i) => (i < Math.round(rated) ? '★' : '☆'));
    const interactive = onClick != null;

    return (
      <Card
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
          'flex flex-col gap-3',
          interactive && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
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

        {hasRating ? (
          <span className="flex items-center gap-2" aria-label={`Rating ${rated} of ${max}`}>
            <span aria-hidden="true" className="tracking-widest text-accent">
              {stars.join('')}
            </span>
            <span className="text-xs font-semibold text-muted">
              {rated}/{max}
            </span>
          </span>
        ) : null}

        {showGoals ? (
          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <span className="text-xs text-muted">Goals{goalCount != null ? ` (${goalCount})` : ''}</span>
              <span className="text-xs font-semibold text-muted">{pct}%</span>
            </div>
            <Progress value={pct} max={100} size="sm" />
          </div>
        ) : null}

        {dueDate ? <p className="text-xs text-muted">Due {dueDate}</p> : null}
      </Card>
    );
  }
);
