import * as React from 'react';
import type { NowPlayingProps } from './NowPlaying';
/** Drop-in for {@link NowPlayingProps} — same props, the V4 "spotlight" design. */
export type NowPlayingV4Props = NowPlayingProps;
/**
 * NowPlaying — **V4** "spotlight" design (web parity of the native V4). The
 * artwork-forward take on the now-playing surface: the hero cover sits on a
 * brand-gradient glow backdrop (the signature immersive touch), with a big round
 * primary play control framed by prev/next. Same scrubber (linear `Slider`, or a
 * {@link WaveformScrubber} when `peaks` are given), time labels, and optional
 * cast button. Same props/behavior as {@link NowPlayingProps}; all colors from
 * `--xen-*` token classes (no literal hex). `variant="compact"` tightens it.
 */
export declare const NowPlayingV4: React.ForwardRefExoticComponent<NowPlayingProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=NowPlayingV4.d.ts.map