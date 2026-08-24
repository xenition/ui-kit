import * as React from 'react';
/** Fixture lifecycle. */
export type FixtureStatus = 'scheduled' | 'live' | 'final' | 'postponed';
export interface FixtureRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Home team name. */
    home: string;
    /** Away team name. */
    away: string;
    /** Home crest glyph/emoji. */
    homeCrest?: string;
    /** Away crest glyph/emoji. */
    awayCrest?: string;
    /** Home score (scheduled → omit). */
    homeScore?: number;
    /** Away score (scheduled → omit). */
    awayScore?: number;
    /** Kickoff / date label for scheduled fixtures (e.g. `Sat 15:00`). */
    kickoffLabel?: string;
    /** Live clock label (e.g. `73'`). */
    minute?: string;
    /** Competition / venue caption. */
    meta?: string;
    /** Lifecycle. Default `scheduled`. */
    status?: FixtureStatus;
    /** Highlight (e.g. favourite team involved). */
    highlighted?: boolean;
    /** Fires on activation (web parity of native `onPress`). */
    onClick?: () => void;
}
/**
 * A compact one-line fixture — home vs away with a center column showing either
 * the kickoff time, the live scoreline, or the final result. The status is
 * conveyed by text (a `danger` dot only reinforces "LIVE"), never color alone.
 * Built for tight lists (schedules, results). Activated via `onClick`.
 * Token-only colors.
 */
export declare const FixtureRow: React.ForwardRefExoticComponent<FixtureRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FixtureRow.d.ts.map