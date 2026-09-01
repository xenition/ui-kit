import * as React from 'react';
import { cn } from '../primitives/cn';
import { ProgressV4 } from '../primitives/ProgressV4';
import { RatingV4 } from '../primitives/RatingV4';
import { ratingParts } from '../primitives/internal/tone-v4';
import { TABULAR_CLASS, spokenLine } from './internal/menu-v4';
import type { RatingSummaryProps } from './RatingSummary';

export interface RatingSummaryV4Props extends RatingSummaryProps {
  /**
   * How many stars the scale runs to. Defaults to `distribution.length` when
   * there is a distribution, and 5 otherwise — the base hard-coded "out of 5"
   * into the name while deriving the bucket labels from `distribution.length`,
   * so a 10-bucket distribution drew ten rows and announced a five-star scale.
   */
  maxStars?: number;
  /** Build the total's words. Default `'1 rating'` / `'240 ratings'`. */
  formatCount?: (count: number) => string;
  /** Build a bucket's words. Default `'5 stars'`. */
  formatStars?: (stars: number) => string;
}

function defaultCount(count: number): string {
  return count === 1 ? '1 rating' : `${count} ratings`;
}

function defaultStars(stars: number): string {
  return stars === 1 ? '1 star' : `${stars} stars`;
}

/**
 * **V4 rating summary** — the web twin of the native `RatingSummaryV4`, same
 * props as {@link RatingSummary} plus `maxStars`, `formatCount` and
 * `formatStars`.
 *
 * ## Five changes
 *
 * 1. **The scale is not hard-coded to five.** The name said "out of 5" while
 *    the bucket rows counted down from `distribution.length`, so a 10-bucket
 *    distribution drew ten bars under a five-star claim.
 * 2. **The distribution bars are exposed.** They were a `span` with a width —
 *    invisible to a reader, which meant the *shape* of the ratings, the thing
 *    the detailed variant exists to show, was sighted-only. Each row is now a
 *    real `progressbar` with its own name.
 * 3. **A bucket says "5 stars", not "5".** A naked digit in a column announces
 *    as a number with no unit and no meaning.
 * 4. **The name lands on an element with a role.** `aria-label` on a role-less
 *    `div` is ignored outright, so the average and the count — the two figures
 *    the block is made of — reached nobody.
 * 5. **Tokens.** `font-extrabold` is off the kit's weight scale, which stops
 *    at bold; `bg-neutral-200` is a ramp step that inverts under
 *    `[data-theme="dark"]`, so the empty half of every bar went near-white on
 *    a dark page; and `text-muted` is a fill being used as ink.
 */
export const RatingSummaryV4 = React.forwardRef<HTMLDivElement, RatingSummaryV4Props>(
  function RatingSummaryV4(
    {
      average,
      count,
      distribution,
      variant = 'compact',
      maxStars,
      formatCount = defaultCount,
      formatStars = defaultStars,
      emptyLabel = 'No ratings yet',
      className,
      ...rest
    },
    ref
  ) {
    const scale = maxStars ?? (distribution && distribution.length > 0 ? distribution.length : 5);

    if (count <= 0) {
      return (
        <div
          ref={ref}
          role="group"
          aria-label={emptyLabel}
          className={cn('flex flex-col gap-xs', className)}
          {...rest}
        >
          <RatingV4 value={0} max={scale} size="sm" label={emptyLabel} />
          <p className="text-sm text-muted-text">{emptyLabel}</p>
        </div>
      );
    }

    const rated = ratingParts({ value: average, max: scale, count });
    const countText = formatCount(count);
    const label = spokenLine([`${average.toFixed(1)} out of ${scale}`, countText]);

    const header = (
      <div className="flex items-center gap-md">
        <span className={cn('font-heading text-3xl font-bold text-on-card', TABULAR_CLASS)}>
          {average.toFixed(1)}
        </span>
        <div className="flex flex-col gap-xs">
          <RatingV4 value={average} max={scale} size="md" label={rated.label} />
          <span className={cn('text-sm text-muted-text', TABULAR_CLASS)}>{countText}</span>
        </div>
      </div>
    );

    if (variant !== 'detailed' || !distribution || distribution.length === 0) {
      return (
        <div ref={ref} role="group" aria-label={label} className={className} {...rest}>
          {header}
        </div>
      );
    }

    const maxBucket = Math.max(1, ...distribution);

    return (
      <div
        ref={ref}
        role="group"
        aria-label={label}
        className={cn('flex flex-col gap-md', className)}
        {...rest}
      >
        {header}
        <div className="flex flex-col gap-xs">
          {distribution.map((bucket, i) => {
            const stars = distribution.length - i; // first entry = highest star
            const starWord = formatStars(stars);
            return (
              <div key={stars} className="flex items-center gap-sm">
                {/* The digit is the visible shorthand; the words are on the bar. */}
                <span
                  aria-hidden="true"
                  className={cn('w-md text-right text-xs text-muted-text', TABULAR_CLASS)}
                >
                  {stars}
                </span>
                {/*
                  `primary`, not the base's `accent`: `ProgressTone` has no
                  accent, and the remaining three are success/warn/danger —
                  status colours, which a star bucket is not.
                */}
                <ProgressV4
                  value={bucket}
                  max={maxBucket}
                  tone="primary"
                  size="sm"
                  aria-label={spokenLine([starWord, formatCount(bucket)])}
                  className="flex-1"
                />
                <span
                  className={cn('w-xl text-right text-xs text-muted-text', TABULAR_CLASS)}
                  aria-hidden="true"
                >
                  {bucket}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
