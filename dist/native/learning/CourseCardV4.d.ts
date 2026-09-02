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
 * CourseCard — **V4** "campus" design (native twin of the web V4). An elevated
 * rounded card with a soft shadow, a soft-primary media well (thumbnail or
 * glyph), level + category badges, the title + instructor, a rating, a lessons ·
 * duration strip, an optional progress bar with a **tabular-nums** percentage,
 * price, and one dominant CTA. Honors the V4 `variant` — `full` (card, default)
 * and `compact` (a dense single row). Token-only colors via `useXenitionTheme()`.
 */
export declare function CourseCardV4({ title, instructor, thumbnail, glyph, level, category, lessonCount, durationLabel, rating, ratingCount, progress, price, ctaLabel, onPress, variant, style, }: CourseCardV4Props): React.ReactElement;
//# sourceMappingURL=CourseCardV4.d.ts.map