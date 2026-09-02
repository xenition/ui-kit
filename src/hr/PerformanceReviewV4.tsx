import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { AvatarV4 } from '../primitives/AvatarV4';
import { ProgressV4 } from '../primitives/ProgressV4';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import { StatusPillV4 } from './StatusPillV4';
import { ratingParts, type RatingParts } from './workforce-v4';
import {
  cardStateVars,
  clampPercent,
  FOCUS_RING_CLASS,
  MIN_TAP_CLASS,
  spokenLine,
  TABULAR_CLASS,
} from './internal/tone-v4';
import { REVIEW_STATUS_META } from './internal';
import type { PerformanceReviewProps } from './PerformanceReview';

export interface PerformanceReviewV4Props extends PerformanceReviewProps {
  /**
   * Render the rating readout from its parts. Default `'4.5/5'`.
   *
   * Takes the whole {@link RatingParts} rather than two numbers so a caller
   * can say "4.5 out of 5" or "Exceeds expectations" from the same data the
   * meter is drawn from.
   */
  formatRating?: (parts: RatingParts) => string;
  /** Caption over the goal meter, and its spoken name. Default `'Goals'`. */
  goalsLabel?: string;
  /** Build the due line. Default `` `Due ${date}` ``. */
  formatDue?: (date: string) => string;
  /** Test hook. Every native `hr` component had one; no web one did. */
  testID?: string;
}

/** The meter's spoken name. The base's `aria-label` said "Rating" too. */
const RATING_NAME = 'Rating';
/** The goal meter's default caption, which is also its spoken name. */
const GOALS_NAME = 'Goals';

/**
 * **V4 performance review** — the web twin of the native
 * `PerformanceReviewV4`, same props as {@link PerformanceReview} plus
 * `formatRating`, `goalsLabel`, `formatDue` and `testID`.
 *
 * ## Six changes
 *
 * 1. **4.5 no longer draws as a perfect score.** The star row used
 *    `Math.round(rated)` while the text beside it printed the raw value, so
 *    `rating={4.5}` drew **five** filled stars next to the words "4.5/5" — the
 *    drawing said one thing about somebody's performance review and the
 *    numeral said another. `ratingParts()` floors the drawn marks; a drawn
 *    mark claims a whole point.
 * 2. **`ratingMax={NaN}` no longer renders "NaN/NaN".** An API field that
 *    parsed badly walked through `Math.max(1, Math.floor(NaN))` unchanged and
 *    reached both the visible string and the `aria-label`.
 * 3. **The rating is a real meter.** It was an `aria-label` on a bare
 *    `<span>` — a `generic` element, which ARIA forbids naming, so every
 *    browser dropped the label and the reader got the raw star glyphs. Native
 *    meanwhile marked the same thing `accessibilityRole="text"`. Two twins
 *    announcing two different things, neither of them a `progressbar`.
 * 4. **The goal meter survives.** Inside a `role="button"` card a
 *    `progressbar`'s value is presentational and is dropped, so a review at
 *    40% goal completion announced no percentage at all. The card is a plain
 *    container now and the meters are siblings of its activation.
 * 5. **The card is one accessible name.** `Review H1 2026` replaced the
 *    subtree — the reviewer, the status and the due date were never spoken.
 * 6. **The reviewer avatar is the same size on both twins** (`xs`, which is
 *    what a mark beside an `xs` caption should be); web drew `sm` and native
 *    drew `xs`.
 */
export const PerformanceReviewV4 = React.forwardRef<HTMLDivElement, PerformanceReviewV4Props>(
  function PerformanceReviewV4(
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
      formatRating,
      goalsLabel = GOALS_NAME,
      formatDue,
      testID,
      className,
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    }, []);

    const compact = variant === 'compact';
    const hasRating = rating != null && Number.isFinite(rating);
    const parts = ratingParts(rating ?? 0, ratingMax);
    const ratingText = (formatRating ?? ((p: RatingParts) => `${p.value}/${p.max}`))(parts);
    const pct = clampPercent(goalCompletion);
    const showGoals = !compact && pct != null;
    const statusMeta = status ? REVIEW_STATUS_META[status] : undefined;
    const interactive = onClick != null;
    const goalsCaption = `${goalsLabel}${goalCount != null ? ` (${goalCount})` : ''}`;
    const due = dueDate ? (formatDue ?? ((d: string) => `Due ${d}`))(dueDate) : undefined;

    // Floored, so a drawn mark always claims a whole point. The fraction lives
    // in the numeral, which is what a low-vision reader actually compares.
    const stars = Array.from({ length: parts.max }, (_, i) => (i < parts.filled ? '★' : '☆'));

    const summary = (
      <span className="flex min-w-0 flex-1 flex-col gap-xs text-left">
        <span className="truncate text-base font-bold text-on-card">{cycle}</span>
        {reviewer ? (
          <span className="flex items-center gap-xs">
            <AvatarV4 size="xs" name={reviewer} src={reviewerAvatarUrl} alt="" />
            <span className="truncate text-xs text-muted-text">{reviewer}</span>
          </span>
        ) : null}
      </span>
    );

    return (
      <Card ref={ref} data-testid={testID} className={cn('flex flex-col gap-sm', className)}>
        <div className="flex items-start gap-sm">
          {interactive ? (
            <button
              type="button"
              aria-label={spokenLine([
                'Review',
                cycle,
                reviewer,
                statusMeta?.label,
                due,
              ])}
              onClick={onClick}
              data-xen-v4-state=""
              style={cardStateVars()}
              className={cn(
                'flex min-w-0 flex-1 items-start gap-sm rounded-[var(--xen-radius-md)] text-left',
                MIN_TAP_CLASS,
                FOCUS_RING_CLASS
              )}
            >
              {summary}
            </button>
          ) : (
            <div className="flex min-w-0 flex-1 items-start gap-sm">{summary}</div>
          )}
          {statusMeta ? (
            <StatusPillV4 meta={statusMeta} size="sm" aria-hidden={interactive || undefined} />
          ) : null}
        </div>

        {/*
          A sibling of the activation, so its `progressbar` value is exposed
          rather than pruned as presentational content of a button.
        */}
        {hasRating ? (
          <span
            role="progressbar"
            aria-label={RATING_NAME}
            aria-valuemin={0}
            aria-valuemax={parts.max}
            aria-valuenow={parts.value}
            aria-valuetext={ratingText}
            className="flex items-center gap-sm"
          >
            <span aria-hidden="true" className="tracking-widest text-accent-text">
              {stars.join('')}
            </span>
            <span className={cn('text-xs font-semibold text-muted-text', TABULAR_CLASS)}>
              {ratingText}
            </span>
          </span>
        ) : null}

        {showGoals ? (
          <div className="flex flex-col gap-xs">
            <div className="flex justify-between">
              <span className="text-xs text-muted-text">{goalsCaption}</span>
              <span className={cn('text-xs font-semibold text-muted-text', TABULAR_CLASS)}>
                {pct}%
              </span>
            </div>
            <ProgressV4 value={pct} max={100} size="sm" aria-label={goalsCaption} />
          </div>
        ) : null}

        {due ? <p className="text-xs text-muted-text">{due}</p> : null}
      </Card>
    );
  }
);
