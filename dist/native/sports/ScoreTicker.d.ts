import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Lifecycle of a ticker item. */
export type TickerStatus = 'live' | 'final' | 'upcoming';
/** One match tile in the ticker. */
export interface TickerMatch {
    /** Stable key. */
    id: string;
    /** Home short name / code. */
    home: string;
    /** Away short name / code. */
    away: string;
    /** Home score (upcoming → omit). */
    homeScore?: number;
    /** Away score (upcoming → omit). */
    awayScore?: number;
    /** Lifecycle. Default `upcoming`. */
    status?: TickerStatus;
    /** Clock / kickoff label. */
    clock?: string;
}
export interface ScoreTickerProps {
    /** Match tiles rendered in a horizontal strip. */
    matches: TickerMatch[];
    /** Fires with the tapped match. */
    onSelect?: (match: TickerMatch) => void;
    /** Loading skeleton tile count; when set, matches are ignored. */
    loadingTiles?: number;
    /** Empty-state label. */
    emptyLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A horizontally-scrolling scoreboard strip — compact per-match tiles for a
 * top-of-screen ticker. Each tile shows both codes, the scoreline, and a
 * status marked by text (plus a `danger` dot for live, never color alone).
 * Handles empty and loading states. Tappable via `onSelect`. Token-only
 * colors.
 */
export declare function ScoreTicker({ matches, onSelect, loadingTiles, emptyLabel, style, }: ScoreTickerProps): React.ReactElement;
//# sourceMappingURL=ScoreTicker.d.ts.map