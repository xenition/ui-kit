import * as React from 'react';
import type { EpisodeRowProps } from './EpisodeRow';
/** Same public contract as {@link EpisodeRow} — a drop-in alternate design. */
export type EpisodeRowV2Props = EpisodeRowProps;
/**
 * EpisodeRow, redesigned (v2): an **artwork-forward episode card**. Large artwork
 * with a circular play control overlaid on a scrim, the title/show/date/duration
 * beside it, a resume bar, and an optional download — elevated. Distinct from
 * v1's list row. Same props, token-only.
 */
export declare const EpisodeRowV2: React.ForwardRefExoticComponent<EpisodeRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EpisodeRowV2.d.ts.map