import * as React from 'react';
import type { LoyaltyCardProps } from './LoyaltyCard';
/** Drop-in alternate of {@link LoyaltyCardProps} — identical prop contract. */
export type LoyaltyCardV3Props = LoyaltyCardProps;
/**
 * LoyaltyCard — design variant **V3**: a **minimal points row**. A single
 * hairline-ruled line — a tier glyph + label chip and the member name on the
 * left, the points balance on the right, with a tiny "N to next" caption
 * underneath when a target is set. Where V1 is an info card and V2 a wallet
 * artifact, V3 is the compact status row for a header or list. Same props as
 * {@link LoyaltyCardProps}. Token-only colors.
 */
export declare function LoyaltyCardV3({ memberName, points, tier, nextTierAt, nextTierLabel, memberId, style, }: LoyaltyCardV3Props): React.ReactElement;
//# sourceMappingURL=LoyaltyCardV3.d.ts.map