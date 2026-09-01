import * as React from 'react';
import type { TicketTypeRowProps } from './TicketTypeRow';
export interface TicketTypeRowV4Props extends TicketTypeRowProps {
    /** At or below this many remaining, the row is low stock. Default `10`. */
    lowStockAt?: number;
    /** The scarcity caption. Default `'2 left'`. */
    formatRemaining?: (remaining: number) => string;
    /** The sold-out badge and announcement. Default `'Sold out'`. */
    soldOutLabel?: string;
}
/**
 * **V4 ticket type row** — same props as {@link TicketTypeRow} plus
 * `lowStockAt`, `formatRemaining` and `soldOutLabel`.
 *
 * ## Five changes
 *
 * 1. **Negative inventory is sold out, not purchasable.** `remaining === 0`
 *    was a strict equality, so a tier at `-3` — an oversold count, which is
 *    exactly the state a ticketing backend produces under load — was neither
 *    sold out nor low stock: the row rendered normal, enabled, and `onSelect`
 *    fired. `remainingParts()` treats anything at or below zero as sold out.
 * 2. **`lowStockAt` replaces the hard-coded `<= 10`**, which was the same
 *    threshold for a 40-seat workshop and a 40,000-seat stadium.
 * 3. **The row announces its scarcity.** The name was `"General, $49"` and
 *    replaced the subtree, so "2 left" — the one fact that changes whether
 *    someone buys now — was drawn and never spoken.
 * 4. **The row clears 44 and a press is a state layer**, where the base
 *    pressed to `tokens.ramps.neutral[50]`, a light-oriented ramp step that
 *    flashes white on a dark page.
 * 5. **Disabled is M3's 0.38**, not the 0.6 the base guessed at.
 *
 * **Renders nothing without a `name`.**
 */
export declare function TicketTypeRowV4({ name, price, description, remaining, soldOut, lowStockAt, formatRemaining, soldOutLabel, selected, onSelect, disabled, style, }: TicketTypeRowV4Props): React.ReactElement | null;
//# sourceMappingURL=TicketTypeRowV4.d.ts.map