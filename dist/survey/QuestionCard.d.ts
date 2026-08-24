import * as React from 'react';
export type QuestionCardVariant = 'default' | 'numbered' | 'compact';
export interface QuestionCardProps {
    /** The question prompt. */
    title: string;
    /** Optional clarifying line under the prompt. */
    helpText?: string;
    /** 1-based position, shown as a badge when `variant='numbered'`. */
    number?: number;
    /** Total questions, rendered as `number / total` when both are set. */
    total?: number;
    /** Marks the question required → danger asterisk + a11y hint. */
    required?: boolean;
    /** Validation message shown under the input in the danger tone. */
    error?: string;
    /** Surface treatment. `compact` tightens padding. Default `'default'`. */
    variant?: QuestionCardVariant;
    /** The input control(s) for this question. */
    children?: React.ReactNode;
    className?: string;
}
/**
 * Framed container for one survey question — a token-bound {@link Card} with a
 * prompt, optional help line, an optional position badge (`numbered`), a
 * required marker, and a slot for the answer control. `compact` tightens the
 * padding for dense forms. The prompt is a `heading`; the required state is
 * spoken via `aria-label` (asterisk color is never the sole signal). No literal
 * colors — every value traces to a `--xen-*` token class.
 */
export declare const QuestionCard: React.ForwardRefExoticComponent<QuestionCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=QuestionCard.d.ts.map