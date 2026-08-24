/**
 * `@xenition/ui/streaming` — web (React DOM) building blocks for video, audio,
 * podcast, and music apps. The DOM parity of `native/streaming`: player shells
 * (`VideoPlayer`, `AudioPlayer`, `MiniPlayer`, `NowPlaying`), library rows &
 * cards (`PlaylistRow`, `PodcastCard`, `EpisodeRow`, `ChannelCard`), a
 * click/keyboard-to-seek `WaveformScrubber`, a `QueueList`, and live/cast
 * affordances (`LiveBadge`, `CastButton`).
 *
 * Every player is a **UI shell with no playback dependency**: position/duration
 * come in as props and seek/toggle/skip intents go out via callbacks, so an app
 * wires a real engine (an `<audio>`/`<video>` element) behind them. All
 * components compose the web `primitives` (+ `EmptyState` from `commerce`,
 * `MediaFigure` from `media`) and style exclusively from the `--xen-*` theme
 * tokens via Tailwind token classes — no literal colors. `forwardRef` is
 * exposed wherever a DOM root exists.
 */

// ── shared data shapes + helpers ──────────────────────────────────────
export type {
  PlaybackState,
  MediaTrack,
  StreamEpisode,
  StreamPodcast,
  StreamChannel,
} from './types';
export { formatTime, formatCount } from './types';

// ── player shells ─────────────────────────────────────────────────────
export { VideoPlayer } from './VideoPlayer';
export type { VideoPlayerProps, VideoPlayerVariant } from './VideoPlayer';
export { AudioPlayer } from './AudioPlayer';
export type { AudioPlayerProps, AudioPlayerVariant } from './AudioPlayer';
export { MiniPlayer } from './MiniPlayer';
export type { MiniPlayerProps, MiniPlayerVariant } from './MiniPlayer';
export { MiniPlayerV2 } from './MiniPlayerV2';
export type { MiniPlayerV2Props } from './MiniPlayerV2';
export { MiniPlayerV3 } from './MiniPlayerV3';
export type { MiniPlayerV3Props } from './MiniPlayerV3';
export { NowPlaying } from './NowPlaying';
export type { NowPlayingProps, NowPlayingVariant } from './NowPlaying';
export { NowPlayingV2 } from './NowPlayingV2';
export type { NowPlayingV2Props } from './NowPlayingV2';
export { NowPlayingV3 } from './NowPlayingV3';
export type { NowPlayingV3Props } from './NowPlayingV3';

// ── scrubbing ─────────────────────────────────────────────────────────
export { WaveformScrubber } from './WaveformScrubber';
export type { WaveformScrubberProps, WaveformScrubberVariant } from './WaveformScrubber';

// ── library rows & cards ──────────────────────────────────────────────
export { PlaylistRow } from './PlaylistRow';
export type { PlaylistRowProps, PlaylistRowVariant } from './PlaylistRow';
export { QueueList } from './QueueList';
export type { QueueListProps } from './QueueList';
export { PodcastCard } from './PodcastCard';
export type { PodcastCardProps, PodcastCardVariant } from './PodcastCard';
export { PodcastCardV2 } from './PodcastCardV2';
export type { PodcastCardV2Props } from './PodcastCardV2';
export { PodcastCardV3 } from './PodcastCardV3';
export type { PodcastCardV3Props } from './PodcastCardV3';
export { EpisodeRow } from './EpisodeRow';
export type { EpisodeRowProps, EpisodeRowVariant } from './EpisodeRow';
export { EpisodeRowV2 } from './EpisodeRowV2';
export type { EpisodeRowV2Props } from './EpisodeRowV2';
export { EpisodeRowV3 } from './EpisodeRowV3';
export type { EpisodeRowV3Props } from './EpisodeRowV3';
export { ChannelCard } from './ChannelCard';
export type { ChannelCardProps, ChannelCardVariant } from './ChannelCard';

// ── live & cast affordances ───────────────────────────────────────────
export { LiveBadge } from './LiveBadge';
export type { LiveBadgeProps, LiveBadgeVariant } from './LiveBadge';
export { CastButton } from './CastButton';
export type { CastButtonProps, CastButtonVariant, CastButtonSize } from './CastButton';
