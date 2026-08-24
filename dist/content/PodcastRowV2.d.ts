import * as React from 'react';
import type { PodcastRowProps } from './PodcastRow';
/** Drop-in replacement for {@link PodcastRow} — identical props. */
export type PodcastRowV2Props = PodcastRowProps;
/**
 * PodcastRow — **artwork-forward player card** alternate design (web / React DOM).
 *
 * Large square artwork with the play/pause control overlaid at its center on a
 * scrim, title + show stacked to the right, and the duration shown as a tinted
 * pill. A "now playing" feel versus the base list row with a tiny trailing
 * button. Same props as {@link PodcastRow}, so it is a drop-in swap.
 *
 * Token-pure: elevation via `shadow-md`, the play scrim via `bg-neutral-900/40`,
 * the duration pill via `bg-primary/10` + `text-primary`. No literal colors.
 */
export declare const PodcastRowV2: React.ForwardRefExoticComponent<PodcastRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PodcastRowV2.d.ts.map