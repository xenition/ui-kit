import * as React from 'react';
import { type PlaybackState, type StreamEpisode } from './types';
export type EpisodeRowVariant = 'standard' | 'compact';
export interface EpisodeRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
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
    /** Called with the next playing state when the play/pause control is clicked. */
    onPlayToggle?: (next: boolean) => void;
    /** Row click — open episode details (maps native `onPress`). */
    onClick?: (episode: StreamEpisode) => void;
    /** Download intent; shows a trailing download control when set. */
    onDownload?: () => void;
}
/**
 * A podcast / video episode row (web) — artwork, title, show · date · duration
 * meta, an optional resume `Progress` bar (from `episode.progress`), and a
 * play/pause `<button>` whose accessible label reflects the `playing` state.
 * `onClick(episode)` opens details (rendered as a `role="button"` with
 * Enter/Space support). Two variants (`standard` / `compact`). Token-only —
 * no literal hex.
 */
export declare const EpisodeRow: React.ForwardRefExoticComponent<EpisodeRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EpisodeRow.d.ts.map