import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Kind of match event — drives the glyph + accessible prefix. */
export type MatchEventKind = 'goal' | 'own-goal' | 'penalty' | 'yellow' | 'red' | 'sub' | 'var';
/** A single timeline event, attributed to a side. */
export interface MatchEvent {
    /** Stable key. */
    id: string;
    /** Clock label (e.g. `23'`, `90+4'`). */
    minute: string;
    /** Event kind. */
    kind: MatchEventKind;
    /** Which team the event belongs to. */
    side: 'home' | 'away';
    /** Primary label (e.g. scorer). */
    label: string;
    /** Secondary detail (e.g. assist, sub off). */
    detail?: string;
}
export interface MatchTimelineProps {
    /** Home team name (left rail). */
    homeLabel?: string;
    /** Away team name (right rail). */
    awayLabel?: string;
    /** Events, chronological (earliest first recommended). */
    events: MatchEvent[];
    /** Empty-state label. */
    emptyLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A match event timeline — a vertical spine with a minute marker per event and
 * the event pushed to the home (left) or away (right) side. Each event carries
 * a glyph and an accessible kind prefix, so goals, cards, and subs are legible
 * without relying on color. Empty state built in. Presentational; pass shaped
 * `events`. Token-only colors; the spine is a plain `View`.
 */
export declare function MatchTimeline({ homeLabel, awayLabel, events, emptyLabel, style, }: MatchTimelineProps): React.ReactElement;
//# sourceMappingURL=MatchTimeline.d.ts.map