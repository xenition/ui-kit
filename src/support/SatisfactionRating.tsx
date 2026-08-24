import * as React from 'react';
import { cn } from '../primitives/cn';
import { Rating } from '../primitives/Rating';
import { clamp } from './internal';

export type SatisfactionVariant = 'stars' | 'faces' | 'thumbs';
export type SatisfactionSize = 'sm' | 'md' | 'lg';

export interface SatisfactionRatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current CSAT value (1..max). `0`/undefined = unrated. */
  value?: number;
  /** Scale ceiling (default 5; forced to 2 for the `thumbs` variant). */
  max?: number;
  /** Interaction style (default `stars`). */
  variant?: SatisfactionVariant;
  /** Size scale (default `md`). */
  size?: SatisfactionSize;
  /** Fires with the chosen 1-based score. Omit to render read-only. */
  onRate?: (value: number) => void;
  /** Force read-only (display) even when `onRate` is provided. */
  readOnly?: boolean;
  /** Optional caption above the control. */
  label?: string;
}

const FACE_GLYPHS = ['😠', '🙁', '😐', '🙂', '😀'];
const THUMB_GLYPHS = ['👎', '👍'];

const SIZE_PX: Record<SatisfactionSize, number> = { sm: 20, md: 28, lg: 40 };

/**
 * Customer-satisfaction (CSAT) rating input. In read-only star mode it reuses
 * the `Rating` primitive for a token-colored star row; when `onRate` is supplied
 * it renders tappable glyph `<button>`s (`stars` / emoji `faces` / `thumbs`) —
 * each keyboard-focusable and reporting a 1-based score, grouped as a
 * `radiogroup`. The active glyph is emphasized by size/opacity plus the numeric
 * a11y label, not color alone. Token colors only.
 */
export const SatisfactionRating = React.forwardRef<HTMLDivElement, SatisfactionRatingProps>(
  function SatisfactionRating(
    { value = 0, max = 5, variant = 'stars', size = 'md', onRate, readOnly = false, label, className, ...rest },
    ref
  ) {
    const total = variant === 'thumbs' ? 2 : Math.max(1, Math.floor(max));
    const current = clamp(Math.round(value), 0, total);
    const interactive = !readOnly && typeof onRate === 'function';
    const glyphPx = SIZE_PX[size] ?? SIZE_PX.md;

    const caption = label ? (
      <span className="mb-1 block text-sm text-muted">{label}</span>
    ) : null;

    // Read-only star display delegates to the Rating primitive.
    if (!interactive && variant === 'stars') {
      return (
        <div ref={ref} className={className} {...rest}>
          {caption}
          <Rating value={current} max={total} size={size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md'} showValue />
        </div>
      );
    }

    const glyphFor = (index: number): string => {
      if (variant === 'faces') return FACE_GLYPHS[index] ?? '🙂';
      if (variant === 'thumbs') return THUMB_GLYPHS[index] ?? '👍';
      return '★';
    };

    return (
      <div ref={ref} className={className} {...rest}>
        {caption}
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
                className={cn(
                  'leading-none',
                  variant === 'stars' && (selected ? 'text-accent' : 'text-muted')
                )}
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
                className="rounded p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
              >
                {cell}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);
