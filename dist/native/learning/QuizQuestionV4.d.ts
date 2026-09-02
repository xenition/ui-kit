import * as React from 'react';
import type { QuizQuestionProps } from './QuizQuestion';
/** Drop-in for {@link QuizQuestionProps} — same props, the V4 "campus" design. */
export type QuizQuestionV4Props = QuizQuestionProps;
/**
 * QuizQuestion — **V4** "campus" design (native twin of the web V4). An elevated
 * rounded card with a soft shadow holding a "Question X of Y" pill, the prompt,
 * and a `radiogroup` of {@link QuizOptionV4}s. In `review` mode each option
 * resolves to a correct / incorrect / selected state (glyph + border, never color
 * alone). Renders an empty-state note when there are no choices. Token-only
 * colors via `useXenitionTheme()`.
 */
export declare function QuizQuestionV4({ prompt, choices, questionNumber, totalQuestions, selectedId, review, onSelect, hint, style }: QuizQuestionV4Props): React.ReactElement;
//# sourceMappingURL=QuizQuestionV4.d.ts.map