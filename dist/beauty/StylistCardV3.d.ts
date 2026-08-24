import * as React from 'react';
import type { StylistCardProps } from './StylistCard';
/** Same public contract as {@link StylistCard} — a drop-in alternate design. */
export type StylistCardV3Props = StylistCardProps;
/**
 * StylistCard, redesigned (v3): a **compact directory row**. A small avatar, the
 * name over a role·rating line, the from-price, and a quiet Book button — hairline-
 * bordered for a team list. The opposite of v2's banner. Same props, token-only.
 */
export declare const StylistCardV3: React.ForwardRefExoticComponent<StylistCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StylistCardV3.d.ts.map