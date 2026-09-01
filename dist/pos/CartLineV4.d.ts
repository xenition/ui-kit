import * as React from 'react';
import type { CartLineProps } from './CartLine';
/** Drop-in for {@link CartLineProps} — same props, the V4 "register" design. */
export type CartLineV4Props = CartLineProps;
/**
 * CartLine — **V4** "register" design (web parity of the native V4). The tactile
 * checkout take on a ticket line: product name + modifiers on the left, a **big
 * bold line total** in `tabular-nums` on the right (the number a busy counter
 * scans), and a chunky ≥44px −/+ qty stepper with a satisfying press. A `voided`
 * line strikes through and mutes (state by text + style, never color alone). One
 * accent = **primary**; money is integer **cents** via `formatMoney`. Same
 * props/behavior as {@link CartLineProps}; all colors from `--xen-*` token
 * classes (no literals).
 */
export declare const CartLineV4: React.ForwardRefExoticComponent<CartLineProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CartLineV4.d.ts.map