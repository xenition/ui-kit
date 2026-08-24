import * as React from 'react';
import type { CourseCardProps } from './CourseCard';
/** Same public contract as {@link CourseCard} — a drop-in alternate design. */
export type CourseCardV2Props = CourseCardProps;
/**
 * CourseCard, design v2 — a **horizontal** row: a square thumbnail (or glyph)
 * on the left, a stacked content column on the right, and an elevated,
 * borderless surface (drop shadow). When `progress` is set the card shows a
 * compact {@link ProgressRing} instead of a bar. Same props as {@link CourseCard}.
 * Token-only colors.
 */
export declare function CourseCardV2({ title, instructor, thumbnail, glyph, level, category, lessonCount, durationLabel, rating, ratingCount, progress, price, ctaLabel, onPress, style, }: CourseCardV2Props): React.ReactElement;
//# sourceMappingURL=CourseCardV2.d.ts.map