import * as React from 'react';
import { cn } from '../primitives/cn';
import { QuizOption, type QuizOptionState } from './QuizOption';

/** One answer choice fed to {@link QuizQuestion}. */
export interface QuizChoice {
  /** Stable id returned by `onSelect`. */
  id: string;
  /** Answer text. */
  label: string;
  /** Whether this choice is the correct one (used only in `review` mode). */
  correct?: boolean;
}

export interface QuizQuestionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** The question prompt. */
  prompt: string;
  /** Answer choices. */
  choices: QuizChoice[];
  /** 1-based question number for the "Question X of Y" header. */
  questionNumber?: number;
  /** Total questions, paired with `questionNumber`. */
  totalQuestions?: number;
  /** The currently chosen choice id. */
  selectedId?: string;
  /** When true, choices show correct/incorrect review states. */
  review?: boolean;
  /** Fires with the chosen choice id. */
  onSelect?: (id: string) => void;
  /** Optional helper/hint line under the choices. */
  hint?: string;
}

const MARKERS = 'ABCDEFGH';

/**
 * A quiz question block: a "Question X of Y" eyebrow, the prompt, and a
 * `radiogroup` of {@link QuizOption}s. In `review` mode each option resolves to
 * a correct / incorrect / selected state (with glyphs, not color alone). Renders
 * an empty-state note when there are no choices. Token-only colors (`--xen-*`).
 */
export const QuizQuestion = React.forwardRef<HTMLDivElement, QuizQuestionProps>(function QuizQuestion(
  {
    prompt,
    choices,
    questionNumber,
    totalQuestions,
    selectedId,
    review = false,
    onSelect,
    hint,
    className,
    ...rest
  },
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
      aria-label={numbered ? `Question ${questionNumber} of ${totalQuestions}: ${prompt}` : prompt}
      className={cn(
        'flex flex-col gap-3 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]',
        className
      )}
      {...rest}
    >
      {numbered ? (
        <span className="text-xs font-bold uppercase text-primary">
          Question {questionNumber} of {totalQuestions}
        </span>
      ) : null}

      <h3 className="text-lg font-bold text-on-surface">{prompt}</h3>

      {choices.length === 0 ? (
        <p className="text-sm text-muted">No choices available</p>
      ) : (
        <div role="radiogroup" className="flex flex-col gap-2">
          {choices.map((choice, i) => (
            <QuizOption
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
