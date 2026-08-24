import * as React from 'react';
import type { DoctorCardProps } from './DoctorCard';
/** Same public contract as {@link DoctorCard} — a drop-in alternate design. */
export type DoctorCardV2Props = DoctorCardProps;
/**
 * DoctorCard, redesigned (v2): a **banner profile card**. A primary-tinted cover
 * carries a large avatar straddling its edge; the name, specialty, rating,
 * credentials, and an availability badge center beneath, with a full-width Book
 * CTA. Elevated. Distinct from v1's compact row. Same props, token-only.
 */
export declare const DoctorCardV2: React.ForwardRefExoticComponent<DoctorCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DoctorCardV2.d.ts.map