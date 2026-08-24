import * as React from 'react';
import type { CourseCardProps } from './CourseCard';
/** Same public contract as {@link CourseCard} — a drop-in alternate design. */
export type CourseCardV3Props = CourseCardProps;
/**
 * CourseCard, redesigned (v3): a **compact catalog row**. A small square glyph/
 * thumbnail tile leads, the title sits over a single middot-joined meta line,
 * and the price + a quiet CTA hug the right edge. A thin progress underline shows
 * when in progress. Borderless list-friendly — the opposite of v2's hero card.
 * Same props, token-only.
 */
export declare const CourseCardV3: React.ForwardRefExoticComponent<CourseCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CourseCardV3.d.ts.map