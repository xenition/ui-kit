import * as React from 'react';
import type { QuizQuestionProps } from './QuizQuestion';
/** Same public contract as {@link QuizQuestion} — a drop-in alternate design. */
export type QuizQuestionV2Props = QuizQuestionProps;
/**
 * QuizQuestion, design v2 — a **two-column grid of answer cards**. A progress
 * bar replaces the eyebrow, then each choice is a tall radio card carrying its
 * letter badge and, in `review`, a state glyph (`✓`/`✕`) plus a spoken suffix —
 * never color alone. Renders an empty note when there are no choices. Same props
 * as {@link QuizQuestion}. Token-only colors.
 */
export declare function QuizQuestionV2({ prompt, choices, questionNumber, totalQuestions, selectedId, review, onSelect, hint, style, }: QuizQuestionV2Props): React.ReactElement;
//# sourceMappingURL=QuizQuestionV2.d.ts.map