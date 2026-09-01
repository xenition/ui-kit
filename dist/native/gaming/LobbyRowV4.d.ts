import * as React from 'react';
import type { LobbyRowProps } from './LobbyRow';
export interface LobbyRowV4Props extends LobbyRowProps {
    /** The join button's label while the room can be joined. Default `'Join'`. */
    joinLabel?: string;
    /** Its label once the room is full. Default `'Full'`. */
    fullLabel?: string;
    /** Its label once the match has started. Default `'In progress'`. */
    inProgressLabel?: string;
    /** The slot readout. Default `'3 / 10'`. */
    formatSlots?: (filled: number, capacity: number) => string;
}
/**
 * **V4 lobby row** — same props as {@link LobbyRow} plus `joinLabel`,
 * `fullLabel`, `inProgressLabel` and `formatSlots`.
 *
 * ## Five changes
 *
 * 1. **A lobby with no capacity stops calling itself full.** The base computed
 *    `clamp(players, 0, capacity || players)` and printed
 *    `` `${filled}/${capacity || players}` ``, so a room with `capacity: 0`
 *    showed **5/5** — apparently full — while `isFull` required `capacity > 0`
 *    and so left Join **enabled**. The badge and the button read the same zero
 *    and disagreed about it. `slotParts()` reads it once: no capacity is an
 *    unknown room, not a full one, and an unknown room is not joinable.
 * 2. **A full room is a capacity fact, not an error.** The badge was `danger`
 *    — the tone this kit spends on failures — for a room that is simply
 *    popular. It is a neutral chip, and the word in the button says which
 *    state it is in.
 * 3. **The slot meter is a real `progressbar` with a value.** It was a row of
 *    coloured pips under one flattened label, so a reader was told "3 of 10
 *    slots filled" but could not get the meter itself, and a screen at 200%
 *    got ten one-pixel slivers. The track is the module's opaque placeholder
 *    ground rather than the `border` hairline used as a fill.
 * 4. **The row is one spoken name**, built from the lock, the name, the host,
 *    the mode and the slots — the base left the title, the meta line, the
 *    padlock and the badge as four separate stops, and drew a blank
 *    `' '` caption when a lobby had neither host nor mode.
 * 5. **Join clears 44** and its label is a prop on both twins.
 */
export declare function LobbyRowV4({ lobby, variant, joining, joinLabel, fullLabel, inProgressLabel, formatSlots, onJoin, style, }: LobbyRowV4Props): React.ReactElement;
//# sourceMappingURL=LobbyRowV4.d.ts.map