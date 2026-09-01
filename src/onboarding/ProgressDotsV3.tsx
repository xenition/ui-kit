import * as React from 'react';
import { cn } from '../primitives/cn';
import type { ProgressDotsProps } from './ProgressDots';

/** Drop-in for {@link ProgressDots} — identical props, different design. */
export type ProgressDotsV3Props = ProgressDotsProps;

/**
 * Paged progress — V3, the compact line: **rings**. Every step is an outlined
 * circle; the ones already walked are filled and dimmed, the current one is
 * filled solid, the rest stay hollow.
 *
 * Where it earns its place: over artwork. The base's filled bars and V2's
 * track both need a quiet ground to read against, and an onboarding whose hero
 * runs to the top edge does not have one — hollow rings with a stroke survive a
 * busy photograph in a way a low-contrast bar does not.
 *
 * `variant` is accepted and ignored: this line has one treatment, and a
 * `'bars'` request here is an app asking for the base line.
 *
 * Same props as {@link ProgressDots}. Token-pure.
 */
export const ProgressDotsV3 = React.forwardRef<HTMLDivElement, ProgressDotsV3Props>(
  function ProgressDotsV3(
    { count, activeIndex, size = 'md', onDotClick, className, ...rest },
    ref
  ) {
    const total = Math.max(0, Math.floor(count));
    const diameter = size === 'sm' ? 'h-2 w-2' : 'h-3 w-3';

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={Math.max(1, total)}
        aria-valuenow={Math.min(activeIndex + 1, total)}
        aria-label={`Step ${Math.min(activeIndex + 1, total)} of ${total}`}
        className={cn('flex items-center gap-xs', className)}
        {...rest}
      >
        {Array.from({ length: total }, (_, i) => {
          const walked = i < activeIndex;
          const current = i === activeIndex;
          const ring = (
            <span
              className={cn(
                'block rounded-full border-2',
                diameter,
                walked || current ? 'border-primary bg-primary' : 'border-border',
                // "Here" and "done" must be distinguishable without colour
                // alone, so the walked steps recede rather than matching.
                walked && 'opacity-55'
              )}
            />
          );
          if (!onDotClick) return <React.Fragment key={i}>{ring}</React.Fragment>;
          return (
            <button
              key={i}
              type="button"
              aria-label={`Go to step ${i + 1}`}
              aria-current={current || undefined}
              onClick={() => onDotClick(i)}
              className="flex items-center p-xs"
            >
              {ring}
            </button>
          );
        })}
      </div>
    );
  }
);
