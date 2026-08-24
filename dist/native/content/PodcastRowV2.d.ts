import * as React from 'react';
import type { PodcastRowProps } from './PodcastRow';
/** Drop-in replacement for {@link PodcastRow} — identical props. */
export type PodcastRowV2Props = PodcastRowProps;
/**
 * PodcastRow — **artwork-forward player card** alternate design.
 *
 * Large square artwork with the play/pause control overlaid at its center on a
 * scrim, title + show stacked to the right, and the duration shown as a tinted
 * pill. A "now playing" feel versus the v1 list row with a tiny trailing button.
 * Same props as {@link PodcastRow}, so it is a drop-in swap.
 *
 * Token-pure: elevation via the shared `shadow()`, the play scrim via
 * `withAlpha(ramps.neutral[900], …)`, the duration pill via
 * `withAlpha(colors.primary, …)`. No literal colors.
 */
export declare function PodcastRowV2({ episode, playing, onPlayToggle, onPress, variant, style, }: PodcastRowV2Props): React.ReactElement;
//# sourceMappingURL=PodcastRowV2.d.ts.map