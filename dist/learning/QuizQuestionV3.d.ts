import * as React from 'react';
import type { QuizQuestionProps } from './QuizQuestion';
/** Same public contract as {@link QuizQuestion} — a drop-in alternate design. */
export type QuizQuestionV3Props = QuizQuestionProps;
/**
 * QuizQuestion, redesigned (v3): a **minimal borderless quiz**. No card — a small
 * counter, the prompt, and choices as compact full-width rows with a leading
 * marker ring that fills when chosen; review marks correct/incorrect with a
 * trailing glyph (never color alone). The opposite of v2's elevated grid. Same
 * props, token-only.
 */
export declare const QuizQuestionV3: React.ForwardRefExoticComponent<QuizQuestionProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=QuizQuestionV3.d.ts.map