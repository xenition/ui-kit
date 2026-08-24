import * as React from 'react';
import type { CourseCardProps } from './CourseCard';
/** Same public contract as {@link CourseCard} — a drop-in alternate design. */
export type CourseCardV3Props = CourseCardProps;
/**
 * CourseCard, design v3 — **minimal, typographic**: no thumbnail, no chrome.
 * A single bold tinted level chip sits above an oversized title, then a quiet
 * meta strip and a hairline progress bar. The whole surface is the press target
 * with a trailing chevron. Same props as {@link CourseCard}. Token-only colors.
 */
export declare function CourseCardV3({ title, instructor, level, category, lessonCount, durationLabel, rating, ratingCount, progress, price, ctaLabel, onPress, style, }: CourseCardV3Props): React.ReactElement;
//# sourceMappingURL=CourseCardV3.d.ts.map