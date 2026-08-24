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
export type { PlaybackState, MediaTrack, StreamEpisode, StreamPodcast, StreamChannel, } from './types';
export { formatTime, formatCount } from './types';
export { VideoPlayer } from './VideoPlayer';
export type { VideoPlayerProps, VideoPlayerVariant } from './VideoPlayer';
export { AudioPlayer } from './AudioPlayer';
export type { AudioPlayerProps, AudioPlayerVariant } from './AudioPlayer';
export { MiniPlayer } from './MiniPlayer';
export type { MiniPlayerProps, MiniPlayerVariant } from './MiniPlayer';
export { NowPlaying } from './NowPlaying';
export type { NowPlayingProps, NowPlayingVariant } from './NowPlaying';
export { WaveformScrubber } from './WaveformScrubber';
export type { WaveformScrubberProps, WaveformScrubberVariant } from './WaveformScrubber';
export { PlaylistRow } from './PlaylistRow';
export type { PlaylistRowProps, PlaylistRowVariant } from './PlaylistRow';
export { QueueList } from './QueueList';
export type { QueueListProps } from './QueueList';
export { PodcastCard } from './PodcastCard';
export type { PodcastCardProps, PodcastCardVariant } from './PodcastCard';
export { EpisodeRow } from './EpisodeRow';
export type { EpisodeRowProps, EpisodeRowVariant } from './EpisodeRow';
export { ChannelCard } from './ChannelCard';
export type { ChannelCardProps, ChannelCardVariant } from './ChannelCard';
export { LiveBadge } from './LiveBadge';
export type { LiveBadgeProps, LiveBadgeVariant } from './LiveBadge';
export { CastButton } from './CastButton';
export type { CastButtonProps, CastButtonVariant, CastButtonSize } from './CastButton';
//# sourceMappingURL=index.d.ts.map