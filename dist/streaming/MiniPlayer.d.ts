import * as React from 'react';
import { type MediaTrack, type PlaybackState } from './types';
export type MiniPlayerVariant = 'bar' | 'floating';
export interface MiniPlayerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** The track shown in the docked mini bar. */
    track: MediaTrack;
    /** Transport state — drives the play control + a11y label. Default `'paused'`. */
    state?: PlaybackState;
    /** Played fraction in `[0, 1]` for the thin top progress line. */
    progress?: number;
    /**
     * - `bar`      — full-width docked bar with a square edge (default).
     * - `floating` — inset rounded card that hovers above content.
     */
    variant?: MiniPlayerVariant;
    /** Called with the next playing state when the play/pause control is clicked. */
    onPlayToggle?: (next: boolean) => void;
    /** Next-track intent (shows a next control when set). */
    onNext?: () => void;
    /** Body click — expand to the full `NowPlaying` (maps native `onPress`). */
    onClick?: (track: MediaTrack) => void;
}
/**
 * A docked **mini player** bar (web) — the collapsed now-playing surface that
 * sits above a bottom nav. UI shell only: `onPlayToggle(next)` / `onNext` report
 * intent and `onClick(track)` expands to the full player. When `onClick` is set
 * the body is a `role="button"` with Enter/Space keyboard support, while the
 * play/next controls are real `<button>`s that stop propagation. A thin
 * `primary` progress line rides the top edge; the play control's accessible
 * label reflects `state`. Token-only — no literal hex.
 */
export declare const MiniPlayer: React.ForwardRefExoticComponent<MiniPlayerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MiniPlayer.d.ts.map