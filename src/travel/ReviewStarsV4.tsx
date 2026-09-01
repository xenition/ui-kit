import * as React from 'react';
import { cn } from '../primitives/cn';
import { Rating } from '../primitives/Rating';
import type { ReviewStarsProps } from './ReviewStars';

/** Drop-in for {@link ReviewStarsProps} — same props, the V4 "journey" design. */
export type ReviewStarsV4Props = ReviewStarsProps;

/**
 * ReviewStars — **V4** "journey" design (web parity of the native V4). The
 * boarding-pass take on an aggregate review: the average sits large in
 * near-white ink on a brand-gradient rating badge (the signature V4 touch), the
 * star row and count ride beside it, and the optional per-star distribution is
 * drawn as thin token proportion bars. Bar widths are guarded against a zero
 * total. Same props/behavior as {@link ReviewStarsProps}; all colors from
 * `--xen-*` token classes (no literal colors). Pass `compact` for a single-line
 * layout that hides the distribution.
 */
export const ReviewStarsV4 = React.forwardRef<HTMLDivElement, ReviewStarsV4Props>(
  function ReviewStarsV4(
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
          {/* Signature V4 touch: brand-gradient rating badge in near-white ink. */}
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-400 to-primary-600 text-2xl font-extrabold text-primary-50">
            {average.toFixed(1)}
          </span>
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
                    <div
                      style={{ width: `${pct}%` }}
                      className="h-[6px] rounded-full bg-gradient-to-r from-primary-400 to-primary-600"
                    />
                  </div>
                  <span className="w-8 text-right text-xs text-muted">{b.count}</span>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
);
