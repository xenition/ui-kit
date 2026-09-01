import * as React from 'react';
import type { LobbyRowProps } from './LobbyRow';
export interface LobbyRowV4Props extends LobbyRowProps {
    /** The join action's copy while the room can be joined. Default `'Join'`. */
    joinLabel?: string;
    /** Its copy while the room is at capacity. Default `'Full'`. */
    fullLabel?: string;
    /** Its copy while the match has already started. Default `'In progress'`. */
    inProgressLabel?: string;
    /** The slot meter's caption. Default `'3 / 10 players'`. */
    formatSlots?: (filled: number, capacity: number) => string;
}
/**
 * **V4 lobby row** — same props as {@link LobbyRow} plus `joinLabel`,
 * `fullLabel`, `inProgressLabel` and `formatSlots`.
 *
 * ## Four changes
 *
 * 1. **A room with no capacity stops claiming to be full.** The base computed
 *    `clamp(players, 0, cap || players)` and printed `` `${filled}/${cap || players}` ``,
 *    so a lobby with `capacity: 0` rendered **5/5** and a red "full" badge —
 *    while `isFull` required `cap > 0`, so `joinable` stayed true and the
 *    button beside the badge still said **Join**. The badge and the button
 *    were reading the same zero and disagreeing about it. `slotParts()` reads
 *    it once, for both twins, and answers what it actually means: no capacity
 *    is an *unknown* room, not a full one.
 * 2. **The slot meter is a meter.** It was a strip of `aria-hidden`-by-omission
 *    pips inside a role-less `<div>` that carried an `aria-label` — which ARIA
 *    forbids on a generic element, so the browser discarded it and the
 *    occupancy was drawn for sighted users and for nobody else. It is a real
 *    `progressbar` with a value now, and its caption is `formatSlots`.
 * 3. **A full room is not an error.** The badge was `danger`. Capacity is a
 *    fact about a room, not a fault in it, and painting it red leaves the
 *    status colours meaning nothing when a queue genuinely fails. It is a
 *    neutral chip, and the reason a room cannot be joined is a **word** on the
 *    button — `fullLabel` or `inProgressLabel` — not a colour.
 * 4. **The row has one name**, built with `spokenLine()`, on a `group` rather
 *    than scattered across four unlabelled stops; and it borrows the shared
 *    row family's text and trailing columns so a lobby list lines up with
 *    every other list in the kit.
 */
export declare const LobbyRowV4: React.ForwardRefExoticComponent<LobbyRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LobbyRowV4.d.ts.map