import * as React from 'react';
import { cn } from '../primitives/cn';
import { clamp } from './internal';
import type { SatisfactionRatingProps, SatisfactionSize } from './SatisfactionRating';

/** Drop-in for {@link SatisfactionRatingProps} — same props, the V4 "console" design. */
export type SatisfactionRatingV4Props = SatisfactionRatingProps;

const FACE_GLYPHS = ['😠', '🙁', '😐', '🙂', '😀'];
const THUMB_GLYPHS = ['👎', '👍'];

// V4 sizes run a touch larger for the calm, legible console read.
const SIZE_PX: Record<SatisfactionSize, number> = { sm: 24, md: 34, lg: 48 };

/**
 * SatisfactionRating — **V4** "calm console" design (web parity of the native
 * V4). A big, legible CSAT read: a large numeral (`value / total`) paired with a
 * row of glyphs — filled = **primary** (`warn` for the low-score faces/thumbs
 * caution), empty = muted, emphasis by size + opacity + the numeric a11y label
 * (never color alone). Interactive glyphs are ≥44px `radio` buttons; read-only
 * renders a static `img`. Same props/behavior as {@link SatisfactionRatingProps};
 * all colors from `--xen-*` token classes (no literal hex).
 */
export const SatisfactionRatingV4 = React.forwardRef<HTMLDivElement, SatisfactionRatingV4Props>(
  function SatisfactionRatingV4(
    { value = 0, max = 5, variant = 'stars', size = 'md', onRate, readOnly = false, label, className, ...rest },
    ref
  ) {
    const total = variant === 'thumbs' ? 2 : Math.max(1, Math.floor(max));
    const current = clamp(Math.round(value), 0, total);
    const interactive = !readOnly && typeof onRate === 'function';
    const glyphPx = SIZE_PX[size] ?? SIZE_PX.md;

    const glyphFor = (index: number): string => {
      if (variant === 'faces') return FACE_GLYPHS[index] ?? '🙂';
      if (variant === 'thumbs') return THUMB_GLYPHS[index] ?? '👍';
      return '★';
    };

    // A low CSAT (bottom half of the scale) leans on the warn slot as a calm
    // caution; otherwise filled reads as primary.
    const filledCls =
      current > 0 && current <= Math.ceil(total / 2) ? 'text-warn' : 'text-primary';

    const caption = label ? (
      <span className="mb-1 block text-sm text-muted">{label}</span>
    ) : null;

    return (
      <div ref={ref} className={className} {...rest}>
        {caption}
        <div className="flex items-center gap-3">
          {/* Big legible numeral — the at-a-glance CSAT read. */}
          <span aria-hidden="true" className="flex items-baseline gap-0.5 font-heading font-bold leading-none">
            <span className={cn('text-3xl', current > 0 ? 'text-on-surface' : 'text-muted')}>{current}</span>
            <span className="text-base text-muted">/ {total}</span>
          </span>
          <div
            role={interactive ? 'radiogroup' : 'img'}
            aria-label={interactive ? (label ?? 'Rating') : `${current} out of ${total}`}
            className="flex items-center gap-1"
          >
            {Array.from({ length: total }, (_, i) => {
              const score = i + 1;
              const selected = score === current || (variant === 'stars' && score <= current);
              const cell = (
                <span
                  aria-hidden="true"
                  className={cn('leading-none', variant === 'stars' && (selected ? filledCls : 'text-muted'))}
                  style={{ fontSize: glyphPx, opacity: selected ? 1 : 0.35 }}
                >
                  {glyphFor(i)}
                </span>
              );
              if (!interactive) {
                return (
                  <span key={score} className="p-0.5">
                    {cell}
                  </span>
                );
              }
              return (
                <button
                  key={score}
                  type="button"
                  role="radio"
                  aria-checked={score === current}
                  aria-label={`Rate ${score} of ${total}`}
                  onClick={() => onRate?.(score)}
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[var(--xen-radius-md)] p-0.5 hover:bg-on-surface/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
                >
                  {cell}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);
