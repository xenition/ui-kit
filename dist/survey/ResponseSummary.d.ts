import * as React from 'react';
import type { SurveyAnswer } from './types';
export interface ResponseSummaryProps {
    /** The answered questions to review. Empty renders the empty state. */
    answers: SurveyAnswer[];
    /** Optional heading. Default `'Review your answers'`. */
    title?: string;
    /** Fires when a row's Edit affordance is clicked (enables per-answer edit). */
    onEdit?: (id: string) => void;
    /** Label for the edit affordance. Default `'Edit'`. */
    editLabel?: string;
    /** Copy for the empty state. Default `'No answers to review yet.'`. */
    emptyText?: string;
    className?: string;
}
/**
 * A read-back of the respondent's answers before submit — a titled list of
 * question/answer rows inside a token `Card`. Skipped answers render in the
 * muted tone and are announced as skipped (not color-only). When `onEdit` is
 * supplied each row exposes an `Edit` button. An empty `answers` array renders a
 * muted {@link EmptyState}. No literal colors.
 */
export declare const ResponseSummary: React.ForwardRefExoticComponent<ResponseSummaryProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ResponseSummary.d.ts.map