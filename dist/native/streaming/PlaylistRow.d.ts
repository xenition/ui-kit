import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type MediaTrack, type PlaybackState } from './types';
export type PlaylistRowVariant = 'standard' | 'numbered' | 'compact';
export interface PlaylistRowProps {
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
    /** Called when the row is tapped — select/play this track. */
    onPress?: (track: MediaTrack, index?: number) => void;
    /** Optional play/pause control; when set, shows a trailing toggle. */
    onPlayToggle?: (next: boolean) => void;
    /** Trailing overflow / menu intent. */
    onMore?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single track row for playlists / albums / queues — artwork (or a track
 * number), title + artist, a duration label, and an active-state indicator.
 * `onPress(track, index)` selects the row; an optional `onPlayToggle` renders a
 * trailing play/pause whose accessible label reflects `state`. When `active`,
 * the title is tinted `primary`. Token-only — no literal hex.
 */
export declare function PlaylistRow({ track, index, active, state, variant, onPress, onPlayToggle, onMore, style, }: PlaylistRowProps): React.ReactElement;
//# sourceMappingURL=PlaylistRow.d.ts.map