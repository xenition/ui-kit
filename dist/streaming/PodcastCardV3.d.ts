import * as React from 'react';
import type { PodcastCardProps } from './PodcastCard';
/** Same public contract as {@link PodcastCard} — a drop-in alternate design. */
export type PodcastCardV3Props = PodcastCardProps;
/**
 * PodcastCard, redesigned (v3): a **compact show row**. Small artwork left, the
 * title over a publisher·episode-count line, and a quiet Subscribe button on the
 * right — hairline-bordered for a shows list. The opposite of v2's featured card.
 * Same props, token-only.
 */
export declare const PodcastCardV3: React.ForwardRefExoticComponent<PodcastCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PodcastCardV3.d.ts.map