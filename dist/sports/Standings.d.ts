import * as React from 'react';
/** Form result for the trailing streak column. */
export type StandingsForm = 'W' | 'D' | 'L';
/** One league-table row. */
export interface StandingsRow {
    /** Stable key / team id. */
    id: string;
    /** Team display name. */
    team: string;
    /** Crest glyph or emoji. */
    crest?: string;
    /** Played. */
    played: number;
    /** Won. */
    won: number;
    /** Drawn. */
    drawn: number;
    /** Lost. */
    lost: number;
    /** Points. */
    points: number;
    /** Goal difference (rendered signed). */
    goalDiff?: number;
    /** Recent form, oldest→newest (max 5 shown). */
    form?: StandingsForm[];
}
/** Highlight band a position belongs to (promotion / relegation etc.). */
export interface StandingsZone {
    /** 1-based inclusive start position. */
    from: number;
    /** 1-based inclusive end position. */
    to: number;
    /** Semantic accent — `success` (promotion) / `danger` (relegation) / `primary`. */
    tone: 'success' | 'danger' | 'primary';
    /** Announced zone name. */
    label: string;
}
export interface StandingsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** Ordered rows (top of table first). */
    rows: StandingsRow[];
    /** `full` shows W/D/L + GD; `compact` shows P and Pts only. Default `full`. */
    variant?: 'full' | 'compact';
    /** Show the trailing form streak column (full variant only). */
    showForm?: boolean;
    /** Position bands drawn as a leading accent bar. */
    zones?: StandingsZone[];
    /** Highlight this team id. */
    activeId?: string;
    /** Loading skeleton row count; when set, data is ignored. */
    loadingRows?: number;
    /** Fires with the tapped row (web parity of native `onSelectTeam`). */
    onSelectTeam?: (row: StandingsRow) => void;
    /** Rendered when there are no rows. */
    emptyLabel?: string;
}
/**
 * A league table — the classic standings grid rendered as a semantic `<table>`.
 * Rows are selectable (`onSelectTeam`, keyboard-activated); `zones` paint
 * promotion / relegation bands as a leading accent bar reinforced by the row's
 * a11y label, so meaning never rests on color alone. Empty (via the shared
 * `EmptyState`) and loading states are built in. `compact` trims to Played +
 * Points for narrow layouts. Token-only colors.
 */
export declare const Standings: React.ForwardRefExoticComponent<StandingsProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Standings.d.ts.map