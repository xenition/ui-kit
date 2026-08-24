import * as React from 'react';
import { cn } from '../primitives/cn';
import type { QuizQuestionProps, QuizChoice } from './QuizQuestion';

/** Same public contract as {@link QuizQuestion} — a drop-in alternate design. */
export type QuizQuestionV2Props = QuizQuestionProps;

const MARKERS = ['A', 'B', 'C', 'D', 'E', 'F'];

/**
 * QuizQuestion, redesigned (v2): an **elevated quiz card with lettered tiles**. A
 * progress bar tops the card (Question X of Y), the prompt is large, and choices
 * render as big lettered tiles in a two-column grid — selected tiles fill
 * primary, review tiles glyph-mark correct/incorrect (never color alone). Same
 * props as {@link QuizQuestion}, token-only.
 */
export const QuizQuestionV2 = React.forwardRef<HTMLDivElement, QuizQuestionV2Props>(
  function QuizQuestionV2(
    { prompt, choices, questionNumber, totalQuestions, selectedId, review = false, onSelect, hint, className, ...rest },
    ref
  ) {
    const numbered = questionNumber != null && totalQuestions != null;
    const pct = numbered ? Math.round((questionNumber! / totalQuestions!) * 100) : null;

    const tileClass = (choice: QuizChoice): string => {
      const isSelected = choice.id === selectedId;
      if (review) {
        if (choice.correct) return 'border-success bg-success/10 text-on-surface';
        if (isSelected) return 'border-danger bg-danger/10 text-on-surface';
        return 'border-border bg-surface text-on-surface';
      }
      return isSelected ? 'border-primary bg-primary/10 text-on-surface' : 'border-border bg-surface text-on-surface hover:bg-neutral-50';
    };

    const mark = (choice: QuizChoice): string | null => {
      if (!review) return null;
      if (choice.correct) return '✓';
      if (choice.id === selectedId) return '✗';
      return null;
    };

    return (
      <div
        ref={ref}
        aria-label={numbered ? `Question ${questionNumber} of ${totalQuestions}: ${prompt}` : prompt}
        className={cn('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-md', className)}
        {...rest}
      >
        {pct !== null ? (
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-wide text-primary">
              Question {questionNumber} of {totalQuestions}
            </span>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
              <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
            </div>
          </div>
        ) : null}

        <h3 className="text-xl font-bold text-on-surface">{prompt}</h3>

        {choices.length === 0 ? (
          <p className="text-sm text-muted">No choices available</p>
        ) : (
          <div role="radiogroup" className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {choices.map((choice, i) => {
              const isSelected = choice.id === selectedId;
              const m = mark(choice);
              return (
                <button
                  key={choice.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  disabled={review}
                  onClick={review ? undefined : () => onSelect?.(choice.id)}
                  className={cn(
                    'flex items-center gap-3 rounded-md border-2 p-3 text-left transition-colors motion-reduce:transition-none',
                    tileClass(choice)
                  )}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-sm font-bold text-on-surface">
                    {MARKERS[i] ?? String(i + 1)}
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-medium">{choice.label}</span>
                  {m ? <span aria-hidden className="text-base">{m}</span> : null}
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
