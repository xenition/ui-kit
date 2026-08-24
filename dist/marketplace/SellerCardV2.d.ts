import * as React from 'react';
import type { SellerCardProps } from './SellerCard';
/** Same public contract as {@link SellerCard} — a drop-in alternate design. */
export type SellerCardV2Props = SellerCardProps;
/**
 * SellerCard, redesigned (v2): a **banner profile card**. A primary-tinted cover
 * strip carries a large avatar straddling its edge; name (+ verified badge),
 * rating, and a sales·location meta line center beneath, with a full-width
 * Contact CTA. Elevated. Distinct from v1's compact layout. Same props,
 * token-only.
 */
export declare const SellerCardV2: React.ForwardRefExoticComponent<SellerCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SellerCardV2.d.ts.map