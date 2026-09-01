import * as React from 'react';
import { cn } from '../primitives/cn';
import { MOTION } from '../theme/compile';
import { EASE_STANDARD } from '../primitives/internal/chrome-v4';
import { stateCss } from '../primitives/internal/v4-state';
import { injectStyleOnce } from '../motion/internal/inject';
import { flowGroundVars, type OnboardingAccentV4 } from './internal/flow-v4';
import type { ProgressDotsProps, ProgressDotsSize } from './ProgressDots';

export interface ProgressDotsV4Props extends ProgressDotsProps {
  /** Which brand slot the filled segments answer in. Default `'primary'`. */
  accent?: OnboardingAccentV4;
  /**
   * Animate the active segment's arrival. Default `true`;
   * `prefers-reduced-motion` overrides it regardless.
   */
  animated?: boolean;
}

/**
 * Segment thickness, off the spacing scale rather than pinned.
 *
 * The base used `h-1.5` / `h-2` — right on the default scale and wrong on any
 * other, and a progress bar that stays 6px while every control around it grows
 * is how a header stops looking designed.
 */
const THICKNESS: Record<ProgressDotsSize, { bar: string; dot: string; wide: string }> = {
  sm: {
    bar: 'h-[var(--xen-space-xs)]',
    dot: 'h-[var(--xen-space-xs)] w-[var(--xen-space-xs)]',
    wide: 'h-[var(--xen-space-xs)] w-[calc(var(--xen-space-xs)_*_2.5)]',
  },
  md: {
    bar: 'h-[calc(var(--xen-space-xs)_*_1.5)]',
    dot: 'h-[calc(var(--xen-space-xs)_*_1.5)] w-[calc(var(--xen-space-xs)_*_1.5)]',
    wide: 'h-[calc(var(--xen-space-xs)_*_1.5)] w-[calc(var(--xen-space-xs)_*_3.75)]',
  },
};

/** The `<style>` id this indicator's transition shares. Injection is idempotent. */
export const PROGRESS_V4_STYLE_ID = 'xen-v4-onboarding-progress';

/**
 * The track is an M3 state mix of `on-surface` over `surface`, **not**
 * `--xen-border`.
 *
 * The base filled upcoming segments with the border token — a *divider* colour
 * asked to act as a *fill*. On a dark seed that is a near-invisible rail; on a
 * high-contrast one it is a row of hard black bars competing with the steps
 * that are actually complete.
 */
const PROGRESS_V4_CSS = `
[data-xen-progress-seg] {
  background-color: ${stateCss('var(--xen-on-surface)', 'var(--xen-surface)', 'focus')};
}
[data-xen-progress-seg][data-filled] { background-color: var(--flow-fill); }
[data-xen-progress-anim] [data-xen-progress-seg] {
  transition: background-color ${MOTION.standard}ms ${EASE_STANDARD};
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-progress-anim] [data-xen-progress-seg] { transition: none; }
}
`;

/**
 * **V4 paged-progress indicator** — the web twin of the native
 * `ProgressDotsV4`, same props as {@link ProgressDots} plus `accent` and
 * `animated`.
 *
 * ## Four changes
 *
 * 1. **The track is a surface, not a hairline** (see {@link PROGRESS_V4_CSS}).
 * 2. **Thickness comes off the scale** (see {@link THICKNESS}).
 * 3. **The active segment transitions in**, on the `standard` duration —
 *    colour only, because a bar that slides implies the *content* slid, and in
 *    a stepped flow it did not.
 * 4. **The accessible value counts steps, not indices.** The base reported
 *    `aria-valuemin=0 / valuemax=count-1 / valuenow=activeIndex`, so a screen
 *    reader on step one of three announced "0 of 2".
 *
 * A `count` of zero renders an empty row rather than throwing; a `count` of one
 * renders a single full bar. Both treatments stay decorative unless
 * `onDotClick` is supplied, in which case each step becomes a labelled button.
 */
export const ProgressDotsV4 = React.forwardRef<HTMLDivElement, ProgressDotsV4Props>(
  function ProgressDotsV4(
    {
      count,
      activeIndex,
      size = 'md',
      variant = 'dots',
      accent = 'primary',
      animated = true,
      onDotClick,
      className,
      style,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(PROGRESS_V4_STYLE_ID, PROGRESS_V4_CSS);

    const total = Math.max(0, Math.floor(count));
    const bars = variant === 'bars';
    const step = THICKNESS[size];

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={Math.max(1, total)}
        aria-valuenow={Math.min(activeIndex + 1, total)}
        aria-label={`Step ${Math.min(activeIndex + 1, total)} of ${total}`}
        data-xen-progress-anim={animated ? '' : undefined}
        // The indicator can be dropped anywhere, so it carries its own accent
        // vars rather than assuming a `FlowScreenV4` above it.
        style={{ ...flowGroundVars('plain', accent), ...style }}
        className={cn('flex items-center gap-xs', bars && 'w-full', className)}
        {...rest}
      >
        {Array.from({ length: total }, (_, i) => {
          const active = i === activeIndex;
          // In `'bars'` a step already walked past stays filled — the bar reads
          // as "how far through am I", not "which one is selected".
          const filled = bars ? i <= activeIndex : active;
          const segment = (
            <span
              data-xen-progress-seg=""
              data-filled={filled ? '' : undefined}
              className={cn(
                'block rounded-full',
                bars ? cn('w-full', step.bar) : active ? step.wide : step.dot
              )}
            />
          );

          if (!onDotClick) {
            return (
              <span key={i} className={cn(bars && 'min-w-0 flex-1')}>
                {segment}
              </span>
            );
          }
          return (
            <button
              key={i}
              type="button"
              aria-label={`Go to step ${i + 1}`}
              aria-current={active || undefined}
              onClick={() => onDotClick(i)}
              className={cn('flex items-center', bars && 'min-w-0 flex-1')}
            >
              {segment}
            </button>
          );
        })}
      </div>
    );
  }
);
