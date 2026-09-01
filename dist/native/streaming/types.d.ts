/**
 * Shared data shapes for the `@xenition/ui/native/streaming` module — the
 * video / audio / podcast / music building blocks. These are plain data
 * records (no colors, no styling) that the streaming components accept as
 * props. Modelling a track, episode, show, or channel once lets an app hand
 * the same objects to `NowPlaying`, `MiniPlayer`, `QueueList`, `EpisodeRow`,
 * etc.
 *
 * NB: these components are **UI shells only** — none of them import a playback
 * engine. Position/duration are passed in and seek/toggle intents come back
 * out via callbacks, so an app can wire `expo-av` (or any player) behind them.
 */
/** Transport state a player surface reflects in its controls + a11y labels. */
export type PlaybackState = 'idle' | 'playing' | 'paused' | 'buffering';
/**
 * One audio/music item — a song or track. `duration` is in **seconds** so the
 * scrub/progress math is exact; components render human labels via
 * {@link formatTime}. `id` must be stable (used as a list key).
 */
export interface MediaTrack {
    /** Stable unique id (used as the React list key). */
    id: string;
    /** Track / song title. */
    title: string;
    /** Performing artist. */
    artist?: string;
    /** Album / collection name. */
    album?: string;
    /** Cover artwork URL; components fall back to a glyph placeholder when absent. */
    artworkUrl?: string;
    /** Total length in seconds. */
    duration?: number;
}
/**
 * One podcast / video episode. `duration` here is a pre-formatted human string
 * (e.g. `'42 min'`) since episode lists rarely need scrub math; `progress` is a
 * played fraction in `[0, 1]` for a resume bar.
 */
export interface StreamEpisode {
    /** Stable unique id. */
    id: string;
    /** Episode title. */
    title: string;
    /** Show / series name. */
    show?: string;
    /** Cover artwork URL. */
    artworkUrl?: string;
    /** Human-readable duration, e.g. `'42 min'`. */
    duration?: string;
    /** Publish date, rendered as given, e.g. `'Aug 24'`. */
    date?: string;
    /** One-line summary. */
    description?: string;
    /** Listened fraction in `[0, 1]` for a resume/progress bar. */
    progress?: number;
}
/** A podcast show / series — the catalog-level record above its episodes. */
export interface StreamPodcast {
    /** Stable unique id. */
    id: string;
    /** Show title. */
    title: string;
    /** Publisher / network. */
    publisher?: string;
    /** Cover artwork URL. */
    artworkUrl?: string;
    /** Number of episodes in the feed. */
    episodeCount?: number;
    /** Short show description. */
    description?: string;
}
/** A live/streaming channel or creator. */
export interface StreamChannel {
    /** Stable unique id. */
    id: string;
    /** Channel / creator name. */
    name: string;
    /** Avatar image URL; components fall back to initials when absent. */
    avatarUrl?: string;
    /** Category / genre label, e.g. `'Music'`. */
    category?: string;
    /** Whether the channel is broadcasting live right now. */
    live?: boolean;
    /** Concurrent viewer / listener count (shown for live channels). */
    viewers?: number;
}
/**
 * Format a duration in seconds as `m:ss` (or `h:mm:ss` past an hour). Guards
 * against nullish / non-finite / negative input so a shell never renders `NaN`.
 */
export declare function formatTime(totalSeconds?: number): string;
/** Clamp a number into the `[0, 1]` range (guards scrub/progress fractions). */
export declare function clamp01(n: number): number;
/** Compact viewer/listener count, e.g. `1234` → `'1.2K'`, `2_000_000` → `'2M'`. */
export declare function formatCount(n?: number): string;
//# sourceMappingURL=types.d.ts.map