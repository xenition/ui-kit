import * as React from 'react';
import { cn } from './cn';

export type RatingSize = 'sm' | 'md' | 'lg';

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** The rating value; filled glyphs are drawn up to `Math.round(value)`. */
  value: number;
  /** Total number of glyphs (default 5). */
  max?: number;
  /** Glyph size (default `md`). */
  size?: RatingSize;
  /** Render the numeric value after the glyphs. */
  showValue?: boolean;
  /**
   * Custom accessible name. Defaults to `"{value} out of {max} stars"`. The
   * glyphs themselves are decorative (`aria-hidden`); this label carries the
   * meaning.
   */
  label?: string;
}

const SIZE_CLASS: Record<RatingSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl',
};

const STAR = '★'; // ★

/**
 * A ★ rating row — the "Stars" widget the templates hand-rolled, promoted to a
 * token-only primitive. Draws `max` glyphs: filled (the `accent` slot) up to
 * the rounded `value`, empty (the `muted` slot) after. Announced as one
 * `role="img"` with an aria-label (`"{value} out of {max} stars"` or a custom
 * `label`); the glyphs are decorative. An optional trailing numeric value.
 */
export const Rating = React.forwardRef<HTMLSpanElement, RatingProps>(function Rating(
  { value, max = 5, size = 'md', showValue = false, label, className, ...rest },
  ref
) {
  const total = Math.max(0, Math.floor(max));
  const filled = Math.max(0, Math.min(total, Math.round(value)));
  const ariaLabel = label ?? `${value} out of ${total} stars`;

  return (
    <span
      ref={ref}
      role="img"
      aria-label={ariaLabel}
      data-xen-rating={size}
      className={cn('inline-flex items-center gap-[var(--xen-space-xs)]', SIZE_CLASS[size], className)}
      {...rest}
    >
      <span aria-hidden="true" className="inline-flex leading-none tracking-[0.1em]">
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={i < filled ? 'text-accent' : 'text-muted'}>
            {STAR}
          </span>
        ))}
      </span>
      {showValue ? (
        <span aria-hidden="true" className="font-heading text-sm font-semibold text-on-surface">
          {value}
        </span>
      ) : null}
    </span>
  );
});
