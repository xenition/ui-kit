import * as React from 'react';
import type { LoyaltyCardProps } from './LoyaltyCard';
/** Same public contract as {@link LoyaltyCard} — a drop-in alternate design. */
export type LoyaltyCardV3Props = LoyaltyCardProps;
/**
 * LoyaltyCard, redesigned (v3): a **compact membership row**. The tier glyph, the
 * member name over a tier·id line, and the points balance pinned right — hairline-
 * bordered for a wallet list. The opposite of v2's card face. Same props,
 * token-only.
 */
export declare const LoyaltyCardV3: React.ForwardRefExoticComponent<LoyaltyCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LoyaltyCardV3.d.ts.map