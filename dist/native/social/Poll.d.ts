import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type Appearance } from '../primitives/internal/appearance';
export interface PollOption {
    id: string;
    label: string;
    /** Vote tally for this option. */
    votes?: number;
}
export interface PollProps {
    /** The poll question. */
    question: string;
    /** Answer options. */
    options: ReadonlyArray<PollOption>;
    /** The option the viewer voted for (controlled). Presence flips to results. */
    votedOptionId?: string;
    /** Poll is closed — always show results, disable voting. */
    closed?: boolean;
    /** Fires with the option id when the viewer votes. */
    onVote?: (id: string) => void;
    /** Footer meta (e.g. `1,204 votes · 2d left`). Auto-derived if omitted. */
    meta?: string;
    /**
     * Surface treatment for the poll card — fill/border/elevation only;
     * radius/padding are unchanged. Default `'classic'` (the historical look).
     */
    appearance?: Appearance;
    style?: StyleProp<ViewStyle>;
}
/**
 * A tap-to-vote poll with three states: open (tappable options), voted, and
 * closed. Once voted or closed each option becomes a labeled percentage bar,
 * the viewer's pick is tinted primary, and the leading option is emphasized.
 * Guards an all-zero tally. Token-only.
 */
export declare function Poll({ question, options, votedOptionId, closed, onVote, meta, appearance, style, }: PollProps): React.ReactElement;
//# sourceMappingURL=Poll.d.ts.map