import * as React from 'react';
import type { PodcastRowProps } from './PodcastRow';
/** Drop-in replacement for {@link PodcastRow} — identical props. */
export type PodcastRowV3Props = PodcastRowProps;
/**
 * PodcastRow — **minimal playlist line** alternate design.
 *
 * A borderless, hairline-separated line: a tiny rounded artwork, a single-line
 * title with the show beneath, the duration right-aligned, and a compact
 * text-glyph play control. Built for dense episode lists rather than the v1
 * bordered card. Same props as {@link PodcastRow}, so it is a drop-in swap.
 *
 * Token-pure: the divider is `colors.border`, the active play glyph is
 * `colors.primary` (muted when idle). No literal colors.
 */
export declare function PodcastRowV3({ episode, playing, onPlayToggle, onPress, variant, style, }: PodcastRowV3Props): React.ReactElement;
//# sourceMappingURL=PodcastRowV3.d.ts.map