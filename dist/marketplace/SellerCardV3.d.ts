import * as React from 'react';
import type { SellerCardProps } from './SellerCard';
/** Same public contract as {@link SellerCard} — a drop-in alternate design. */
export type SellerCardV3Props = SellerCardProps;
/**
 * SellerCard, redesigned (v3): a **compact directory row**. A small avatar, the
 * name (with an inline ✓ when verified) over a rating·sales·location summary, and
 * a quiet Contact button on the trailing edge — hairline-bordered for storefront
 * lists. The opposite of v2's banner card. Same props, token-only.
 */
export declare const SellerCardV3: React.ForwardRefExoticComponent<SellerCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SellerCardV3.d.ts.map