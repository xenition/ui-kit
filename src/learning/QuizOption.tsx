import * as React from 'react';
import { cn } from '../primitives/cn';

/**
 * Answer-review state. `correct`/`incorrect` are surfaced with an explicit glyph
 * and text — never color alone — so they're distinguishable without color vision.
 */
export type QuizOptionState = 'default' | 'selected' | 'correct' | 'incorrect';

interface StateVisual {
  /** Token `border-*` class. */
  borderClass: string;
  glyph: string | null;
  /** Token `text-*` class for the glyph. */
  glyphClass: string;
  /** Text appended to the a11y label so state isn't color-only. */
  a11ySuffix: string;
}

const STATE_VISUAL: Record<QuizOptionState, StateVisual> = {
  default: { borderClass: 'border-border', glyph: null, glyphClass: 'text-muted', a11ySuffix: '' },
  selected: { borderClass: 'border-primary', glyph: '●', glyphClass: 'text-primary', a11ySuffix: ', selected' },
  correct: { borderClass: 'border-success', glyph: '✓', glyphClass: 'text-success', a11ySuffix: ', correct answer' },
  incorrect: { borderClass: 'border-danger', glyph: '✕', glyphClass: 'text-danger', a11ySuffix: ', incorrect answer' },
};

export interface QuizOptionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** The answer text. */
  label: string;
  /** Optional lead-in marker, e.g. "A". */
  marker?: string;
  /** Review/selection state. */
  state?: QuizOptionState;
  /** Whether this option is currently the chosen one (drives the radio a11y state). */
  selected?: boolean;
  disabled?: boolean;
  /** Fires when the option is chosen. */
  onSelect?: () => void;
}

/**
 * A single selectable quiz answer, rendered as an accessibility `radio`.
 * Correct/incorrect states carry an explicit glyph (`✓` / `✕`) and spoken
 * suffix so they never rely on color alone. Activates on click and on
 * Enter/Space. Token-only colors (`--xen-*`).
 */
export const QuizOption = React.forwardRef<HTMLDivElement, QuizOptionProps>(function QuizOption(
  { label, marker, state = 'default', selected, disabled = false, onSelect, className, ...rest },
  ref
) {
  const visual = STATE_VISUAL[state];
  const isSelected = selected ?? state === 'selected';
  const interactive = !disabled && !!onSelect;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (!interactive) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect?.();
    }
  };

  return (
    <div
      ref={ref}
      role="radio"
      aria-checked={isSelected}
      aria-disabled={disabled || undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={`${marker ? `${marker}. ` : ''}${label}${visual.a11ySuffix}`}
      onClick={interactive ? onSelect : undefined}
      onKeyDown={handleKeyDown}
      className={cn(
        'flex items-center gap-3 rounded-[var(--xen-radius-md)] border bg-surface px-3 py-3',
        visual.borderClass,
        disabled ? 'opacity-50' : interactive && 'cursor-pointer',
        interactive && 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      {...rest}
    >
      {marker ? (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-xs font-bold text-muted">
          {marker}
        </span>
      ) : null}
      <span className="flex-1 text-base text-on-surface">{label}</span>
      {visual.glyph ? (
        <span aria-hidden="true" className={cn('text-base font-bold', visual.glyphClass)}>
          {visual.glyph}
        </span>
      ) : null}
    </div>
  );
});
