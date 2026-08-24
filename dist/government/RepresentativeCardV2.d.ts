import * as React from 'react';
import type { RepresentativeCardProps } from './RepresentativeCard';
/** Same public contract as {@link RepresentativeCard} — a drop-in alternate design. */
export type RepresentativeCardV2Props = RepresentativeCardProps;
/**
 * RepresentativeCard, redesigned (v2): a **banner official card**. A primary-tinted
 * cover carries a large avatar; the name/office, party + in-office badges, district
 * and term info center beneath, with Call/Email actions. Elevated. Distinct from
 * v1. Same props, token-only.
 */
export declare const RepresentativeCardV2: React.ForwardRefExoticComponent<RepresentativeCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RepresentativeCardV2.d.ts.map