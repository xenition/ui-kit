import * as React from 'react';
import type { LeaderboardRowProps } from './LeaderboardRow';
/** Same public contract as {@link LeaderboardRow} — a drop-in alternate design. */
export type LeaderboardRowV2Props = LeaderboardRowProps;
/**
 * LeaderboardRow, redesigned (v2): an **elevated podium card**. The rank shows as
 * a medal (top 3) or a big numbered disc, the avatar + name lead, and the score
 * is a large right-aligned figure with its unit and trend beneath. Highlighted
 * rows gain a primary ring + tint. Distinct from v1's flat line. Same props,
 * token-only.
 */
export declare const LeaderboardRowV2: React.ForwardRefExoticComponent<LeaderboardRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LeaderboardRowV2.d.ts.map