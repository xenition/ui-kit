import * as React from 'react';
import type { RatingSummaryProps } from './RatingSummary';
export interface RatingSummaryV4Props extends RatingSummaryProps {
    /**
     * How many stars the scale runs to. Defaults to `distribution.length` when
     * there is a distribution, and 5 otherwise — the base hard-coded "out of 5"
     * into the name while deriving the bucket labels from `distribution.length`,
     * so a 10-bucket distribution drew ten rows and announced a five-star scale.
     */
    maxStars?: number;
    /** Build the total's words. Default `'1 rating'` / `'240 ratings'`. */
    formatCount?: (count: number) => string;
    /** Build a bucket's words. Default `'5 stars'`. */
    formatStars?: (stars: number) => string;
}
/**
 * **V4 rating summary** — the web twin of the native `RatingSummaryV4`, same
 * props as {@link RatingSummary} plus `maxStars`, `formatCount` and
 * `formatStars`.
 *
 * ## Five changes
 *
 * 1. **The scale is not hard-coded to five.** The name said "out of 5" while
 *    the bucket rows counted down from `distribution.length`, so a 10-bucket
 *    distribution drew ten bars under a five-star claim.
 * 2. **The distribution bars are exposed.** They were a `span` with a width —
 *    invisible to a reader, which meant the *shape* of the ratings, the thing
 *    the detailed variant exists to show, was sighted-only. Each row is now a
 *    real `progressbar` with its own name.
 * 3. **A bucket says "5 stars", not "5".** A naked digit in a column announces
 *    as a number with no unit and no meaning.
 * 4. **The name lands on an element with a role.** `aria-label` on a role-less
 *    `div` is ignored outright, so the average and the count — the two figures
 *    the block is made of — reached nobody.
 * 5. **Tokens.** `font-extrabold` is off the kit's weight scale, which stops
 *    at bold; `bg-neutral-200` is a ramp step that inverts under
 *    `[data-theme="dark"]`, so the empty half of every bar went near-white on
 *    a dark page; and `text-muted` is a fill being used as ink.
 */
export declare const RatingSummaryV4: React.ForwardRefExoticComponent<RatingSummaryV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RatingSummaryV4.d.ts.map