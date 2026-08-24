import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type MediaTrack, type PlaybackState } from './types';
export type NowPlayingVariant = 'full' | 'compact';
export interface NowPlayingProps {
    /** The track on screen. */
    track: MediaTrack;
    /** Transport state — drives the play control + a11y label. Default `'paused'`. */
    state?: PlaybackState;
    /** Playback position in seconds. */
    position?: number;
    /** Total duration in seconds (falls back to `track.duration`). */
    duration?: number;
    /**
     * Optional waveform peaks in `[0, 1]`. When provided the scrubber is a
     * {@link WaveformScrubber}; otherwise a linear `Slider` is used.
     */
    peaks?: number[];
    /**
     * - `full`    — large hero artwork + full transport (default).
     * - `compact` — smaller artwork, tighter spacing.
     */
    variant?: NowPlayingVariant;
    /** Called with the next playing state when the main control is tapped. */
    onPlayToggle?: (next: boolean) => void;
    /** Called with a new position (seconds) when the scrubber changes. */
    onSeek?: (seconds: number) => void;
    /** Previous-track intent. */
    onPrev?: () => void;
    /** Next-track intent. */
    onNext?: () => void;
    /** Cast intent (shows a `CastButton` when set). */
    onCast?: () => void;
    /** Whether a cast target is connected. */
    casting?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * The full-screen **now-playing** surface — hero artwork, title/artist, a
 * scrubber (linear `Slider`, or a {@link WaveformScrubber} when `peaks` are
 * given) with time labels, and transport controls (prev / play-pause / next)
 * plus an optional cast button. UI shell only: seek/toggle/skip intents come
 * back through callbacks; wire a real engine behind them. The main control's
 * accessible label reflects `state`. Token-only — no literal hex.
 */
export declare function NowPlaying({ track, state, position, duration, peaks, variant, onPlayToggle, onSeek, onPrev, onNext, onCast, casting, style, }: NowPlayingProps): React.ReactElement;
//# sourceMappingURL=NowPlaying.d.ts.map