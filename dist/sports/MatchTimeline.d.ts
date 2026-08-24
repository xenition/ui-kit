import * as React from 'react';
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
export interface MatchTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Home team name (left rail). */
    homeLabel?: string;
    /** Away team name (right rail). */
    awayLabel?: string;
    /** Events, chronological (earliest first recommended). */
    events: MatchEvent[];
    /** Empty-state label. */
    emptyLabel?: string;
}
/**
 * A match event timeline — a vertical spine with a minute marker per event and
 * the event pushed to the home (left) or away (right) side. Each event carries
 * a glyph and an accessible kind prefix, so goals, cards, and subs are legible
 * without relying on color. Empty state built in. Presentational; pass shaped
 * `events`. Token-only colors; the marker is a plain `div`.
 */
export declare const MatchTimeline: React.ForwardRefExoticComponent<MatchTimelineProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MatchTimeline.d.ts.map