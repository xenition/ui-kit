import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { PodcastEpisode } from './types';
export type PodcastRowVariant = 'standard' | 'compact';
export interface PodcastRowProps {
    /** The episode to render. */
    episode: PodcastEpisode;
    /** Whether this episode is currently playing (controlled). */
    playing?: boolean;
    /** Called with the next playing state when the play/pause control is tapped. */
    onPlayToggle?: (next: boolean) => void;
    /** Called when the row itself (not the play button) is tapped — open details. */
    onPress?: (episode: PodcastEpisode) => void;
    /**
     * - `standard` — artwork + title + show + duration (default).
     * - `compact`  — smaller artwork, single title line.
     */
    variant?: PodcastRowVariant;
    style?: StyleProp<ViewStyle>;
}
/**
 * A podcast / audio episode row — artwork, title, show, duration, and a
 * play/pause control. The play button is controlled via `playing` +
 * `onPlayToggle(next)`; tapping the rest of the row fires `onPress(episode)`.
 * Two variants (`standard` / `compact`). All colors come from `SemanticColors`;
 * no literal hex.
 */
export declare function PodcastRow({ episode, playing, onPlayToggle, onPress, variant, style, }: PodcastRowProps): React.ReactElement;
//# sourceMappingURL=PodcastRow.d.ts.map