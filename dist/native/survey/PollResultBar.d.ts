import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { PollOption } from './types';
export interface PollResultBarProps {
    /** The tallied options. Empty renders the empty state. */
    options: PollOption[];
    /** The id the current user voted for (highlighted + check). */
    selectedId?: string | null;
    /**
     * Reveal percentages + fill bars. When `false` and `onVote` is set, rows are
     * tappable to cast a vote instead. Default `true`.
     */
    showResults?: boolean;
    /** Cast a vote for an option (used when `showResults` is `false`). */
    onVote?: (optionId: string) => void;
    /** Accessible name for the poll. Default `'Poll results'`. */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Poll result bars — one row per option with a proportional fill and a percent
 * of the total votes; the winning option and the user's own pick are
 * highlighted with the primary token and a check (the pick is also announced,
 * not color-only). When `showResults` is `false` and `onVote` is supplied the
 * rows become vote buttons. `0` total votes render every bar at 0% safely. No
 * literal colors.
 */
export declare function PollResultBar({ options, selectedId, showResults, onVote, accessibilityLabel, style, }: PollResultBarProps): React.ReactElement;
//# sourceMappingURL=PollResultBar.d.ts.map