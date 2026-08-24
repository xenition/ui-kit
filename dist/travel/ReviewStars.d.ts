import * as React from 'react';
/** One bar in the rating distribution (`stars` 1–5 → `count`). */
export interface ReviewBucket {
    stars: number;
    count: number;
}
export interface ReviewStarsProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Average score, 0–5. */
    average: number;
    /** Total number of reviews. */
    total?: number;
    /** Per-star distribution; renders horizontal proportion bars when present. */
    distribution?: readonly ReviewBucket[];
    /** Qualitative summary word, e.g. `'Excellent'`. */
    summary?: string;
    /** Compact single-line layout (hides the distribution). */
    compact?: boolean;
}
/**
 * Web parity of the native `ReviewStars`: an aggregate review widget — a large
 * average, a star row, the review count, and an optional per-star distribution
 * drawn as token proportion bars. Bar widths are guarded against a zero total.
 * Token-only colors.
 */
export declare const ReviewStars: React.ForwardRefExoticComponent<ReviewStarsProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ReviewStars.d.ts.map