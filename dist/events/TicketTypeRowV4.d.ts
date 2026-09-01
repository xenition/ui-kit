import * as React from 'react';
import type { TicketTypeRowProps } from './TicketTypeRow';
export interface TicketTypeRowV4Props extends TicketTypeRowProps {
    /** At or below this many remaining, the row reads as low stock. Default `10`. */
    lowStockAt?: number;
    /** The scarcity badge's copy. Default `'2 left'`. */
    formatRemaining?: (remaining: number) => string;
    /** The sold-out badge's copy. Default `'Sold out'`. */
    soldOutLabel?: string;
}
/**
 * **V4 ticket-type row** — the web twin of the native `TicketTypeRowV4`, same
 * props as {@link TicketTypeRow} plus `lowStockAt`, `formatRemaining` and
 * `soldOutLabel`.
 *
 * ## Five changes
 *
 * 1. **Negative inventory is sold out, not purchasable.** `remaining === 0` is
 *    a strict test, so a tier oversold to `-3` was neither sold out *nor* low
 *    stock: the row rendered normal, enabled and priced, and `onSelect` fired.
 *    `remainingParts()` treats anything at or below zero as sold out.
 * 2. **`lowStockAt` replaces the hard-coded `<= 10`.** Ten is a sensible
 *    default for a club night and meaningless for a 40,000-seat stadium.
 * 3. **The row says how many are left.** Its name was `` `${name}, ${price}` ``
 *    — "2 left" is exactly the thing a buyer was not being told, and it is the
 *    thing that decides whether they buy now.
 * 4. **Disabled is 0.38 and press is a state layer.** `opacity-60` is an
 *    invented band, and `hover:bg-neutral-50` is a ramp step that mirrors under
 *    `[data-theme="dark"]` into a near-white plate on a dark sheet.
 * 5. **The row clears 44 and the radio indicator is one size on both twins**,
 *    composed from the spacing scale rather than `h-5 w-5` here and a different
 *    number there.
 */
export declare const TicketTypeRowV4: React.ForwardRefExoticComponent<TicketTypeRowV4Props & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=TicketTypeRowV4.d.ts.map