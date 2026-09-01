import * as React from 'react';
import type { CartBarProps } from './CartBar';
export interface CartBarV4Props extends CartBarProps {
    /** Copy shown while the cart is settling. Default `'Updating…'`. */
    updatingLabel?: string;
    /** Build the item count's words. Default `'1 item'` / `'3 items'`. */
    formatItemCount?: (count: number) => string;
}
/**
 * **V4 cart bar** — the web twin of the native `CartBarV4`, same props as
 * {@link CartBar} plus `updatingLabel` and `formatItemCount`.
 *
 * ## Five changes
 *
 * 1. **The bar is a real button.** It was a `div` with `role="button"`,
 *    `tabIndex` and a hand-written Enter/Space handler — three approximations
 *    of what a `<button>` already does, and the one that has to be re-derived
 *    on every card in this module.
 * 2. **The count pill stops using an ink slot as a fill.** It painted
 *    `bg-on-primary text-primary`: `on-primary` is the ink *guaranteed against*
 *    `primary`, not a surface, and nothing promises `primary` is readable on
 *    it. The pill is now a hairline ring in the bar's own ink, which needs no
 *    second guarantee at all.
 * 3. **`formatItemCount` fixes "1 items".**
 * 4. **`updatingLabel` is a prop**, where "Updating…" was an English string
 *    compiled into the component.
 * 5. **Disabled and hover stop fighting.** `opacity-60` and
 *    `hover:opacity-90` shared a node, so an empty or updating bar got
 *    *brighter* under the pointer. Press is the M3 state layer over the bar's
 *    own fill; unavailable is the 0.38 band and a real `disabled`.
 */
export declare const CartBarV4: React.ForwardRefExoticComponent<CartBarV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CartBarV4.d.ts.map