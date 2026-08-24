/**
 * Shared data shapes for the `@xenition/ui/streaming` module — the web
 * (React DOM) parity of `native/streaming`. These are plain data records (no
 * colors, no styling, no DOM) that the streaming components accept as props.
 * Modelling a track, episode, show, or channel once lets an app hand the same
 * objects to `NowPlaying`, `MiniPlayer`, `QueueList`, `EpisodeRow`, etc.
 *
 * NB: like their native counterparts these components are **UI shells only** —
 * none of them import a playback engine. Position/duration are passed in and
 * seek/toggle intents come back out via callbacks, so an app can wire an
 * `<audio>`/`<video>` element (or any player) behind them.
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
export function formatTime(totalSeconds?: number): string {
  if (totalSeconds == null || !Number.isFinite(totalSeconds) || totalSeconds < 0) {
    return '0:00';
  }
  const whole = Math.floor(totalSeconds);
  const s = whole % 60;
  const m = Math.floor(whole / 60) % 60;
  const h = Math.floor(whole / 3600);
  const ss = String(s).padStart(2, '0');
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${ss}`;
  return `${m}:${ss}`;
}

/** Compact viewer/listener count, e.g. `1234` → `'1.2K'`, `2_000_000` → `'2M'`. */
export function formatCount(n?: number): string {
  if (n == null || !Number.isFinite(n) || n < 0) return '0';
  if (n < 1000) return String(n);
  if (n < 1_000_000) return `${(n / 1000).toFixed(n < 10_000 ? 1 : 0)}K`;
  return `${(n / 1_000_000).toFixed(n < 10_000_000 ? 1 : 0)}M`;
}

/** Clamp a number into `[0, 1]`. Shared by the scrubber / progress shells. */
export function clamp01(n: number): number {
  return n < 0 ? 0 : n > 1 ? 1 : n;
}
