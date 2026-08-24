import * as React from 'react';
import type { QuestionCardProps } from './QuestionCard';
/** Same Props as {@link QuestionCard} — a drop-in alternate design. */
export type QuestionCardV3Props = QuestionCardProps;
/**
 * QuestionCard, design V3 — **minimal and borderless**. No card, no shadow: a
 * small primary "eyebrow" (`Q n`, or `Q n / total`) sits above a large prompt,
 * separated from the answer control by a single hairline rule. The stripped
 * treatment suits dense, editorial surveys. Required state is spoken and marked
 * (never color-alone); the prompt is the `header`. Token-pure.
 */
export declare function QuestionCardV3({ title, helpText, number, total, required, error, variant, children, style, }: QuestionCardV3Props): React.ReactElement;
//# sourceMappingURL=QuestionCardV3.d.ts.map