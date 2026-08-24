import * as React from 'react';
import type { NowPlayingProps } from './NowPlaying';
/** Drop-in for {@link NowPlayingProps} — a genuinely different design, same props. */
export type NowPlayingV3Props = NowPlayingProps;
/**
 * **NowPlaying — design V3 (minimalist centred).** Everything centred on a bare
 * surface with generous air: a modest rounded artwork, large centred
 * title/artist, one full-width slider, and a lightweight in-line transport row
 * (no filled play disc — the play/pause is a large glyph). The play control's
 * accessible label reflects `state`. Same `NowPlayingProps`; token-pure;
 * a11y-complete.
 */
export declare function NowPlayingV3({ track, state, position, duration, peaks, variant, onPlayToggle, onSeek, onPrev, onNext, onCast, casting, style, }: NowPlayingV3Props): React.ReactElement;
//# sourceMappingURL=NowPlayingV3.d.ts.map