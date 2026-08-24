import * as React from 'react';
import { type PlaybackState } from './types';
export type VideoPlayerVariant = 'inline' | 'theater' | 'minimal';
export interface VideoPlayerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onSeek'> {
    /** Poster / thumbnail image shown behind the controls. */
    posterUrl?: string;
    /** Title overlaid on the scrim (top-left). */
    title?: string;
    /** Transport state — drives the center control + a11y label. Default `'paused'`. */
    state?: PlaybackState;
    /** Playback position in seconds. */
    position?: number;
    /** Total duration in seconds; when omitted the seek bar is hidden. */
    duration?: number;
    /** Live stream — shows a `LiveBadge` and hides the seek bar. */
    live?: boolean;
    /** Concurrent viewers, passed to the `LiveBadge` when `live`. */
    viewers?: number;
    /** Frame aspect ratio (default 16 / 9). */
    aspectRatio?: number;
    /**
     * - `inline`  — full control bar under the frame (default).
     * - `theater` — same controls, taller frame.
     * - `minimal` — center play/pause only, no bottom bar.
     */
    variant?: VideoPlayerVariant;
    /** Hide the controls overlay entirely (e.g. tap-to-reveal handled by app). */
    showControls?: boolean;
    /** Called with the next playing state when the center control is clicked. */
    onPlayToggle?: (next: boolean) => void;
    /** Called with a new position (seconds) when the seek bar changes. */
    onSeek?: (seconds: number) => void;
    /** Called when the fullscreen control is clicked. */
    onFullscreen?: () => void;
    /** Called when the cast control is clicked (shows a `CastButton` when set). */
    onCast?: () => void;
    /** Whether a cast target is connected (reflected by the `CastButton`). */
    casting?: boolean;
}
/**
 * A themed **video player UI shell** (web) — controls overlay only, with **no
 * playback dependency**. Wrap a real `<video>` behind this and drive it from
 * the emitted intents: `onPlayToggle(next)`, `onSeek(seconds)`, `onFullscreen`,
 * `onCast`. Renders a poster frame, a dark scrim, a center play/pause (or a
 * buffering `Spinner`) control, and a bottom bar with time labels + a `Slider`
 * seek bar. The center control's accessible label reflects `state`
 * ("Play" / "Pause"). Every color resolves from `--xen-*` tokens — no literal hex.
 */
export declare const VideoPlayer: React.ForwardRefExoticComponent<VideoPlayerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VideoPlayer.d.ts.map