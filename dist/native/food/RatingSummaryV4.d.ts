import * as React from 'react';
import type { RatingSummaryProps } from './RatingSummary';
export interface RatingSummaryV4Props extends RatingSummaryProps {
    /**
     * The top of the scale. Defaults to `distribution.length` when a
     * distribution is given, and to 5 otherwise — never a hard-coded 5 beside
     * bucket labels derived from something else.
     */
    maxStars?: number;
    /** Build the ratings phrase. Default `'1 rating'` / `'128 ratings'`. */
    formatCount?: (count: number) => string;
    /** Name a bucket. Default `'5 stars'` / `'1 star'`. */
    formatStars?: (stars: number) => string;
}
/**
 * **V4 rating summary** — same props as {@link RatingSummary} plus `maxStars`,
 * `formatCount` and `formatStars`.
 *
 * ## Five changes
 *
 * 1. **The scale is no longer hard-coded to 5.** The name said "out of 5"
 *    while the bucket labels were derived from `distribution.length`, so a
 *    10-bucket distribution announced the wrong scale beside ten rows of
 *    correct ones. `maxStars` names it, defaulting to the distribution's own
 *    length.
 * 2. **The bars are exposed.** They were drawn `View`s with no role and no
 *    value, so the shape of the distribution — the whole reason the detailed
 *    variant exists — reached only the eye. Each bucket is a `progressbar`
 *    with its count as the value.
 * 3. **A bucket says "5 stars", not "5".** A naked digit in a 16px column
 *    announces as a number with no unit.
 * 4. **Every figure is tabular.** The average, the bucket labels and the
 *    counts stack in fixed-width columns and were set proportionally, so the
 *    column of counts did not line up with itself.
 * 5. **The track survives dark mode and the average drops to a real weight.**
 *    The track was `tokens.ramps.neutral[200]`, which native copies without
 *    inverting, and the average was `fontWeight: '800'` — a step off the end
 *    of the kit's scale, which stops at bold.
 */
export declare function RatingSummaryV4({ average, count, distribution, variant, emptyLabel, maxStars, formatCount, formatStars, style, }: RatingSummaryV4Props): React.ReactElement;
//# sourceMappingURL=RatingSummaryV4.d.ts.map