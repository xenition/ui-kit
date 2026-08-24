import * as React from 'react';
import type { LoyaltyCardProps } from './LoyaltyCard';
/** Same public contract as {@link LoyaltyCard} — a drop-in alternate design. */
export type LoyaltyCardV2Props = LoyaltyCardProps;
/**
 * LoyaltyCard, redesigned (v2): a **membership card face**. A tier-tinted card with
 * the tier glyph + label, member name/id, a big points balance, and a next-tier
 * progress bar. Bolder than v1. Same props, token-only.
 */
export declare const LoyaltyCardV2: React.ForwardRefExoticComponent<LoyaltyCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LoyaltyCardV2.d.ts.map