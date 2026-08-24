import * as React from 'react';
import type { QuestionCardProps } from './QuestionCard';
/** Same Props as {@link QuestionCard} — a drop-in alternate design. */
export type QuestionCardV2Props = QuestionCardProps;
/**
 * QuestionCard, design V2 — an **elevated, borderless card led by a big circular
 * number badge**. Where the original frames the prompt in a flat outlined box,
 * V2 floats on a token drop-shadow and anchors the question with a filled
 * primary badge showing its position (`number`, or `number / total` beneath it).
 * The prompt sits beside the badge as the `header`; required state is spoken and
 * marked (never color-alone), and the answer control drops in below the divider.
 * Token-pure — fill/shadow/tints all trace to compiled tokens.
 */
export declare function QuestionCardV2({ title, helpText, number, total, required, error, variant, children, style, }: QuestionCardV2Props): React.ReactElement;
//# sourceMappingURL=QuestionCardV2.d.ts.map