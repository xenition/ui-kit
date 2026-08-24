import * as React from 'react';
import type { DoctorCardProps } from './DoctorCard';
/** Same public contract as {@link DoctorCard} — a drop-in alternate design. */
export type DoctorCardV2Props = DoctorCardProps;
/**
 * DoctorCard, redesigned (v2): a **centered profile card**. A large ringed
 * avatar is the hero, with the name, specialty, and credential line stacked and
 * centered beneath it; the star rating and an availability badge (glyph + label)
 * sit centered above a full-width "Book" CTA. Lifted with a shadow and mounted
 * with a fade-in — distinct at a glance from v1's left-aligned row. Same props,
 * token-pure.
 */
export declare function DoctorCardV2({ name, specialty, avatar, rating, reviewCount, credentials, availability, onBook, bookLabel, style, }: DoctorCardV2Props): React.ReactElement;
//# sourceMappingURL=DoctorCardV2.d.ts.map