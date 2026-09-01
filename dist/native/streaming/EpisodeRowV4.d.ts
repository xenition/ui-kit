import * as React from 'react';
import type { EpisodeRowProps } from './EpisodeRow';
/** Drop-in for {@link EpisodeRowProps} — same props, the V4 "spotlight" design. */
export type EpisodeRowV4Props = EpisodeRowProps;
/**
 * EpisodeRow — **V4** "spotlight" design. The artwork-forward episode row/card:
 * a rounded artwork thumb, title + show · date · duration meta, a resume bar
 * (soft-`primary` track + `primary` fill), and a big round **primary** play
 * affordance (the one accent, filled with an `onPrimary` glyph). The surface
 * stays clean — the gradient is reserved for the artwork-hero moments. Same
 * props/behavior as {@link EpisodeRowProps}; token-only colors via
 * `useXenitionTheme()`. Two variants (`standard` / `compact`).
 */
export declare function EpisodeRowV4({ episode, playing, state, variant, onPlayToggle, onPress, onDownload, style, }: EpisodeRowV4Props): React.ReactElement;
//# sourceMappingURL=EpisodeRowV4.d.ts.map