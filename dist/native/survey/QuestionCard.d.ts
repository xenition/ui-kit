import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
    /** Marks the question required → red asterisk + a11y hint. */
    required?: boolean;
    /** Validation message shown under the input in the danger tone. */
    error?: string;
    /** Surface treatment. `compact` tightens padding. Default `'default'`. */
    variant?: QuestionCardVariant;
    /** The input control(s) for this question. */
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
/**
 * Framed container for one survey question — a token-bound {@link Card} with a
 * prompt, optional help line, an optional position badge (`numbered`), a
 * required marker, and a slot for the answer control. `compact` tightens the
 * padding for dense forms. The prompt is announced as a `header`; the required
 * state is spoken (asterisk color is never the sole signal). No literal colors.
 */
export declare function QuestionCard({ title, helpText, number, total, required, error, variant, children, style, }: QuestionCardProps): React.ReactElement;
//# sourceMappingURL=QuestionCard.d.ts.map