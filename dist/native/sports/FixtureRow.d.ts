import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Fixture lifecycle. */
export type FixtureStatus = 'scheduled' | 'live' | 'final' | 'postponed';
export interface FixtureRowProps {
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
    /** Fires on tap. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A compact one-line fixture — home vs away with a leading center column that
 * shows either the kickoff time, the live scoreline, or the final result. The
 * status is conveyed by text + glyph (a `danger` dot only reinforces "LIVE").
 * Built for tight lists (schedules, results). Tappable via `onPress`.
 * Token-only colors.
 */
export declare function FixtureRow({ home, away, homeCrest, awayCrest, homeScore, awayScore, kickoffLabel, minute, meta, status, highlighted, onPress, style, }: FixtureRowProps): React.ReactElement;
//# sourceMappingURL=FixtureRow.d.ts.map