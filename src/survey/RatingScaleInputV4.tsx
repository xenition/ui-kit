import * as React from 'react';
import { cn } from '../primitives/cn';
import type { RatingScaleInputProps } from './RatingScaleInput';

/** Drop-in for {@link RatingScaleInputProps} — same props, the V4 "focus" design. */
export type RatingScaleInputV4Props = RatingScaleInputProps;

/**
 * RatingScaleInput — **V4** "clean form / focus" design. A big, tappable rating
 * (min 44px targets) that reports a 1-based value: `star` fills glyphs up to the
 * selection with the **warn** star tone (empty = muted); `number` shows big
 * primary-filled chips; `emoji` maps each cell to a face. The chosen value is
 * echoed as a large **primary** numeral (`N / total`) so the answer reads at a
 * glance. Calm, one accent, no gradients. Each cell is a `radio` that announces
 * its value and selection via `aria-checked` — never color-alone. Guards
 * `max`/`emojis` indexing. Same props/behavior as {@link RatingScaleInputProps};
 * all colors from `--xen-*` token classes (no literal colors).
 */
export const RatingScaleInputV4 = React.forwardRef<HTMLDivElement, RatingScaleInputV4Props>(
  function RatingScaleInputV4(
    {
      value,
      onChange,
      max = 5,
      variant = 'star',
      emojis = ['😖', '🙁', '😐', '🙂', '😍'],
      'aria-label': ariaLabel = 'Rating',
      disabled = false,
      className,
    },
    ref
  ) {
    const total = Math.max(1, Math.floor(max));
    const current = value ?? 0;
    const hasValue = current > 0;

    return (
      <div ref={ref} className={cn('flex flex-col gap-sm', className)}>
        <div role="radiogroup" aria-label={ariaLabel} className="flex flex-wrap items-center gap-sm">
          {Array.from({ length: total }, (_, i) => {
            const cell = i + 1;
            const active = cell <= current; // for star: fill up to selection
            const selected = cell === current;
            const emojiGlyph = emojis.length > 0 ? emojis[Math.min(i, emojis.length - 1)] : '🙂';
            return (
              <button
                key={cell}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={`${cell} of ${total}`}
                disabled={disabled}
                onClick={() => onChange?.(cell)}
                className={cn(
                  'flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[var(--xen-radius-lg)] leading-none transition-colors',
                  'disabled:pointer-events-none disabled:opacity-50'
                )}
              >
                {variant === 'star' ? (
                  <span className={cn('text-3xl leading-none', active ? 'text-warn' : 'text-muted')}>★</span>
                ) : variant === 'emoji' ? (
                  <span className={cn('text-3xl leading-none', selected ? 'opacity-100' : 'opacity-40')}>
                    {emojiGlyph}
                  </span>
                ) : (
                  <span
                    className={cn(
                      'flex h-11 w-11 items-center justify-center rounded-full border text-lg font-bold transition-colors',
                      selected
                        ? 'border-2 border-primary bg-primary text-on-primary'
                        : 'border-border bg-surface text-on-surface hover:bg-primary/10'
                    )}
                  >
                    {cell}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Big numeral echo of the selected value. */}
        <div className="flex items-baseline gap-1" aria-hidden="true">
          <span className={cn('text-4xl font-extrabold leading-none', hasValue ? 'text-primary' : 'text-muted')}>
            {hasValue ? current : '–'}
          </span>
          <span className="text-lg font-semibold text-muted">/ {total}</span>
        </div>
      </div>
    );
  }
);
