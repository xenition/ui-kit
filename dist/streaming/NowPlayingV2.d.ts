import * as React from 'react';
import type { NowPlayingProps } from './NowPlaying';
/** Same public contract as {@link NowPlaying} — a drop-in alternate design. */
export type NowPlayingV2Props = NowPlayingProps;
/**
 * NowPlaying, redesigned (v2): a **big hero player**. Large square artwork over
 * centered title/artist/album, a full-width scrubber with time labels, and a
 * prev/play/next transport row with an optional cast — the immersive layout. Same
 * props, token-only.
 */
export declare const NowPlayingV2: React.ForwardRefExoticComponent<NowPlayingProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=NowPlayingV2.d.ts.map