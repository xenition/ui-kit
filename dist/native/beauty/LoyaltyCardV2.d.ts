import * as React from 'react';
import type { LoyaltyCardProps } from './LoyaltyCard';
/** Drop-in alternate of {@link LoyaltyCardProps} — identical prop contract. */
export type LoyaltyCardV2Props = LoyaltyCardProps;
/**
 * LoyaltyCard — design variant **V2**: a **gradient membership card**. A tall,
 * rounded card whose accent-tinted surface is layered with two translucent
 * `withAlpha` sheens to read as a diagonal gradient (no gradient dependency),
 * with a "MEMBER" eyebrow + tier badge up top, the member name and spaced-out
 * id styled like an embossed card face, a large points balance, and a progress
 * bar toward the next tier. Where V1 is a flat info card, V2 is the wallet
 * artifact. Same props as {@link LoyaltyCardProps}. Token-only colors.
 */
export declare function LoyaltyCardV2({ memberName, points, tier, nextTierAt, nextTierLabel, memberId, style, }: LoyaltyCardV2Props): React.ReactElement;
//# sourceMappingURL=LoyaltyCardV2.d.ts.map