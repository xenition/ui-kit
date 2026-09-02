import * as React from 'react';
import { cn } from '../primitives/cn';
import type { QuizOptionProps, QuizOptionState } from './QuizOption';

/** Drop-in for {@link QuizOptionProps} — same props, the V4 "campus" design. */
export type QuizOptionV4Props = QuizOptionProps;

interface StateVisual {
  border: string;
  markerWell: string;
  glyph: string | null;
  glyphClass: string;
  a11ySuffix: string;
}

const STATE_VISUAL: Record<QuizOptionState, StateVisual> = {
  default: { border: 'border-border', markerWell: 'bg-neutral-100 text-muted', glyph: null, glyphClass: 'text-muted', a11ySuffix: '' },
  selected: { border: 'border-primary ring-1 ring-primary', markerWell: 'bg-primary text-on-primary', glyph: '●', glyphClass: 'text-primary', a11ySuffix: ', selected' },
  correct: { border: 'border-success ring-1 ring-success', markerWell: 'bg-success text-on-success', glyph: '✓', glyphClass: 'text-success', a11ySuffix: ', correct answer' },
  incorrect: { border: 'border-danger ring-1 ring-danger', markerWell: 'bg-danger text-on-danger', glyph: '✕', glyphClass: 'text-danger', a11ySuffix: ', incorrect answer' },
};

/**
 * QuizOption — **V4** "campus" design (web parity of the native V4). A single
 * selectable quiz answer rendered as an accessibility `radio` on an elevated
 * rounded surface. The lead marker sits in a tone-filled well and correct /
 * incorrect / selected states carry an explicit glyph (`✓` / `✕` / `●`) + spoken
 * suffix + a toned ring, so they never rely on color alone. Activates on click
 * and on Enter/Space. Identical props/behavior to {@link QuizOptionProps}. All
 * colors from `--xen-*` token classes (no literals).
 */
export const QuizOptionV4 = React.forwardRef<HTMLDivElement, QuizOptionV4Props>(function QuizOptionV4(
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
      data-xen-quiz-option=""
      aria-checked={isSelected}
      aria-disabled={disabled || undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={`${marker ? `${marker}. ` : ''}${label}${visual.a11ySuffix}`}
      onClick={interactive ? onSelect : undefined}
      onKeyDown={handleKeyDown}
      className={cn(
        'flex min-h-[48px] items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)] shadow-sm',
        visual.border,
        disabled ? 'opacity-50' : interactive && 'cursor-pointer transition-opacity hover:opacity-90',
        interactive && 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      {...rest}
    >
      {marker ? (
        <span className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold', visual.markerWell)}>{marker}</span>
      ) : null}
      <span className="flex-1 text-base text-on-surface">{label}</span>
      {visual.glyph ? (
        <span aria-hidden="true" className={cn('text-base font-bold', visual.glyphClass)}>{visual.glyph}</span>
      ) : null}
    </div>
  );
});
