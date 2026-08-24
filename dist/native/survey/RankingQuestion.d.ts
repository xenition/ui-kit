import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { SurveyChoice } from './types';
export interface RankingQuestionProps {
    /** The rankable items (looked up by id). Empty renders the empty state. */
    items: SurveyChoice[];
    /**
     * Controlled ranked order as a list of item ids, best→worst. Ids missing
     * from `items` are skipped; items missing from `value` are appended in their
     * source order so the control is always complete.
     */
    value: string[];
    /** Fires with the full next ordered id list after a move. */
    onChange: (orderedIds: string[]) => void;
    /** Accessible name for the list. Default `'Ranking'`. */
    accessibilityLabel?: string;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A ranking / ordering question — items shown in their current rank with a rank
 * number and up/down controls that reorder the list. Emits the full next id
 * order on every move; the move buttons disable at the ends and are labelled
 * ("Move X up") so the action is never icon-only for screen readers. Resolves a
 * complete order even when `value` is partial or stale. Empty items render a
 * muted empty state. No literal colors.
 */
export declare function RankingQuestion({ items, value, onChange, accessibilityLabel, disabled, style, }: RankingQuestionProps): React.ReactElement;
//# sourceMappingURL=RankingQuestion.d.ts.map