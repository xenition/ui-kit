import * as React from 'react';
import type { QuizQuestionProps } from './QuizQuestion';
/** Same public contract as {@link QuizQuestion} — a drop-in alternate design. */
export type QuizQuestionV2Props = QuizQuestionProps;
/**
 * QuizQuestion, redesigned (v2): an **elevated quiz card with lettered tiles**. A
 * progress bar tops the card (Question X of Y), the prompt is large, and choices
 * render as big lettered tiles in a two-column grid — selected tiles fill
 * primary, review tiles glyph-mark correct/incorrect (never color alone). Same
 * props as {@link QuizQuestion}, token-only.
 */
export declare const QuizQuestionV2: React.ForwardRefExoticComponent<QuizQuestionProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=QuizQuestionV2.d.ts.map