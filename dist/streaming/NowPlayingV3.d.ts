import * as React from 'react';
import type { NowPlayingProps } from './NowPlaying';
/** Same public contract as {@link NowPlaying} — a drop-in alternate design. */
export type NowPlayingV3Props = NowPlayingProps;
/**
 * NowPlaying, redesigned (v3): a **compact bar player**. Small artwork left, the
 * title/artist and an inline scrubber stacked in the middle, and a single play
 * control on the right — a lean player for a sidebar. The opposite of v2's hero.
 * Same props, token-only.
 */
export declare const NowPlayingV3: React.ForwardRefExoticComponent<NowPlayingProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=NowPlayingV3.d.ts.map