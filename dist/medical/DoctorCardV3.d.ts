import * as React from 'react';
import type { DoctorCardProps } from './DoctorCard';
/** Same public contract as {@link DoctorCard} — a drop-in alternate design. */
export type DoctorCardV3Props = DoctorCardProps;
/**
 * DoctorCard, redesigned (v3): a **compact directory row**. A small avatar, the
 * name over a specialty·credentials line, a small rating, an availability dot +
 * word (never color alone), and a quiet Book button on the trailing edge —
 * hairline-bordered for provider lists. The opposite of v2's banner. Same props,
 * token-only.
 */
export declare const DoctorCardV3: React.ForwardRefExoticComponent<DoctorCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DoctorCardV3.d.ts.map