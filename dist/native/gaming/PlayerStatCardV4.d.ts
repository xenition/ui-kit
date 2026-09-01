import * as React from 'react';
import type { PlayerStatCardProps } from './PlayerStatCard';
export interface PlayerStatCardV4Props extends PlayerStatCardProps {
    /** Presence wording while `online` is true. Default `'Online'`. */
    onlineLabel?: string;
    /** Presence wording while it is false. Default `'Offline'`. */
    offlineLabel?: string;
}
/**
 * **V4 player stat card** — same props as {@link PlayerStatCard} plus
 * `onlineLabel` and `offlineLabel`.
 *
 * ## Four changes
 *
 * 1. **The stats grid survives the card being tappable.** `detailed` exists
 *    entirely to show K/D, wins and hours — and the moment `onPress` was
 *    supplied, the whole card became one `accessible` `Pressable` named
 *    `` `${name}, ${rank}` ``, which prunes every one of those cells. (On web
 *    the same shape means the grid is inside `role="button"`, where its
 *    content is presentational.) The activation now wraps the header only and
 *    the grid is its sibling, announced as one line.
 * 2. **Presence is a word, on both twins.** It was a coloured dot on the
 *    avatar and nothing else — the one state in the card that a colour-blind
 *    or blind user could not read at all, and the twins disagreed about
 *    whether it was announced.
 * 3. **A rank is identity, not a status.** `Diamond II` was a `primary` badge;
 *    a tier is a category, and the whole point of this module's `IDENTITY_TONE`
 *    is that a category does not spend a status slot.
 * 4. **A press is a state layer**, not `opacity: 0.9`, and the empty
 *    `detailed` grid still says so in words rather than collapsing.
 */
export declare function PlayerStatCardV4({ player, variant, online, onlineLabel, offlineLabel, onPress, style, }: PlayerStatCardV4Props): React.ReactElement;
//# sourceMappingURL=PlayerStatCardV4.d.ts.map