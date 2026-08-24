import * as React from 'react';
import type { CourseCardProps } from './CourseCard';
/** Same public contract as {@link CourseCard} — a drop-in alternate design. */
export type CourseCardV2Props = CourseCardProps;
/**
 * CourseCard, redesigned (v2): a **media-hero course card**. The thumbnail fills
 * a wide top banner with the level tag and price floating over a scrim; title,
 * instructor, meta, an optional progress bar, and a full-width CTA sit on the
 * surface below. Elevated with a hover lift. Same props as {@link CourseCard},
 * token-only.
 */
export declare const CourseCardV2: React.ForwardRefExoticComponent<CourseCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CourseCardV2.d.ts.map