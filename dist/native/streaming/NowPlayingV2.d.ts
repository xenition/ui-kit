import * as React from 'react';
import type { NowPlayingProps } from './NowPlaying';
/** Drop-in for {@link NowPlayingProps} — a genuinely different design, same props. */
export type NowPlayingV2Props = NowPlayingProps;
/**
 * **NowPlaying — design V2 (artwork-forward).** Edge-to-edge hero artwork
 * anchors the screen; the title/artist sit on a dark, token-derived scrim
 * overlaid on the art, and the scrubber + transport live on an elevated
 * control card that floats over the lower edge. The main control's accessible
 * label reflects `state`. Same `NowPlayingProps`; token-pure; a11y-complete.
 */
export declare function NowPlayingV2({ track, state, position, duration, peaks, variant, onPlayToggle, onSeek, onPrev, onNext, onCast, casting, style, }: NowPlayingV2Props): React.ReactElement;
//# sourceMappingURL=NowPlayingV2.d.ts.map