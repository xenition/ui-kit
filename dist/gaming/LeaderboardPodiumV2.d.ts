import * as React from 'react';
import type { LeaderboardPodiumProps } from './LeaderboardPodium';
/** Same public contract as {@link LeaderboardPodium} — a drop-in alternate design. */
export type LeaderboardPodiumV2Props = LeaderboardPodiumProps;
/**
 * LeaderboardPodium, redesigned (v2): a **classic 3-pillar podium**. The top three
 * stand on tiered blocks (2nd · 1st · 3rd) with medals, avatars, names and scores;
 * the winner's pillar is tallest and primary-filled. Bolder than v1. Same props,
 * token-only.
 */
export declare const LeaderboardPodiumV2: React.ForwardRefExoticComponent<LeaderboardPodiumProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LeaderboardPodiumV2.d.ts.map