import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
export interface StatComparisonProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * A two-team stat comparison — mirrored horizontal bars sharing a center line,
 * one row per metric (possession, shots, …). Each bar is proportional to its
 * share of the pair total; the winning side is emphasised by weight (leading
 * side reads bolder) so ranking survives without relying on color. Home uses
 * the `primary` slot, away the `accent` slot. Empty state built in.
 * Token-only colors; bars are plain `View`s (no chart dependency).
 */
export declare function StatComparison({ homeLabel, awayLabel, rows, homeCrest, awayCrest, emptyLabel, style, }: StatComparisonProps): React.ReactElement;
//# sourceMappingURL=StatComparison.d.ts.map