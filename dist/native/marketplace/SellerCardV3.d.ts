import * as React from 'react';
import type { SellerCardProps } from './SellerCard';
/** Drop-in alternate of {@link SellerCardProps} — identical prop contract. */
export type SellerCardV3Props = SellerCardProps;
/**
 * SellerCard — Design V3: a **minimal trust-line**. No card chrome — just a
 * leading avatar, the name with an inline verified check, a single condensed
 * meta line (rating · sales · location), and the contact action rendered as a
 * quiet text link on the trailing edge. A hairline underline is the only
 * separator. Deliberately lightweight for dense lists — the opposite of the V2
 * profile banner. Same props as `SellerCard`; the contact link stays outside
 * the profile press target; token-pure colors.
 */
export declare function SellerCardV3({ name, avatarUrl, rating, reviewCount, salesCount, location, verified, actionLabel, onContact, onPress, style, }: SellerCardV3Props): React.ReactElement;
//# sourceMappingURL=SellerCardV3.d.ts.map