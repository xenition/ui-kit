import * as React from 'react';
import { cn } from '../primitives/cn';
import { AvatarV4 } from '../primitives/AvatarV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { RatingV4 } from '../primitives/RatingV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { ratingParts, SKELETON_CLASS } from './internal/fleet-v4';
import type { DriverRatingRowProps } from './DriverRatingRow';

export interface DriverRatingRowV4Props extends DriverRatingRowProps {
  /**
   * Build the accessible name for the group and for each star.
   * Default `'4 out of 5'` / `'Rate 4 of 5 stars'`.
   */
  formatRating?: (value: number, max: number) => string;
  formatStarLabel?: (star: number, max: number) => string;
  /** Shown in place of the value when nothing is rated. Default `'Not rated'`. */
  unratedLabel?: string;
}

/**
 * **V4 driver rating row** — the web twin of the native `DriverRatingRowV4`,
 * same props as {@link DriverRatingRow} plus three copy hooks.
 *
 * ## Four changes
 *
 * 1. **The read-only form is `RatingV4` with its value showing.**
 * 2. **Each interactive star is a real 44px target**, and the group is a
 *    `radiogroup` — so a keyboard user arrows through the stars instead of
 *    tabbing five times, and a reader hears one control rather than five.
 * 3. **The skeleton is opaque.**
 * 4. **Every English string is a prop.**
 *
 * **Renders nothing without a `driverName`** (§4.5).
 */
export const DriverRatingRowV4 = React.forwardRef<HTMLDivElement, DriverRatingRowV4Props>(
  function DriverRatingRowV4(
    {
      driverName,
      avatarUrl,
      subtitle,
      value = 0,
      max = 5,
      onRate,
      variant = 'interactive',
      loading = false,
      formatRating,
      formatStarLabel,
      unratedLabel = 'Not rated',
      className,
      ...rest
    },
    ref
  ) {
    if (loading) {
      return (
        <CardV4 ref={ref} className={cn('flex items-center gap-sm', className)} {...rest}>
          <div className={cn('h-12 w-12 rounded-full', SKELETON_CLASS)} />
          <div className="flex flex-1 flex-col gap-xs">
            <div className={cn('h-4 w-1/2', SKELETON_CLASS)} />
            <div className={cn('h-3 w-2/3', SKELETON_CLASS)} />
          </div>
        </CardV4>
      );
    }

    if (!driverName) return null;

    const parts = ratingParts({ value, max, format: formatRating });
    const interactive = variant === 'interactive' && Boolean(onRate);
    const starLabel =
      formatStarLabel ?? ((star: number, total: number) => `Rate ${star} of ${total} stars`);

    return (
      <CardV4
        ref={ref}
        data-xen-driver-rating=""
        aria-label={
          interactive ? undefined : `${driverName}, ${parts.text ? parts.label : unratedLabel}`
        }
        className={cn('flex items-center gap-sm', className)}
        {...rest}
      >
        <AvatarV4 src={avatarUrl} name={driverName} size="md" />

        <div className="min-w-0 flex-1">
          <p className="truncate font-heading text-base font-bold text-on-card">{driverName}</p>
          {subtitle ? <p className="truncate text-xs text-muted-text">{subtitle}</p> : null}
        </div>

        {interactive ? (
          <div role="radiogroup" aria-label={parts.label} className="flex shrink-0">
            {Array.from({ length: parts.total }, (_, i) => {
              const star = i + 1;
              const on = star <= parts.filled;
              return (
                <button
                  key={star}
                  type="button"
                  role="radio"
                  aria-checked={on && star === parts.filled}
                  aria-label={starLabel(star, parts.total)}
                  onClick={() => onRate?.(star)}
                  data-xen-v4-chrome="on-surface"
                  /* The target is 44; the glyph stays small. */
                  className={cn(
                    'flex w-11 items-center justify-center rounded-full',
                    MIN_TAP_CLASS,
                    on ? 'text-warn-text' : 'text-muted-text'
                  )}
                >
                  <IconV4 name={on ? 'star' : 'star-outline'} size="lg" />
                </button>
              );
            })}
          </div>
        ) : parts.text ? (
          <RatingV4 value={value} max={max} size="sm" showValue />
        ) : (
          <span className="shrink-0 text-xs text-muted-text">{unratedLabel}</span>
        )}
      </CardV4>
    );
  }
);
