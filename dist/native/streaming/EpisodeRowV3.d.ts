import * as React from 'react';
import type { EpisodeRowProps } from './EpisodeRow';
/** Drop-in for {@link EpisodeRowProps} — a genuinely different design, same props. */
export type EpisodeRowV3Props = EpisodeRowProps;
/**
 * **EpisodeRow — design V3 (dense playlist line).** A single flat, borderless
 * line: a small leading play/pause glyph that turns into an equalizer marker
 * while the row is playing, the title and inline meta in the middle, and the
 * duration trailing right — with a hairline resume underline for `progress`.
 * Built for long, scannable playlist-style lists. Same `EpisodeRowProps`;
 * token-pure; a11y-complete.
 */
export declare function EpisodeRowV3({ episode, playing, state, variant, onPlayToggle, onPress, onDownload, style, }: EpisodeRowV3Props): React.ReactElement;
//# sourceMappingURL=EpisodeRowV3.d.ts.map