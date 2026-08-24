import * as React from 'react';
import { type PlaylistRowVariant } from './PlaylistRow';
import type { MediaTrack, PlaybackState } from './types';
export interface QueueListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect' | 'title'> {
    /** Ordered upcoming tracks. An empty array renders the empty state. */
    tracks: MediaTrack[];
    /** Id of the currently-playing track (highlighted as active). */
    nowPlayingId?: string;
    /** Transport state of the now-playing track. */
    state?: PlaybackState;
    /** Optional header label above the list (default `'Up Next'`). */
    title?: string;
    /** Row variant passed through to each {@link PlaylistRow}. */
    rowVariant?: PlaylistRowVariant;
    /** Called when a queue row is clicked — jump to that track. */
    onSelect?: (track: MediaTrack, index: number) => void;
    /** Per-row overflow / remove intent. */
    onRemove?: (track: MediaTrack, index: number) => void;
    /** Copy for the empty state title. */
    emptyLabel?: string;
}
/**
 * The playback **queue** (web) — an ordered list of upcoming tracks built from
 * {@link PlaylistRow}s. The row matching `nowPlayingId` is marked active;
 * `onSelect(track, index)` jumps to a track and `onRemove` handles the row
 * overflow. When `tracks` is empty it renders an `EmptyState` (from `commerce`)
 * instead of a bare list. Indexing is guarded — the active match is by id, never
 * by position. Token-only — no literal hex.
 */
export declare const QueueList: React.ForwardRefExoticComponent<QueueListProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=QueueList.d.ts.map