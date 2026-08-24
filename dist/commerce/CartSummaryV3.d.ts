import * as React from 'react';
import type { CartSummaryProps } from './CartSummary';
/** Drop-in alternate of {@link CartSummaryProps} — identical prop contract. */
export type CartSummaryV3Props = CartSummaryProps;
/**
 * CartSummary — design variant **V3**: **minimal and total-first**. Where the
 * base and V2 build up subtotal → … → total, V3 leads with the grand total set
 * large under a small tracked caption, then lists the muted breakdown lines
 * beneath it as fine print. No box, no shadow — just type hierarchy and a
 * full-width checkout. Same props as {@link CartSummaryProps}. Token-only;
 * money is integer cents.
 */
export declare const CartSummaryV3: React.ForwardRefExoticComponent<CartSummaryProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CartSummaryV3.d.ts.map