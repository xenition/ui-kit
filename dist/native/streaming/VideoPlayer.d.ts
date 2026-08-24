import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type PlaybackState } from './types';
export type VideoPlayerVariant = 'inline' | 'theater' | 'minimal';
export interface VideoPlayerProps {
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
     * - `theater` — same controls, taller frame (16 / 9 → caller can widen).
     * - `minimal` — center play/pause only, no bottom bar.
     */
    variant?: VideoPlayerVariant;
    /** Hide the controls overlay entirely (e.g. tap-to-reveal handled by app). */
    showControls?: boolean;
    /** Called with the next playing state when the center control is tapped. */
    onPlayToggle?: (next: boolean) => void;
    /** Called with a new position (seconds) when the seek bar changes. */
    onSeek?: (seconds: number) => void;
    /** Called when the fullscreen control is tapped. */
    onFullscreen?: () => void;
    /** Called when the cast control is tapped (shows a `CastButton` when set). */
    onCast?: () => void;
    /** Whether a cast target is connected (reflected by the `CastButton`). */
    casting?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A themed **video player UI shell** — controls overlay only, with **no
 * playback dependency**. Wrap a real player (e.g. `expo-av`'s `<Video>`) behind
 * this and drive it from the emitted intents: `onPlayToggle(next)`,
 * `onSeek(seconds)`, `onFullscreen`, `onCast`. It renders a poster frame, a
 * dark scrim, a center play/pause (or buffering spinner) control, and a bottom
 * bar with time labels + a `Slider` seek bar. The center control's accessible
 * label reflects `state` ("Play" / "Pause"). Every color resolves from
 * `SemanticColors` / neutral ramp tokens — no literal hex.
 */
export declare function VideoPlayer({ posterUrl, title, state, position, duration, live, viewers, aspectRatio, variant, showControls, onPlayToggle, onSeek, onFullscreen, onCast, casting, style, }: VideoPlayerProps): React.ReactElement;
//# sourceMappingURL=VideoPlayer.d.ts.map