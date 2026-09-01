import * as React from 'react';
import type { WaveformScrubberProps } from './WaveformScrubber';
/** Drop-in for {@link WaveformScrubberProps} — same props, the V4 "spotlight" design. */
export type WaveformScrubberV4Props = WaveformScrubberProps;
/**
 * WaveformScrubber — **V4** "spotlight" design (web parity of the native V4). A
 * refined, more tactile waveform: played bars render in **primary**, unplayed
 * bars in soft-muted (`bg-muted`), and a clear primary playhead marks the
 * current position. Seeks by click (x maps to a `[0, 1]` fraction) or keyboard
 * (←/→/↑/↓ nudge in 5% steps), exposed as an ARIA `slider` with `aria-valuenow`
 * (a percentage). Same `peaks`/`onSeek` contract and behavior as
 * {@link WaveformScrubberProps}; every color resolves from `--xen-*` token
 * classes — no literal hex.
 */
export declare const WaveformScrubberV4: React.ForwardRefExoticComponent<WaveformScrubberProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WaveformScrubberV4.d.ts.map