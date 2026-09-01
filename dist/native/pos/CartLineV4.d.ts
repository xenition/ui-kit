import * as React from 'react';
import type { CartLineProps } from './CartLine';
/** Drop-in for {@link CartLineProps} — same props, the V4 "register" design. */
export type CartLineV4Props = CartLineProps;
/**
 * CartLine — **V4** "register" design. The tactile checkout take on a ticket
 * line: product name + modifiers on the left, a **big bold line total** in
 * `tabular-nums` weight on the right (the number a busy counter scans), and a
 * chunky ≥44px −/+ qty stepper with a satisfying press. A `voided` line strikes
 * through and mutes (state by text + style, never color alone). One accent =
 * **primary**; money is integer **cents** via `formatMoney`. Same props/behavior
 * as {@link CartLineProps}; token-only via `useXenitionTheme()`.
 */
export declare function CartLineV4({ name, quantity, unitPriceCents, currency, modifiers, note, discountCents, onQuantityChange, min, max, onVoid, voidLabel, voided, onPress, variant, testID, style, }: CartLineV4Props): React.ReactElement;
//# sourceMappingURL=CartLineV4.d.ts.map