import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { MediaTrack, PlaybackState } from './types';
/**
 * Props for {@link FullScreenPlayer} — the immersive, full-screen now-playing
 * surface (native). A presentational shell only: it takes shaped track data plus
 * transport callbacks and never touches a playback engine. Position/duration are
 * passed in; seek/toggle intents come back out.
 */
export interface FullScreenPlayerProps {
    /** The track on the deck (title, artist, artwork, optional duration). */
    track: MediaTrack;
    /** Transport state reflected in the play control + its a11y state. */
    state?: PlaybackState;
    /** Current playback position in **seconds**. */
    position?: number;
    /** Total length in **seconds**; falls back to `track.duration`. */
    duration?: number;
    /** Precomputed waveform amplitudes in `[0, 1]`; renders a {@link WaveformScrubber} instead of a linear slider. */
    peaks?: number[];
    /** Fires with the desired play state when the big play/pause control is pressed. */
    onPlayToggle?: (playing: boolean) => void;
    /** Fires with the new position in **seconds** when the scrubber is moved. */
    onSeek?: (seconds: number) => void;
    /** Fires when the previous-track control is pressed. */
    onPrev?: () => void;
    /** Fires when the next-track control is pressed. */
    onNext?: () => void;
    /** Fires when the close/dismiss control is pressed; hidden when unset. */
    onClose?: () => void;
    /** Whether the track is favorited (controlled); tints the favorite tile. */
    favorite?: boolean;
    /** Fires with the desired favorite state when the favorite tile is pressed; hidden when unset. */
    onFavorite?: (favorite: boolean) => void;
    /** Fires when the queue tile is pressed; hidden when unset. */
    onQueue?: () => void;
    /** Fires when the cast tile is pressed; hidden when unset. */
    onCast?: () => void;
    /** Whether a cast target is currently connected (controlled). */
    casting?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * FullScreenPlayer — the **V4 "spotlight"** peak moment (native). The immersive,
 * artwork-forward full-screen now-playing surface: a full brand-gradient ground,
 * a big centered cover in a frosted frame, title/artist in near-white ink, an
 * on-gradient scrubber (linear `Slider`, or a {@link WaveformScrubber} when
 * `peaks` are given), a large near-white round play control framed by prev/next,
 * and secondary glassy tiles (favorite / queue / cast). Token-only colors via
 * `useXenitionTheme()` + `spotlight*(tokens.ramps)` on `GradientSurface` — no
 * literals; dark-mode safe.
 */
export declare function FullScreenPlayer({ track, state, position, duration, peaks, onPlayToggle, onSeek, onPrev, onNext, onClose, favorite, onFavorite, onQueue, onCast, casting, style, }: FullScreenPlayerProps): React.ReactElement;
//# sourceMappingURL=FullScreenPlayer.d.ts.map