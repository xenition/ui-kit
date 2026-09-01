import * as React from 'react';
import type { PlayerStatCardProps } from './PlayerStatCard';
export interface PlayerStatCardV4Props extends PlayerStatCardProps {
    /** The presence word while `online` is true. Default `'Online'`. */
    onlineLabel?: string;
    /** The presence word while it is false. Default `'Offline'`. */
    offlineLabel?: string;
}
/**
 * **V4 player stat card** — same props as {@link PlayerStatCard} plus
 * `onlineLabel` and `offlineLabel`.
 *
 * ## Four changes
 *
 * 1. **The stats survive being clickable.** `detailed` exists to show the
 *    headline stats, and the moment an `onClick` was passed the card became a
 *    `role="button"` — which makes its whole subtree presentational, so every
 *    K/D, every win count and the "No stats yet" line were removed from the
 *    accessibility tree by the act of making the card open a profile. The card
 *    is a plain `<div>`; the activation is a real `<button>` around the avatar
 *    and the handle, and the stats grid is its **sibling**.
 * 2. **Presence is a word on both twins.** It was a coloured dot with
 *    `role="img"` here and a bare tint on native, and neither joined the
 *    card's name — so a card whose only difference from the next one was
 *    "this player is online" read identically. The dot is decoration; the word
 *    is in the meta line and in the spoken name, and `onlineLabel` /
 *    `offlineLabel` let an app change it.
 * 3. **A rank is identity, not the brand.** `Diamond II` wore `primary`,
 *    which made every rank in a roster the same colour as every primary action
 *    on the screen. It is a neutral chip carrying its own word.
 * 4. **Press is a state layer on a target that clears 44.**
 *    `hover:opacity-90` fades the card's own content, which is how M3 says
 *    *disabled*; the focus ring is the kit's `ring` rather than a ramp step
 *    that inverts; and the stat figures are tabular, so a roster's numbers
 *    line up in a column instead of each cell setting its own width.
 */
export declare const PlayerStatCardV4: React.ForwardRefExoticComponent<PlayerStatCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PlayerStatCardV4.d.ts.map