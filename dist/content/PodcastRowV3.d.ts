import * as React from 'react';
import type { PodcastRowProps } from './PodcastRow';
/** Drop-in replacement for {@link PodcastRow} — identical props. */
export type PodcastRowV3Props = PodcastRowProps;
/**
 * PodcastRow — **minimal playlist line** alternate design (web / React DOM).
 *
 * A borderless, hairline-separated line: a tiny rounded artwork, a single-line
 * title with the show beneath, the duration right-aligned, and a compact
 * text-glyph play control. Built for dense episode lists rather than the base
 * bordered card. Same props as {@link PodcastRow}, so it is a drop-in swap.
 *
 * Token-pure: the divider is `bg-border`, the active play glyph is `text-primary`
 * (muted when idle). No literal colors.
 */
export declare const PodcastRowV3: React.ForwardRefExoticComponent<PodcastRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PodcastRowV3.d.ts.map