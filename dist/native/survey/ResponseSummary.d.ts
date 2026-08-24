import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { SurveyAnswer } from './types';
export interface ResponseSummaryProps {
    /** The answered questions to review. Empty renders the empty state. */
    answers: SurveyAnswer[];
    /** Optional heading. Default `'Review your answers'`. */
    title?: string;
    /** Fires when a row's Edit affordance is pressed (enables per-answer edit). */
    onEdit?: (id: string) => void;
    /** Label for the edit affordance. Default `'Edit'`. */
    editLabel?: string;
    /** Copy for the empty state. Default `'No answers to review yet.'`. */
    emptyText?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A read-back of the respondent's answers before submit — a titled list of
 * question/answer rows inside a token `Card`. Skipped answers render in the
 * muted tone and are announced as skipped (not color-only). When `onEdit` is
 * supplied each row exposes an `Edit` button. An empty `answers` array renders
 * a muted empty state. No literal colors.
 */
export declare function ResponseSummary({ answers, title, onEdit, editLabel, emptyText, style, }: ResponseSummaryProps): React.ReactElement;
//# sourceMappingURL=ResponseSummary.d.ts.map