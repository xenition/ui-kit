import * as React from 'react';
import { cn } from '../primitives/cn';

export type RatingScaleVariant = 'star' | 'number' | 'emoji';

const DEFAULT_EMOJI = ['😖', '🙁', '😐', '🙂', '😍'];

export interface RatingScaleInputProps {
  /** Selected rating, 1-based. `0`/`null`/`undefined` → nothing selected. */
  value?: number | null;
  /** Fires with the chosen 1-based rating. */
  onChange?: (value: number) => void;
  /** Total glyphs/cells (default 5). */
  max?: number;
  /** Render mode. Default `'star'`. */
  variant?: RatingScaleVariant;
  /**
   * Emoji faces for `variant='emoji'`, lowest→highest. Defaults to a 5-face
   * ramp; indexed defensively so any `max` is safe.
   */
  emojis?: string[];
  /** Accessible name for the control. Default `'Rating'`. */
  'aria-label'?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * An interactive rating input — a `radiogroup` of clickable cells that report a
 * 1-based rating. `star` fills glyphs up to the selection with the accent token;
 * `number` shows filled numeric chips; `emoji` maps each cell to a face. Each
 * cell announces its value and selection via `aria-checked` (never color-alone).
 * Guards `max`/`emojis` indexing. No literal colors.
 */
export const RatingScaleInput = React.forwardRef<HTMLDivElement, RatingScaleInputProps>(
  function RatingScaleInput(
    {
      value,
      onChange,
      max = 5,
      variant = 'star',
      emojis = DEFAULT_EMOJI,
      'aria-label': ariaLabel = 'Rating',
      disabled = false,
      className,
    },
    ref
  ) {
    const total = Math.max(1, Math.floor(max));
    const current = value ?? 0;

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label={ariaLabel}
        className={cn('flex items-center gap-sm', className)}
      >
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
              className="leading-none disabled:pointer-events-none disabled:opacity-50"
            >
              {variant === 'star' ? (
                <span className={cn('text-2xl leading-none', active ? 'text-accent' : 'text-muted')}>★</span>
              ) : variant === 'emoji' ? (
                <span className={cn('text-2xl leading-none', selected ? 'opacity-100' : 'opacity-40')}>
                  {emojiGlyph}
                </span>
              ) : (
                <span
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border text-base font-bold transition-colors',
                    selected
                      ? 'border-2 border-primary bg-primary text-on-primary'
                      : 'border-border bg-surface text-on-surface'
                  )}
                >
                  {cell}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }
);
