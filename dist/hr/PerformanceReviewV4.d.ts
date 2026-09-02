import * as React from 'react';
import { type RatingParts } from './workforce-v4';
import type { PerformanceReviewProps } from './PerformanceReview';
export interface PerformanceReviewV4Props extends PerformanceReviewProps {
    /**
     * Render the rating readout from its parts. Default `'4.5/5'`.
     *
     * Takes the whole {@link RatingParts} rather than two numbers so a caller
     * can say "4.5 out of 5" or "Exceeds expectations" from the same data the
     * meter is drawn from.
     */
    formatRating?: (parts: RatingParts) => string;
    /** Caption over the goal meter, and its spoken name. Default `'Goals'`. */
    goalsLabel?: string;
    /** Build the due line. Default `` `Due ${date}` ``. */
    formatDue?: (date: string) => string;
    /** Test hook. Every native `hr` component had one; no web one did. */
    testID?: string;
}
/**
 * **V4 performance review** — the web twin of the native
 * `PerformanceReviewV4`, same props as {@link PerformanceReview} plus
 * `formatRating`, `goalsLabel`, `formatDue` and `testID`.
 *
 * ## Six changes
 *
 * 1. **4.5 no longer draws as a perfect score.** The star row used
 *    `Math.round(rated)` while the text beside it printed the raw value, so
 *    `rating={4.5}` drew **five** filled stars next to the words "4.5/5" — the
 *    drawing said one thing about somebody's performance review and the
 *    numeral said another. `ratingParts()` floors the drawn marks; a drawn
 *    mark claims a whole point.
 * 2. **`ratingMax={NaN}` no longer renders "NaN/NaN".** An API field that
 *    parsed badly walked through `Math.max(1, Math.floor(NaN))` unchanged and
 *    reached both the visible string and the `aria-label`.
 * 3. **The rating is a real meter.** It was an `aria-label` on a bare
 *    `<span>` — a `generic` element, which ARIA forbids naming, so every
 *    browser dropped the label and the reader got the raw star glyphs. Native
 *    meanwhile marked the same thing `accessibilityRole="text"`. Two twins
 *    announcing two different things, neither of them a `progressbar`.
 * 4. **The goal meter survives.** Inside a `role="button"` card a
 *    `progressbar`'s value is presentational and is dropped, so a review at
 *    40% goal completion announced no percentage at all. The card is a plain
 *    container now and the meters are siblings of its activation.
 * 5. **The card is one accessible name.** `Review H1 2026` replaced the
 *    subtree — the reviewer, the status and the due date were never spoken.
 * 6. **The reviewer avatar is the same size on both twins** (`xs`, which is
 *    what a mark beside an `xs` caption should be); web drew `sm` and native
 *    drew `xs`.
 */
export declare const PerformanceReviewV4: React.ForwardRefExoticComponent<PerformanceReviewV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PerformanceReviewV4.d.ts.map