import * as React from 'react';
import type { QuestionCardProps } from './QuestionCard';
/** Drop-in for {@link QuestionCardProps} — same props, the V4 "focus" design. */
export type QuestionCardV4Props = QuestionCardProps;
/**
 * QuestionCard — **V4** "focus" design. The calm, legible take on a survey
 * question: an elevated rounded surface with generous air, a soft-primary
 * number pill (`N / total`), a big prompt, and a slim primary focus bar down the
 * left edge — the single signature accent that anchors the eye. Required shows a
 * spoken danger asterisk; `error` flips the focus bar and message to danger.
 * Same props/behavior as {@link QuestionCardProps}; token-only colors via
 * `useXenitionTheme()`. `variant="compact"` tightens the padding.
 */
export declare function QuestionCardV4({ title, helpText, number, total, required, error, variant, children, style, }: QuestionCardV4Props): React.ReactElement;
//# sourceMappingURL=QuestionCardV4.d.ts.map