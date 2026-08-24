import * as React from 'react';
import type { BracketMatch, BracketRound } from './types';
export interface TournamentBracketProps {
    /** Rounds left→right (e.g. Quarterfinals → Final). */
    rounds: BracketRound[];
    /** Message shown when there are no rounds/matches. */
    emptyLabel?: string;
    /** Called when a match is clicked — open its detail. */
    onMatchClick?: (match: BracketMatch, roundIndex: number, matchIndex: number) => void;
    /** Extra classes on the root. */
    className?: string;
}
/**
 * A single-elimination bracket — rounds render as horizontally scrollable
 * columns of match cards, each showing two sides, scores, and the advancing team
 * (marked in weight + color + an "advanced" hint, never color alone).
 * `onMatchClick` fires with the match and its guarded `[round, match]` indices;
 * an interactive match is a real `<button>`. Renders an `EmptyState` when there
 * are no matches. Composes `Card`, `EmptyState`. Token-only.
 */
export declare function TournamentBracket({ rounds, emptyLabel, onMatchClick, className, }: TournamentBracketProps): React.ReactElement;
//# sourceMappingURL=TournamentBracket.d.ts.map