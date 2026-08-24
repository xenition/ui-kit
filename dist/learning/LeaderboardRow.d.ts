import * as React from 'react';
export interface LeaderboardRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 1-based rank. */
    rank: number;
    /** Participant name. */
    name?: string;
    /** Avatar image URL (initials fallback from `name`). */
    avatar?: string;
    /** Score / points. */
    score?: number;
    /** Unit label after the score (default "pts"). */
    scoreUnit?: string;
    /** Highlight this row as the current user. */
    highlighted?: boolean;
    /** Renders a muted empty placeholder slot (unfilled rank). */
    empty?: boolean;
    /** Optional short delta/trend note, e.g. "▲2". */
    trend?: string;
    /** Fires when the row is clicked. */
    onSelect?: () => void;
}
/**
 * A leaderboard entry row: rank (medal glyph for the top three), avatar, name,
 * and score. `highlighted` marks the current user; `empty` renders a muted
 * placeholder for an unfilled slot. Interactive rows are a `role="button"`
 * element with Enter/Space activation. Token-only colors (`--xen-*`).
 */
export declare const LeaderboardRow: React.ForwardRefExoticComponent<LeaderboardRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LeaderboardRow.d.ts.map