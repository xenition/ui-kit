import * as React from 'react';
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
export interface ScoreTickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** Match tiles rendered in a horizontal strip. */
    matches: TickerMatch[];
    /** Fires with the tapped match (web parity of native `onSelect`; the DOM
     * `onSelect` handler is intentionally `Omit`ted so it never collides). */
    onSelect?: (match: TickerMatch) => void;
    /** Loading skeleton tile count; when set, matches are ignored. */
    loadingTiles?: number;
    /** Empty-state label. */
    emptyLabel?: string;
}
/**
 * A horizontally-scrolling scoreboard strip — compact per-match tiles for a
 * top-of-screen ticker. Each tile shows both codes, the scoreline, and a status
 * marked by text (plus a `danger` dot for live, never color alone). Handles
 * empty and loading states. Activated via `onSelect`. Token-only colors.
 */
export declare const ScoreTicker: React.ForwardRefExoticComponent<ScoreTickerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ScoreTicker.d.ts.map