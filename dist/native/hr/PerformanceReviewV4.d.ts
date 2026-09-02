import * as React from 'react';
import { type RatingParts } from '../../hr/workforce-v4';
import type { PerformanceReviewProps } from './PerformanceReview';
export interface PerformanceReviewV4Props extends PerformanceReviewProps {
    /** Build the rating readout. Default `'4.5/5'`. */
    formatRating?: (parts: RatingParts) => string;
    /** Caption over the goal meter. Default `'Goals'`. */
    goalsLabel?: string;
    /** Build the due line. Default `` `Due ${date}` ``. */
    formatDue?: (date: string) => string;
}
/**
 * **V4 performance review** — same props as {@link PerformanceReview} plus
 * `formatRating`, `goalsLabel` and `formatDue`.
 *
 * ## Six changes
 *
 * 1. **Both meters are meters.** The rating was a `View` with
 *    `accessibilityRole="text"` — the web twin spelled the same thing as an
 *    `aria-label` on a bare `<span>`, which is role `generic` and cannot be
 *    named at all, so the two twins announced different things and neither was
 *    a `progressbar`. The goal meter *was* one, and it sat inside the card's
 *    `Pressable`, which flattens its subtree: its value was dropped before a
 *    reader ever saw it. Both are `progressbar`s now, and both sit **beside**
 *    the card's activation rather than under it.
 * 2. **Four and a half stars is not five.** The star row drew
 *    `Math.round(rated)` while the text beside it printed `rated` raw, so
 *    `rating={4.5}` filled **five** stars — a perfect score — next to the words
 *    "4.5/5". `ratingParts()` floors the filled count, so what is drawn and what
 *    is printed cannot disagree; the remainder is carried by the numeral.
 * 3. **`ratingMax={NaN}` no longer prints "NaN/NaN".** A badly parsed API field
 *    walked through `Math.max(1, Math.floor(NaN))` unchanged and rendered as
 *    visible text *and* as the accessible name.
 * 4. **The stars are inked with ink.** `colors.accent` is a **fill** slot used
 *    as a text colour; `accentText` is the contrast-corrected form.
 * 5. **No literals.** `letterSpacing: 2`, `height: 6`, `gap: 2` and
 *    `withAlpha(colors.onSurface, 0.1)` become the spacing scale and
 *    `ProgressV4`, whose track is composited from the tone rather than washed
 *    over whatever is behind it.
 * 6. **The card announces the whole review** — cycle, reviewer, rating, goal
 *    completion, status and due date — where the base said "Review H1 2026".
 *
 * The reviewer's avatar is `xs` on both twins; the web base used `sm`, so the
 * same review card had a different visual weight per platform.
 *
 * **Renders nothing without a `cycle`.**
 */
export declare function PerformanceReviewV4({ cycle, reviewer, reviewerAvatarUrl, rating, ratingMax, status, goalCompletion, goalCount, dueDate, variant, formatRating, goalsLabel, formatDue, onPress, testID, style, }: PerformanceReviewV4Props): React.ReactElement | null;
//# sourceMappingURL=PerformanceReviewV4.d.ts.map