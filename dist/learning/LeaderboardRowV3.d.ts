import * as React from 'react';
import type { LeaderboardRowProps } from './LeaderboardRow';
/** Same public contract as {@link LeaderboardRow} — a drop-in alternate design. */
export type LeaderboardRowV3Props = LeaderboardRowProps;
/**
 * LeaderboardRow, redesigned (v3): a **dense ranking line**. A fixed-width rank
 * number, a tiny avatar, the name inline, and the score pinned right with its
 * trend as a small trailing note — hairline-separated so a full ladder stacks
 * tightly. Highlighted rows get a primary left accent bar (plus text weight),
 * never color alone. Same props, token-only.
 */
export declare const LeaderboardRowV3: React.ForwardRefExoticComponent<LeaderboardRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LeaderboardRowV3.d.ts.map