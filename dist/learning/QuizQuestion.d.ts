import * as React from 'react';
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
/**
 * A quiz question block: a "Question X of Y" eyebrow, the prompt, and a
 * `radiogroup` of {@link QuizOption}s. In `review` mode each option resolves to
 * a correct / incorrect / selected state (with glyphs, not color alone). Renders
 * an empty-state note when there are no choices. Token-only colors (`--xen-*`).
 */
export declare const QuizQuestion: React.ForwardRefExoticComponent<QuizQuestionProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=QuizQuestion.d.ts.map