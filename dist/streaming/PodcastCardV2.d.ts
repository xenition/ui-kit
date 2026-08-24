import * as React from 'react';
import type { PodcastCardProps } from './PodcastCard';
/** Same public contract as {@link PodcastCard} — a drop-in alternate design. */
export type PodcastCardV2Props = PodcastCardProps;
/**
 * PodcastCard, redesigned (v2): a **featured show card**. Large square artwork
 * atop the title, publisher, episode count, a short description, and a prominent
 * Subscribe button — elevated, hover-lift. Distinct from v1's grid tile. Same
 * props, token-only.
 */
export declare const PodcastCardV2: React.ForwardRefExoticComponent<PodcastCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PodcastCardV2.d.ts.map