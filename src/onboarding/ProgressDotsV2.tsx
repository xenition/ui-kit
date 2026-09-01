import * as React from 'react';
import { cn } from '../primitives/cn';
import type { ProgressDotsProps } from './ProgressDots';

/** Drop-in for {@link ProgressDots} — identical props, different design. */
export type ProgressDotsV2Props = ProgressDotsProps;

/**
 * Paged progress — V2, the editorial line: **one continuous track with a
 * spoken position beside it**, "2 / 5", instead of a row of segments.
 *
 * The idea the base and V3 cannot express: on a long flow — eight steps, ten —
 * segments stop being countable and the header turns into a row of tick marks
 * nobody reads. A single filled track plus the number says the same thing at
 * any length, and the number is the part a user actually uses to decide
 * whether to keep going.
 *
 * The counter is tabular and fixed-width so the track does not resize as the
 * step number changes, which would make the bar appear to jump backwards on
 * step 10 of 12.
 *
 * `onDotClick` is accepted and **ignored**: a continuous track has no discrete
 * targets, and inventing invisible ones is worse than not offering navigation.
 * An app that needs step navigation wants the base line.
 *
 * Same props as {@link ProgressDots}. Token-pure.
 */
export const ProgressDotsV2 = React.forwardRef<HTMLDivElement, ProgressDotsV2Props>(
  function ProgressDotsV2(
    { count, activeIndex, size = 'md', className, ...rest },
    ref
  ) {
    const total = Math.max(0, Math.floor(count));
    const position = Math.min(Math.max(0, activeIndex + 1), total);
    const fraction = total === 0 ? 0 : position / total;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={Math.max(1, total)}
        aria-valuenow={position}
        aria-label={`Step ${position} of ${total}`}
        className={cn('flex w-full items-center gap-sm', className)}
        {...rest}
      >
        <span
          className={cn(
            'block min-w-0 flex-1 overflow-hidden rounded-full bg-border',
            size === 'sm' ? 'h-1' : 'h-1.5'
          )}
        >
          <span
            className="block h-full rounded-full bg-primary"
            style={{ width: `${fraction * 100}%` }}
          />
        </span>
        <span className="w-11 text-right text-sm font-semibold text-muted-text [font-variant-numeric:tabular-nums]">
          {position} / {total}
        </span>
      </div>
    );
  }
);
