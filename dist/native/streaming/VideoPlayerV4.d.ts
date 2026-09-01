import * as React from 'react';
import type { VideoPlayerProps } from './VideoPlayer';
/** Drop-in for {@link VideoPlayerProps} — same props, the V4 "spotlight" design. */
export type VideoPlayerV4Props = VideoPlayerProps;
/**
 * VideoPlayer — **V4** "spotlight" design. The video surface shell: a
 * brand-gradient poster/backdrop sits behind the (placeholder) video frame —
 * the V4 signature — with a big centered round **primary** play control and a
 * bottom control bar (scrubber + time labels + cast/fullscreen glyphs) on a
 * subtle scrim. A `posterUrl` overlays the gradient when given. Controls-only,
 * no playback engine: drive a real player from `onPlayToggle(next)`,
 * `onSeek(seconds)`, `onFullscreen`, `onCast`. Same props/behavior as
 * {@link VideoPlayerProps} (buffering swaps play for a `Spinner`); token-only
 * colors via `useXenitionTheme()` — no literal hex.
 */
export declare function VideoPlayerV4({ posterUrl, title, state, position, duration, live, viewers, aspectRatio, variant, showControls, onPlayToggle, onSeek, onFullscreen, onCast, casting, style, }: VideoPlayerV4Props): React.ReactElement;
//# sourceMappingURL=VideoPlayerV4.d.ts.map