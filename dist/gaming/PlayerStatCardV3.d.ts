import * as React from 'react';
import type { PlayerStatCardProps } from './PlayerStatCard';
/** Same public contract as {@link PlayerStatCard} — a drop-in alternate design. */
export type PlayerStatCardV3Props = PlayerStatCardProps;
/**
 * PlayerStatCard, redesigned (v3): a **compact roster row**. A small avatar with an
 * online dot, the gamertag over a rank·level line, and the first couple of stats
 * inline on the right — hairline-bordered for a friends/party list. The opposite
 * of v2's hero. Same props, token-only.
 */
export declare const PlayerStatCardV3: React.ForwardRefExoticComponent<PlayerStatCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PlayerStatCardV3.d.ts.map