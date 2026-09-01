import * as React from 'react';
import type { WaveformScrubberProps } from './WaveformScrubber';
/** Drop-in for {@link WaveformScrubberProps} — same props, the V4 "spotlight" design. */
export type WaveformScrubberV4Props = WaveformScrubberProps;
/**
 * WaveformScrubber — **V4** "spotlight" design. A refined, more tactile
 * waveform: played bars render in **primary**, unplayed bars in soft-muted
 * (`onSurface` at low alpha), and a clear primary playhead marks the current
 * position. Seeks by tap: the tap's x maps to a `[0, 1]` fraction reported
 * through `onSeek`, exposed to screen readers as an `adjustable` control with a
 * percentage value. Same `peaks`/`onSeek` contract and behavior as
 * {@link WaveformScrubberProps}; token-only colors via `useXenitionTheme()` —
 * no literal hex.
 */
export declare function WaveformScrubberV4({ peaks, progress, variant, height, onSeek, disabled, accessibilityLabel, style, }: WaveformScrubberV4Props): React.ReactElement;
//# sourceMappingURL=WaveformScrubberV4.d.ts.map