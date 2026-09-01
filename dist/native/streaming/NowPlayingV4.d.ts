import * as React from 'react';
import type { NowPlayingProps } from './NowPlaying';
/** Drop-in for {@link NowPlayingProps} — same props, the V4 "spotlight" design. */
export type NowPlayingV4Props = NowPlayingProps;
/**
 * NowPlaying — **V4** "spotlight" design. The artwork-forward take on the
 * now-playing surface: the hero cover sits on a brand-gradient glow backdrop
 * (the signature immersive touch), with a big round primary play control framed
 * by prev/next. Same scrubber (linear `Slider`, or a {@link WaveformScrubber}
 * when `peaks` are given), time labels, and optional cast button. Same
 * props/behavior as {@link NowPlayingProps}; token-only colors via
 * `useXenitionTheme()`. `variant="compact"` tightens the layout.
 */
export declare function NowPlayingV4({ track, state, position, duration, peaks, variant, onPlayToggle, onSeek, onPrev, onNext, onCast, casting, style, }: NowPlayingV4Props): React.ReactElement;
//# sourceMappingURL=NowPlayingV4.d.ts.map