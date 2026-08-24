import * as React from 'react';
import type { PodcastEpisode } from './types';
export type PodcastRowVariant = 'standard' | 'compact';
export interface PodcastRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** The episode to render. */
    episode: PodcastEpisode;
    /** Whether this episode is currently playing (controlled). */
    playing?: boolean;
    /** Called with the next playing state when the play/pause control is clicked. */
    onPlayToggle?: (next: boolean) => void;
    /** Called when the row itself (not the play button) is clicked — web mirror of native `onPress`. */
    onClick?: (episode: PodcastEpisode) => void;
    /**
     * - `standard` — artwork + title + show + duration (default).
     * - `compact`  — smaller artwork, single title line.
     */
    variant?: PodcastRowVariant;
}
/**
 * A podcast / audio episode row — artwork, title, show, duration, and a
 * play/pause control. Web (React DOM) mirror of the native `PodcastRow`. The
 * play button is controlled via `playing` + `onPlayToggle(next)`; clicking the
 * rest of the row fires `onClick(episode)`. Two variants (`standard` /
 * `compact`). All colors come from `--xen-*` token classes.
 */
export declare const PodcastRow: React.ForwardRefExoticComponent<PodcastRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PodcastRow.d.ts.map