import * as React from 'react';
import { cn } from '../primitives/cn';
import type { SatisfactionRatingProps } from './SatisfactionRating';

/** Same public contract as {@link SatisfactionRating} — a drop-in alternate design. */
export type SatisfactionRatingV3Props = SatisfactionRatingProps;

/**
 * SatisfactionRating, redesigned (v3): a **tight inline scale**. Small glyphs pack
 * on one line with the caption trailing — a compact CSAT read-out for a row. The
 * chosen score is filled + bolded (never color alone). The opposite of v2's big
 * tiles. Same props, token-only.
 */
export const SatisfactionRatingV3 = React.forwardRef<HTMLDivElement, SatisfactionRatingV3Props>(
  function SatisfactionRatingV3({ value = 0, max = 5, variant = 'stars', size, onRate, readOnly = false, label, className, ...rest }, ref) {
    void size;
    const count = variant === 'thumbs' ? 2 : max;
    const interactive = !readOnly && typeof onRate === 'function';
    const glyphFor = (i: number): string => {
      if (variant === 'thumbs') return i === 0 ? '👎' : '👍';
      if (variant === 'faces') return i < value ? '🙂' : '·';
      return i < value ? '★' : '☆';
    };

    return (
      <div ref={ref} data-xen-satisfaction-rating="" role={interactive ? 'radiogroup' : 'img'} aria-label={label ?? `Rated ${value} of ${count}`} className={cn('inline-flex items-center gap-2', className)} {...rest}>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: count }).map((_, i) => {
            const score = i + 1;
            const selected = value === score;
            const glyph = glyphFor(i);
            const cls = cn('text-base', i < value ? 'text-warn' : 'text-muted', selected && 'font-bold');
            if (!interactive) return <span key={i} className={cls}>{glyph}</span>;
            return (
              <button key={i} type="button" role="radio" aria-checked={selected} aria-label={`Rate ${score}`} onClick={() => onRate?.(score)} className={cn(cls, 'hover:opacity-70')}>
                {glyph}
              </button>
            );
          })}
        </div>
        {label ? <span className="text-xs text-muted">{label}</span> : null}
      </div>
    );
  }
);
