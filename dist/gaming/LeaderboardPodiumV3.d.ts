import * as React from 'react';
import type { LeaderboardPodiumProps } from './LeaderboardPodium';
/** Same public contract as {@link LeaderboardPodium} — a drop-in alternate design. */
export type LeaderboardPodiumV3Props = LeaderboardPodiumProps;
/**
 * LeaderboardPodium, redesigned (v3): a **compact top-3 list**. The three leaders
 * stack as hairline rows — medal, avatar, name, and score pinned right — for a
 * tight standings widget. The opposite of v2's pillars. Same props, token-only.
 */
export declare const LeaderboardPodiumV3: React.ForwardRefExoticComponent<LeaderboardPodiumProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LeaderboardPodiumV3.d.ts.map