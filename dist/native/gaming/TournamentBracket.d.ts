import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { BracketMatch, BracketRound } from './types';
export interface TournamentBracketProps {
    /** Rounds left→right (e.g. Quarterfinals → Final). */
    rounds: BracketRound[];
    /** Message shown when there are no rounds/matches. */
    emptyLabel?: string;
    /** Called when a match is tapped — open its detail. */
    onMatchPress?: (match: BracketMatch, roundIndex: number, matchIndex: number) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single-elimination bracket — rounds render as horizontally scrollable
 * columns of match cards, each showing two sides, scores, and the advancing
 * team (marked in weight + color, never color alone). `onMatchPress` fires with
 * the match and its guarded `[round, match]` indices. Renders an `EmptyState`
 * when there are no matches. Composes `Card`. Token-only.
 */
export declare function TournamentBracket({ rounds, emptyLabel, onMatchPress, style, }: TournamentBracketProps): React.ReactElement;
//# sourceMappingURL=TournamentBracket.d.ts.map