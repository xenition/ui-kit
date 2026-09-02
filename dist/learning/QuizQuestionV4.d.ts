import * as React from 'react';
import type { QuizQuestionProps } from './QuizQuestion';
/** Drop-in for {@link QuizQuestionProps} — same props, the V4 "campus" design. */
export type QuizQuestionV4Props = QuizQuestionProps;
/**
 * QuizQuestion — **V4** "campus" design (web parity of the native V4). An
 * elevated rounded card with a soft shadow holding a "Question X of Y" pill, the
 * prompt, and a `radiogroup` of {@link QuizOptionV4}s. In `review` mode each
 * option resolves to a correct / incorrect / selected state (glyph + ring, never
 * color alone). Renders an empty-state note when there are no choices. Identical
 * props/behavior to {@link QuizQuestionProps}. All colors from `--xen-*` token
 * classes (no literals).
 */
export declare const QuizQuestionV4: React.ForwardRefExoticComponent<QuizQuestionProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=QuizQuestionV4.d.ts.map