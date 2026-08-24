import * as React from 'react';
import { cn } from '../primitives/cn';
import type { SatisfactionRatingProps } from './SatisfactionRating';

/** Same public contract as {@link SatisfactionRating} — a drop-in alternate design. */
export type SatisfactionRatingV2Props = SatisfactionRatingProps;

const FACES = ['😠', '😕', '😐', '🙂', '😄'];

/**
 * SatisfactionRating, redesigned (v2): a **big face/emoji picker**. Large tappable
 * tiles — expressive faces (or 👍/👎 for `thumbs`, ★ for `stars`) — where the
 * chosen one fills primary. A bolder CSAT prompt than v1. Same props, token-only.
 */
export const SatisfactionRatingV2 = React.forwardRef<HTMLDivElement, SatisfactionRatingV2Props>(
  function SatisfactionRatingV2({ value = 0, max = 5, variant = 'stars', size, onRate, readOnly = false, label, className, ...rest }, ref) {
    void size;
    const count = variant === 'thumbs' ? 2 : max;
    const interactive = !readOnly && typeof onRate === 'function';
    const glyphFor = (i: number): string => {
      if (variant === 'thumbs') return i === 0 ? '👎' : '👍';
      if (variant === 'faces') return FACES[Math.min(FACES.length - 1, Math.round((i / Math.max(1, count - 1)) * (FACES.length - 1)))] ?? '🙂';
      return i < value ? '★' : '☆';
    };

    return (
      <div ref={ref} data-xen-satisfaction-rating="" role={interactive ? 'radiogroup' : 'img'} aria-label={label ?? `Rated ${value} of ${count}`} className={cn('flex flex-col gap-2', className)} {...rest}>
        {label ? <p className="text-sm font-medium text-on-surface">{label}</p> : null}
        <div className="flex gap-2">
          {Array.from({ length: count }).map((_, i) => {
            const score = i + 1;
            const selected = value === score;
            const glyph = glyphFor(i);
            const cls = cn(
              'flex h-12 w-12 items-center justify-center rounded-lg text-2xl transition-colors',
              selected ? 'bg-primary/15 ring-2 ring-primary' : 'bg-neutral-100'
            );
            if (!interactive) return <span key={i} className={cls}>{glyph}</span>;
            return (
              <button key={i} type="button" role="radio" aria-checked={selected} aria-label={`Rate ${score}`} onClick={() => onRate?.(score)} className={cn(cls, 'hover:opacity-90')}>
                {glyph}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);
