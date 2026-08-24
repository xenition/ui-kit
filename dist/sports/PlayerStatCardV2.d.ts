import * as React from 'react';
import type { PlayerStatCardProps } from './PlayerStatCard';
/** Same public contract as {@link PlayerStatCard} — a drop-in alternate design. */
export type PlayerStatCardV2Props = PlayerStatCardProps;
/**
 * PlayerStatCard, redesigned (v2): a **hero profile card**. A primary-tinted
 * header carries the photo, shirt number, name, position·team and a status chip;
 * the stats render as a grid of tiles beneath. Bolder than v1. Same props,
 * token-only.
 */
export declare const PlayerStatCardV2: React.ForwardRefExoticComponent<PlayerStatCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PlayerStatCardV2.d.ts.map