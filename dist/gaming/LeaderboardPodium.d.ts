import * as React from 'react';
import { type LeaderboardEntry } from './types';
export interface LeaderboardPodiumProps {
    /** Standings; the top 3 (by array order) form the podium. */
    entries: LeaderboardEntry[];
    /** Message shown when there are no entries. */
    emptyLabel?: string;
    /** Called when a podium place is clicked. */
    onClick?: (entry: LeaderboardEntry, rank: number) => void;
    /** Extra classes on the root. */
    className?: string;
}
/**
 * A top-3 leaderboard podium — the first three `entries` render as centered
 * columns (2nd · 1st · 3rd) with medals, avatars, names, and scores; the tallest
 * block marks the leader. Uses **guarded indexing** so a 1- or 2-entry list
 * simply omits the missing places, and renders an `EmptyState` when there are
 * none. `onClick(entry, rank)` opens a place (a real `<button>`). Composes
 * `Card`, `Avatar`, `Icon`, `EmptyState`. Token-only.
 */
export declare function LeaderboardPodium({ entries, emptyLabel, onClick, className, }: LeaderboardPodiumProps): React.ReactElement;
//# sourceMappingURL=LeaderboardPodium.d.ts.map