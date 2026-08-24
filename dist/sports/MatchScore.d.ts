import * as React from 'react';
/** One side of a fixture. `score` is omitted for upcoming matches. */
export interface MatchScoreTeam {
    /** Team display name. */
    name: string;
    /** Short code shown on narrow layouts (e.g. `ARS`). Falls back to `name`. */
    short?: string;
    /** Crest/logo glyph or emoji (the kit ships no image fetch). */
    crest?: string;
    /** Goals / points; omit for an upcoming match. */
    score?: number;
}
/** Lifecycle of the fixture — drives the status chip (never color alone). */
export type MatchScoreStatus = 'live' | 'final' | 'upcoming' | 'halftime' | 'postponed';
export interface MatchScoreProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Home side. */
    home: MatchScoreTeam;
    /** Away side. */
    away: MatchScoreTeam;
    /** Match lifecycle. */
    status: MatchScoreStatus;
    /** Live clock label (e.g. `67'`) — shown when `status === 'live'`. */
    minute?: string;
    /** Kickoff label for upcoming fixtures (e.g. `Sat 15:00`). */
    kickoffLabel?: string;
    /** Competition / round caption above the teams. */
    competition?: string;
    /** Emphasise the layout with a larger score (feature/hero variant). */
    variant?: 'row' | 'feature';
    /** Show a skeleton placeholder instead of data. */
    loading?: boolean;
    /** Fires when the card is clicked/activated (web parity of native `onPress`). */
    onClick?: () => void;
}
/**
 * A single fixture's scoreline — the web anchor of the sports module. Renders
 * both teams, their scores, and a status chip that distinguishes live / final /
 * upcoming by **text + glyph**, not color alone (a `danger` dot merely
 * reinforces the "LIVE" label). Presentational only: shaped data plus an
 * optional `onClick`; nothing fetches. `loading` swaps in a token skeleton. All
 * colors come from `--xen-*` token classes — no literals.
 */
export declare const MatchScore: React.ForwardRefExoticComponent<MatchScoreProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MatchScore.d.ts.map