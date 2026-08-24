import * as React from 'react';
import type { PlayerStatCardProps } from './PlayerStatCard';
/** Drop-in alternate of {@link PlayerStatCardProps} — identical prop contract. */
export type PlayerStatCardV2Props = PlayerStatCardProps;
/**
 * PlayerStatCard — design variant **V2**: a **centered profile card** with a
 * large ringed avatar over a tinted banner, the handle + rank + level stacked
 * below it, and the headline stats in a bordered grid. Where V1 is a left-
 * aligned single row (avatar · name · rank), V2 is a portrait "player passport"
 * — hero avatar centered, identity underneath, then a full stat grid regardless
 * of the (removed) variant switch. Same props as {@link PlayerStatCardProps};
 * renders a graceful "No stats yet" line when empty. Token-only, elevated.
 */
export declare function PlayerStatCardV2({ player, online, onPress, style, }: PlayerStatCardV2Props): React.ReactElement;
//# sourceMappingURL=PlayerStatCardV2.d.ts.map