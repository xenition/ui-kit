import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { PlaybackState, StreamEpisode } from './types';
export type EpisodeRowVariant = 'standard' | 'compact';
export interface EpisodeRowProps {
    /** The episode to render. */
    episode: StreamEpisode;
    /** Whether this episode is currently playing (controlled). */
    playing?: boolean;
    /** Transport state (drives the play control when this row is active). */
    state?: PlaybackState;
    /**
     * - `standard` — artwork + title + show/date/duration + resume bar (default).
     * - `compact`  — no artwork, single title line.
     */
    variant?: EpisodeRowVariant;
    /** Called with the next playing state when the play/pause control is tapped. */
    onPlayToggle?: (next: boolean) => void;
    /** Called when the row body is tapped — open episode details. */
    onPress?: (episode: StreamEpisode) => void;
    /** Download intent; shows a trailing download control when set. */
    onDownload?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A podcast / video episode row — artwork, title, show · date · duration meta,
 * an optional resume {@link Progress} bar (from `episode.progress`), and a
 * play/pause control whose accessible label reflects the `playing` state.
 * `onPress(episode)` opens details. Two variants (`standard` / `compact`).
 * Token-only — no literal hex.
 */
export declare function EpisodeRow({ episode, playing, state, variant, onPlayToggle, onPress, onDownload, style, }: EpisodeRowProps): React.ReactElement;
//# sourceMappingURL=EpisodeRow.d.ts.map