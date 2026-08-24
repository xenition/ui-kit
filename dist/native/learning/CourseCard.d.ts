import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Difficulty level — drives the level tag tone + label. */
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
export interface CourseCardProps {
    /** Course title. */
    title: string;
    /** Instructor / author name. */
    instructor?: string;
    /** Remote thumbnail image URI. */
    thumbnail?: string;
    /** Emoji/glyph shown when there's no thumbnail. */
    glyph?: string;
    /** Difficulty; sets the level tag. */
    level?: CourseLevel;
    /** Short subject / category label. */
    category?: string;
    /** Number of lessons in the course. */
    lessonCount?: number;
    /** Human duration label, e.g. "4h 30m". */
    durationLabel?: string;
    /** Average rating (0–5). */
    rating?: number;
    /** Number of ratings, shown next to the stars. */
    ratingCount?: number;
    /** Enrollment progress 0–100. When set, the card reads as "in progress". */
    progress?: number;
    /** Price label, e.g. "$49" or "Free". */
    price?: string;
    /** CTA label; defaults to "Continue" when `progress` is set, else "Enroll". */
    ctaLabel?: string;
    /** Fires when the CTA is pressed. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A course summary card: thumbnail (or glyph fallback), level + category tags,
 * title, instructor, a lessons / duration / rating stat strip, an optional
 * progress bar, price, and a single dominant CTA. `progress` flips the card into
 * an "in progress" state (Continue). Token-only colors.
 */
export declare function CourseCard({ title, instructor, thumbnail, glyph, level, category, lessonCount, durationLabel, rating, ratingCount, progress, price, ctaLabel, onPress, style, }: CourseCardProps): React.ReactElement;
//# sourceMappingURL=CourseCard.d.ts.map