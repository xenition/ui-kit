import * as React from 'react';
import { cn } from '../primitives/cn';

/** One face on the scale: the glyph and its spoken meaning. */
export interface EmojiOption {
  /** The emoji glyph to render (e.g. `'🙂'`). */
  emoji: string;
  /** Spoken/visible label for the face (e.g. `'Good'`). Carries the meaning so it's never color-only. */
  label: string;
}

/** Default 5-face satisfaction set, Terrible → Great. */
export const DEFAULT_EMOJI_OPTIONS: readonly EmojiOption[] = [
  { emoji: '😡', label: 'Terrible' },
  { emoji: '😞', label: 'Poor' },
  { emoji: '😐', label: 'Okay' },
  { emoji: '🙂', label: 'Good' },
  { emoji: '😍', label: 'Great' },
];

export interface EmojiScaleProps {
  /** Selected option index. `null`/`undefined` → nothing selected. */
  value?: number | null;
  /** Fires with the chosen option index (0-based). */
  onChange: (value: number) => void;
  /** The faces to show. Default {@link DEFAULT_EMOJI_OPTIONS} (a 5-face set). */
  options?: readonly EmojiOption[];
  /** Accessible name for the group. Default `'Satisfaction'`. */
  'aria-label'?: string;
  /** Non-interactive + dimmed when `true`. Default `false`. */
  disabled?: boolean;
  /** Extra classes on the root. */
  className?: string;
}

/**
 * EmojiScale — **V4** "clean form / focus" emoji-face satisfaction picker. A row
 * of big (≥44px) emoji buttons on a calm neutral surface; the selected face
 * gets the single signature accent — a `primary` ring plus a soft `primary/10`
 * tint — and scales up slightly, with its label shown beneath the row. The face
 * label carries the meaning so selection is never conveyed by color alone.
 * Exposed as a `radiogroup` of `radio`s with spoken labels. Controlled via
 * `value` + `onChange`. All colors come from `--xen-*` token classes.
 */
export const EmojiScale = React.forwardRef<HTMLDivElement, EmojiScaleProps>(function EmojiScale(
  {
    value,
    onChange,
    options = DEFAULT_EMOJI_OPTIONS,
    'aria-label': ariaLabel = 'Satisfaction',
    disabled = false,
    className,
  },
  ref
) {
  const selectedOption = value != null ? options[value] : undefined;

  return (
    <div ref={ref} className={cn('flex flex-col gap-sm', disabled && 'opacity-50', className)}>
      <div role="radiogroup" aria-label={ariaLabel} className="flex flex-wrap justify-between gap-xs">
        {options.map((opt, index) => {
          const selected = value === index;
          return (
            <button
              key={index}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={opt.label}
              disabled={disabled}
              onClick={() => onChange(index)}
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-full border text-2xl transition-transform',
                'disabled:pointer-events-none',
                selected
                  ? 'scale-110 border-2 border-primary bg-primary/10'
                  : 'border-border bg-surface hover:bg-primary/10'
              )}
            >
              <span aria-hidden="true">{opt.emoji}</span>
            </button>
          );
        })}
      </div>

      {/* Label of the currently selected face — reserves a line to avoid layout shift. */}
      <span className="min-h-[1.25rem] text-center text-sm font-bold text-primary" aria-hidden="true">
        {selectedOption?.label ?? ''}
      </span>
    </div>
  );
});
