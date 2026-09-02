import * as React from 'react';
import { cn } from '../primitives/cn';
import { QuizOptionV4 } from './QuizOptionV4';
import type { QuizOptionState } from './QuizOption';
import type { QuizQuestionProps, QuizChoice } from './QuizQuestion';

/** Drop-in for {@link QuizQuestionProps} — same props, the V4 "campus" design. */
export type QuizQuestionV4Props = QuizQuestionProps;

const MARKERS = 'ABCDEFGH';

/**
 * QuizQuestion — **V4** "campus" design (web parity of the native V4). An
 * elevated rounded card with a soft shadow holding a "Question X of Y" pill, the
 * prompt, and a `radiogroup` of {@link QuizOptionV4}s. In `review` mode each
 * option resolves to a correct / incorrect / selected state (glyph + ring, never
 * color alone). Renders an empty-state note when there are no choices. Identical
 * props/behavior to {@link QuizQuestionProps}. All colors from `--xen-*` token
 * classes (no literals).
 */
export const QuizQuestionV4 = React.forwardRef<HTMLDivElement, QuizQuestionV4Props>(function QuizQuestionV4(
  { prompt, choices, questionNumber, totalQuestions, selectedId, review = false, onSelect, hint, className, ...rest },
  ref
) {
  const resolveState = (choice: QuizChoice): QuizOptionState => {
    const isSelected = choice.id === selectedId;
    if (review) {
      if (choice.correct) return 'correct';
      if (isSelected) return 'incorrect';
      return 'default';
    }
    return isSelected ? 'selected' : 'default';
  };

  const numbered = questionNumber != null && totalQuestions != null;

  return (
    <div
      ref={ref}
      data-xen-quiz-question=""
      aria-label={numbered ? `Question ${questionNumber} of ${totalQuestions}: ${prompt}` : prompt}
      className={cn('flex flex-col gap-3 rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm p-[var(--xen-space-lg)]', className)}
      {...rest}
    >
      {numbered ? (
        <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-bold uppercase tabular-nums text-primary">
          Question {questionNumber} of {totalQuestions}
        </span>
      ) : null}

      <h3 className="text-lg font-bold text-on-surface">{prompt}</h3>

      {choices.length === 0 ? (
        <p className="text-sm text-muted">No choices available</p>
      ) : (
        <div role="radiogroup" className="flex flex-col gap-2">
          {choices.map((choice, i) => (
            <QuizOptionV4
              key={choice.id}
              label={choice.label}
              marker={MARKERS[i] ?? String(i + 1)}
              state={resolveState(choice)}
              selected={choice.id === selectedId}
              disabled={review}
              onSelect={review ? undefined : () => onSelect?.(choice.id)}
            />
          ))}
        </div>
      )}

      {hint ? <p className="text-xs text-muted">{hint}</p> : null}
    </div>
  );
});
