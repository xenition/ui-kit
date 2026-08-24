import * as React from 'react';
/** One head-to-head stat row. */
export interface StatComparisonRow {
    /** Metric label (e.g. `Possession`). */
    label: string;
    /** Home value. */
    home: number;
    /** Away value. */
    away: number;
    /** Suffix appended to displayed values (e.g. `%`). */
    suffix?: string;
    /** `higher` wins (default) or `lower` wins (e.g. fouls) — drives emphasis. */
    better?: 'higher' | 'lower';
}
export interface StatComparisonProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Home team name (left). */
    homeLabel: string;
    /** Away team name (right). */
    awayLabel: string;
    /** Comparison rows. */
    rows: StatComparisonRow[];
    /** Home crest glyph. */
    homeCrest?: string;
    /** Away crest glyph. */
    awayCrest?: string;
    /** Empty-state label. */
    emptyLabel?: string;
}
/**
 * A two-team stat comparison — mirrored horizontal bars sharing a center line,
 * one row per metric (possession, shots, …). Each bar is proportional to its
 * share of the pair total; the winning side is emphasised by weight (leading
 * side reads bolder) so ranking survives without relying on color. Home uses
 * the `primary` slot, away the `accent` slot. Empty state built in. Token-only
 * colors; bars are plain `div`s (no chart dependency).
 */
export declare const StatComparison: React.ForwardRefExoticComponent<StatComparisonProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StatComparison.d.ts.map