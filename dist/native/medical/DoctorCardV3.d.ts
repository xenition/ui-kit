import * as React from 'react';
import type { DoctorCardProps } from './DoctorCard';
/** Same public contract as {@link DoctorCard} — a drop-in alternate design. */
export type DoctorCardV3Props = DoctorCardProps;
/**
 * DoctorCard, redesigned (v3): a **compact directory row**. A small avatar leads
 * a name / specialty stack; the star rating collapses to a single "★ 4.5"
 * figure on the right, and availability shows as a glyph + word (never color
 * alone). No CTA button, no card chrome — a hairline base rule separates rows so
 * a stack reads as a lean provider list. Distinct at a glance from v1's card and
 * v2's centered profile. Same props, token-pure.
 */
export declare function DoctorCardV3({ name, specialty, avatar, rating, reviewCount, availability, onBook, style, }: DoctorCardV3Props): React.ReactElement;
//# sourceMappingURL=DoctorCardV3.d.ts.map