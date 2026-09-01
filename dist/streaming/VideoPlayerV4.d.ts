import * as React from 'react';
import type { VideoPlayerProps } from './VideoPlayer';
/** Drop-in for {@link VideoPlayerProps} — same props, the V4 "spotlight" design. */
export type VideoPlayerV4Props = VideoPlayerProps;
/**
 * VideoPlayer — **V4** "spotlight" design (web parity of the native V4). The
 * video surface shell: a brand-gradient poster/backdrop sits behind the
 * (placeholder) video frame — the V4 signature — with a big centered round
 * **primary** play control and a bottom control bar (scrubber + time labels +
 * mute/cast/fullscreen glyphs) on a subtle scrim. A `posterUrl` overlays the
 * gradient when given. Controls-only, no `<video>` engine: drive a real element
 * from `onPlayToggle(next)`, `onSeek(seconds)`, `onFullscreen`, `onCast`. Same
 * props/behavior as {@link VideoPlayerProps} (buffering swaps play for a
 * `Spinner`); every color resolves from `--xen-*` tokens — no literal hex.
 */
export declare const VideoPlayerV4: React.ForwardRefExoticComponent<VideoPlayerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VideoPlayerV4.d.ts.map