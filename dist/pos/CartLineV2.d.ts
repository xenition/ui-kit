import * as React from 'react';
import type { CartLineProps } from './CartLine';
/** Same public contract as {@link CartLine} — a drop-in alternate design. */
export type CartLineV2Props = CartLineProps;
/**
 * CartLine, redesigned (v2): an **elevated ticket card**. The quantity stepper
 * leads on the left, the name + modifier chips + note fill the middle, and the
 * line total (with a struck discount) anchors the right — a chunky order-ticket
 * row. Voided lines strike through. Distinct from v1. Same props, token-only.
 */
export declare const CartLineV2: React.ForwardRefExoticComponent<CartLineProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CartLineV2.d.ts.map