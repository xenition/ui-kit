import * as React from 'react';
import type { QuestionCardProps } from './QuestionCard';
/** Same public contract as {@link QuestionCard} — a drop-in alternate design. */
export type QuestionCardV3Props = QuestionCardProps;
/**
 * QuestionCard, redesigned (v3): a **minimal question block**. An inline `n.`
 * prefix runs into the prompt (danger asterisk when required), quiet help text,
 * the input children, and any error — borderless, no card chrome, for a dense
 * single-page form. The opposite of v2's panel. Same props, token-only.
 */
export declare const QuestionCardV3: React.ForwardRefExoticComponent<QuestionCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=QuestionCardV3.d.ts.map