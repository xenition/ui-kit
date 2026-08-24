import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** One competitor slot in a bracket match. */
export interface BracketSlot {
    /** Competitor name; `undefined`/empty renders a "TBD" placeholder. */
    name?: string;
    /** Score / result (optional). */
    score?: number;
    /** Marks the advancing side. */
    winner?: boolean;
}
/** A single knockout tie. */
export interface BracketMatch {
    /** Stable key. */
    id: string;
    /** Top slot. */
    top: BracketSlot;
    /** Bottom slot. */
    bottom: BracketSlot;
}
/** A bracket round (e.g. Quarter-finals). */
export interface BracketRound {
    /** Round title. */
    title: string;
    /** Matches in the round. */
    matches: BracketMatch[];
}
export interface BracketViewProps {
    /** Rounds left→right (earliest first). */
    rounds: BracketRound[];
    /** Fires with the tapped match. */
    onSelectMatch?: (match: BracketMatch, roundIndex: number) => void;
    /** Empty-state label. */
    emptyLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A knockout tournament bracket — a STATIC, dependency-free layout built from
 * horizontally-scrolling round columns of `View`-based match tiles. No SVG /
 * canvas / native dep; connectors are implied by column layout. Each tie shows
 * both competitors (TBD placeholder when unknown) and marks the winner by
 * weight + a check glyph, not color alone. Tappable via `onSelectMatch`.
 * Token-only colors.
 */
export declare function BracketView({ rounds, onSelectMatch, emptyLabel, style, }: BracketViewProps): React.ReactElement;
//# sourceMappingURL=BracketView.d.ts.map