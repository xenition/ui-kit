import * as React from 'react';
import type { StylistCardProps } from './StylistCard';
/** Same public contract as {@link StylistCard} — a drop-in alternate design. */
export type StylistCardV2Props = StylistCardProps;
/**
 * StylistCard, redesigned (v2): a **banner profile card**. An accent-tinted cover
 * carries a large avatar straddling its edge; the name/role, rating, specialty
 * chips, from-price, availability and a Book CTA center beneath. Elevated. Distinct
 * from v1. Same props, token-only.
 */
export declare const StylistCardV2: React.ForwardRefExoticComponent<StylistCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StylistCardV2.d.ts.map