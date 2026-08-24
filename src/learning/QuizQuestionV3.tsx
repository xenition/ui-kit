import * as React from 'react';
import { cn } from '../primitives/cn';
import type { QuizQuestionProps, QuizChoice } from './QuizQuestion';

/** Same public contract as {@link QuizQuestion} — a drop-in alternate design. */
export type QuizQuestionV3Props = QuizQuestionProps;

const MARKERS = ['A', 'B', 'C', 'D', 'E', 'F'];

/**
 * QuizQuestion, redesigned (v3): a **minimal borderless quiz**. No card — a small
 * counter, the prompt, and choices as compact full-width rows with a leading
 * marker ring that fills when chosen; review marks correct/incorrect with a
 * trailing glyph (never color alone). The opposite of v2's elevated grid. Same
 * props, token-only.
 */
export const QuizQuestionV3 = React.forwardRef<HTMLDivElement, QuizQuestionV3Props>(
  function QuizQuestionV3(
    { prompt, choices, questionNumber, totalQuestions, selectedId, review = false, onSelect, hint, className, ...rest },
    ref
  ) {
    const numbered = questionNumber != null && totalQuestions != null;

    const rowClass = (choice: QuizChoice): string => {
      const isSelected = choice.id === selectedId;
      if (review) {
        if (choice.correct) return 'text-success';
        if (isSelected) return 'text-danger';
        return 'text-on-surface';
      }
      return isSelected ? 'text-primary' : 'text-on-surface hover:bg-neutral-50';
    };
    const markerClass = (choice: QuizChoice): string => {
      const isSelected = choice.id === selectedId;
      if (review) {
        if (choice.correct) return 'border-success text-success';
        if (isSelected) return 'border-danger text-danger';
        return 'border-border text-muted';
      }
      return isSelected ? 'border-primary bg-primary text-on-primary' : 'border-border text-muted';
    };
    const trailing = (choice: QuizChoice): string | null => {
      if (!review) return null;
      if (choice.correct) return '✓';
      if (choice.id === selectedId) return '✗';
      return null;
    };

    return (
      <div
        ref={ref}
        aria-label={numbered ? `Question ${questionNumber} of ${totalQuestions}: ${prompt}` : prompt}
        className={cn('flex flex-col gap-2', className)}
        {...rest}
      >
        {numbered ? (
          <span className="text-xs font-semibold text-muted">
            {questionNumber} / {totalQuestions}
          </span>
        ) : null}
        <h3 className="text-base font-bold text-on-surface">{prompt}</h3>

        {choices.length === 0 ? (
          <p className="text-sm text-muted">No choices available</p>
        ) : (
          <div role="radiogroup" className="flex flex-col">
            {choices.map((choice, i) => {
              const isSelected = choice.id === selectedId;
              const t = trailing(choice);
              return (
                <button
                  key={choice.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  disabled={review}
                  onClick={review ? undefined : () => onSelect?.(choice.id)}
                  className={cn(
                    'flex items-center gap-3 border-b border-border py-2.5 text-left transition-colors motion-reduce:transition-none',
                    rowClass(choice)
                  )}
                >
                  <span
                    className={cn(
                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold',
                      markerClass(choice)
                    )}
                  >
                    {MARKERS[i] ?? String(i + 1)}
                  </span>
                  <span className="min-w-0 flex-1 text-sm">{choice.label}</span>
                  {t ? <span aria-hidden className="text-sm">{t}</span> : null}
                </button>
              );
            })}
          </div>
        )}

        {hint ? <p className="text-xs text-muted">{hint}</p> : null}
      </div>
    );
  }
);
