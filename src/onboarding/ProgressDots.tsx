import * as React from 'react';
import { cn } from '../primitives/cn';

export type ProgressDotsSize = 'sm' | 'md';

export interface ProgressDotsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Total number of steps/pages. */
  count: number;
  /** Zero-based index of the active step. */
  activeIndex: number;
  /** Dot scale. Default `'md'`. */
  size?: ProgressDotsSize;
  /** When set, dots become pressable and report the tapped index. */
  onDotClick?: (index: number) => void;
}

const DOT: Record<ProgressDotsSize, { base: string; active: string }> = {
  sm: { base: 'h-1.5 w-1.5', active: 'h-1.5 w-4' },
  md: { base: 'h-2 w-2', active: 'h-2 w-5' },
};

/**
 * Paged-progress indicator — a row of token-bound dots where the active step is
 * a widened "pill" in the primary color and the rest are muted. Shared by
 * {@link OnboardingSlides} and the welcome/paywall flow so every screen
 * advertises its position identically. Dots are decorative unless `onDotClick`
 * is supplied, in which case each becomes a labelled button. Guards an
 * empty/negative `count`. No literal colors.
 */
export const ProgressDots = React.forwardRef<HTMLDivElement, ProgressDotsProps>(
  function ProgressDots(
    { count, activeIndex, size = 'md', onDotClick, className, ...rest },
    ref
  ) {
    const total = Math.max(0, Math.floor(count));
    const scale = DOT[size];

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={Math.max(0, total - 1)}
        aria-valuenow={activeIndex}
        aria-label={`Step ${Math.min(activeIndex + 1, total)} of ${total}`}
        className={cn('flex items-center gap-1.5', className)}
        {...rest}
      >
        {Array.from({ length: total }, (_, i) => {
          const active = i === activeIndex;
          const dotClass = cn(
            'rounded-full transition-all',
            active ? cn(scale.active, 'bg-primary') : cn(scale.base, 'bg-border')
          );
          if (!onDotClick) return <span key={i} aria-hidden="true" className={dotClass} />;
          return (
            <button
              key={i}
              type="button"
              aria-label={`Go to step ${i + 1}`}
              aria-current={active || undefined}
              onClick={() => onDotClick(i)}
              className="inline-flex items-center justify-center p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
            >
              <span aria-hidden="true" className={dotClass} />
            </button>
          );
        })}
      </div>
    );
  }
);
