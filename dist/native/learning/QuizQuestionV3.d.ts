import * as React from 'react';
import type { QuizQuestionProps } from './QuizQuestion';
/** Same public contract as {@link QuizQuestion} — a drop-in alternate design. */
export type QuizQuestionV3Props = QuizQuestionProps;
/**
 * QuizQuestion, design v3 — **full-width stacked rows with big letter badges**.
 * A pill counter and an oversized prompt sit on a chrome-less surface; each
 * choice is a wide filled row led by a large circular letter badge that flips
 * to a state glyph (`✓`/`✕`) in `review`, with the state also spoken — never
 * color alone. Empty state supported. Same props as {@link QuizQuestion}.
 * Token-only colors.
 */
export declare function QuizQuestionV3({ prompt, choices, questionNumber, totalQuestions, selectedId, review, onSelect, hint, style, }: QuizQuestionV3Props): React.ReactElement;
//# sourceMappingURL=QuizQuestionV3.d.ts.map