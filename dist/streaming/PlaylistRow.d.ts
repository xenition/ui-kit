import * as React from 'react';
import { type MediaTrack, type PlaybackState } from './types';
export type PlaylistRowVariant = 'standard' | 'numbered' | 'compact';
export interface PlaylistRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** The track this row represents. */
    track: MediaTrack;
    /** 0-based position; shown as `index + 1` in the `numbered` variant. */
    index?: number;
    /** Whether this is the active/selected track (tinted + shown as "current"). */
    active?: boolean;
    /** Transport state of the active track (only meaningful when `active`). */
    state?: PlaybackState;
    /**
     * - `standard` — artwork + title/artist + duration (default).
     * - `numbered` — leading track number instead of artwork.
     * - `compact`  — tighter single-line row.
     */
    variant?: PlaylistRowVariant;
    /** Row click — select/play this track (maps native `onPress`). */
    onClick?: (track: MediaTrack, index?: number) => void;
    /** Optional play/pause control; when set, shows a trailing toggle. */
    onPlayToggle?: (next: boolean) => void;
    /** Trailing overflow / menu intent. */
    onMore?: () => void;
}
/**
 * A single track row for playlists / albums / queues (web) — artwork (or a
 * track number), title + artist, a duration label, and an active-state
 * indicator. `onClick(track, index)` selects the row (rendered as a
 * `role="button"` with Enter/Space support); an optional `onPlayToggle` renders
 * a trailing play/pause `<button>` (stops propagation) whose accessible label
 * reflects `state`. When `active`, the title is tinted `primary`. Token-only —
 * no literal hex.
 */
export declare const PlaylistRow: React.ForwardRefExoticComponent<PlaylistRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PlaylistRow.d.ts.map