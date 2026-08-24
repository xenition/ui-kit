import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type LeaderboardEntry } from './types';
export interface LeaderboardPodiumProps {
    /** Standings; the top 3 (by array order) form the podium. */
    entries: LeaderboardEntry[];
    /** Message shown when there are no entries. */
    emptyLabel?: string;
    /** Called when a podium place is tapped. */
    onPress?: (entry: LeaderboardEntry, rank: number) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A top-3 leaderboard podium — the first three `entries` render as centered
 * columns (2nd · 1st · 3rd) with medals, avatars, names, and scores; the tallest
 * block marks the leader. Uses **guarded indexing** so a 1- or 2-entry list
 * simply omits the missing places, and renders an `EmptyState` when there are
 * none. `onPress(entry, rank)` opens a place. Composes `Card`, `Avatar`, `Icon`.
 * Token-only.
 */
export declare function LeaderboardPodium({ entries, emptyLabel, onPress, style, }: LeaderboardPodiumProps): React.ReactElement;
//# sourceMappingURL=LeaderboardPodium.d.ts.map