import * as React from 'react';
import type { QuestionCardProps } from './QuestionCard';
/** Same public contract as {@link QuestionCard} — a drop-in alternate design. */
export type QuestionCardV2Props = QuestionCardProps;
/**
 * QuestionCard, redesigned (v2): a **bold question panel**. A primary number
 * badge (`n / total`) tops the card, the prompt is large with a danger asterisk
 * when required, help text follows, then the input children and any error — an
 * elevated, prominent survey step. Same props, token-only.
 */
export declare const QuestionCardV2: React.ForwardRefExoticComponent<QuestionCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=QuestionCardV2.d.ts.map