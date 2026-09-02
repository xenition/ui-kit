import * as React from 'react';
import type { CourseCardProps } from './CourseCard';
/** V4 layout choices for the "campus" design. */
export type CourseCardLayout = 'full' | 'compact';
/** Drop-in for {@link CourseCardProps} — same props, the V4 "campus" design. */
export interface CourseCardV4Props extends CourseCardProps {
    /** V4 layout: `full` (card, default) or `compact` (dense single row). */
    variant?: CourseCardLayout;
}
/**
 * CourseCard — **V4** "campus" design (web parity of the native V4). The bright,
 * modern learning-platform take on a course: an elevated rounded card with a soft
 * shadow, a soft-primary media well (thumbnail or glyph), level + category
 * badges, the title + instructor, a rating, a lessons · duration stat strip, an
 * optional progress bar with a **tabular-nums** percentage, price, and one
 * dominant CTA (Continue when in progress, else Enroll). Honors the V4 `variant`
 * — `full` (card, default) and `compact` (a dense single row). All colors from
 * `--xen-*` token classes (no literals).
 */
export declare const CourseCardV4: React.ForwardRefExoticComponent<CourseCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CourseCardV4.d.ts.map