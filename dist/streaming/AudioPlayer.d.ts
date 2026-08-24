import * as React from 'react';
import { type MediaTrack, type PlaybackState } from './types';
export type AudioPlayerVariant = 'card' | 'compact' | 'expanded';
export interface AudioPlayerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSeek'> {
    /** The track being played. */
    track: MediaTrack;
    /** Transport state — drives the play control + a11y label. Default `'paused'`. */
    state?: PlaybackState;
    /** Playback position in seconds. */
    position?: number;
    /** Total duration in seconds (falls back to `track.duration`). */
    duration?: number;
    /**
     * - `card`     — artwork + meta + transport + seek bar (default).
     * - `compact`  — single row, no seek bar.
     * - `expanded` — larger artwork, adds prev/next transport.
     */
    variant?: AudioPlayerVariant;
    /** Called with the next playing state when play/pause is clicked. */
    onPlayToggle?: (next: boolean) => void;
    /** Called with a new position (seconds) when the seek bar changes. */
    onSeek?: (seconds: number) => void;
    /** Previous-track intent (shown in `expanded`). */
    onPrev?: () => void;
    /** Next-track intent (shown in `expanded`). */
    onNext?: () => void;
}
/**
 * A themed **audio player UI shell** (web) — a card/row surface for a single
 * track with **no playback dependency**. Drive a real `<audio>` element from
 * the emitted intents: `onPlayToggle(next)`, `onSeek(seconds)`, `onPrev`,
 * `onNext`. Renders artwork, title/artist, a `Slider` seek bar with time
 * labels, and transport controls whose play/pause label reflects `state`
 * (buffering swaps the play button for a `Spinner`). Token-only — no literal hex.
 */
export declare const AudioPlayer: React.ForwardRefExoticComponent<AudioPlayerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AudioPlayer.d.ts.map