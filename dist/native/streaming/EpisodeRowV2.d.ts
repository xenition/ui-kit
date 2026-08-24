import * as React from 'react';
import type { EpisodeRowProps } from './EpisodeRow';
/** Drop-in for {@link EpisodeRowProps} — a genuinely different design, same props. */
export type EpisodeRowV2Props = EpisodeRowProps;
/**
 * **EpisodeRow — design V2 (resume tile).** A tall, elevated tile: large
 * artwork, an oversized circular play/pause control (a Spinner while
 * buffering), and a prominent resume bar with a "% played" caption underneath.
 * Optimised for a "continue listening" shelf. Same `EpisodeRowProps`;
 * token-pure; a11y-complete.
 */
export declare function EpisodeRowV2({ episode, playing, state, variant, onPlayToggle, onPress, onDownload, style, }: EpisodeRowV2Props): React.ReactElement;
//# sourceMappingURL=EpisodeRowV2.d.ts.map