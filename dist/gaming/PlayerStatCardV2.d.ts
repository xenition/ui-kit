import * as React from 'react';
import type { PlayerStatCardProps } from './PlayerStatCard';
/** Same public contract as {@link PlayerStatCard} — a drop-in alternate design. */
export type PlayerStatCardV2Props = PlayerStatCardProps;
/**
 * PlayerStatCard, redesigned (v2): a **hero profile card**. A tinted header holds
 * a large avatar (with an online dot), the gamertag, and a rank/level badge; the
 * headline stats render as a grid of tiles beneath. Bolder than v1. Same props,
 * token-only.
 */
export declare const PlayerStatCardV2: React.ForwardRefExoticComponent<PlayerStatCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PlayerStatCardV2.d.ts.map