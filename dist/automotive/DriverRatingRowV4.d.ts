import * as React from 'react';
import type { DriverRatingRowProps } from './DriverRatingRow';
export interface DriverRatingRowV4Props extends DriverRatingRowProps {
    /**
     * Build the accessible name for the group and for each star.
     * Default `'4 out of 5'` / `'Rate 4 of 5 stars'`.
     */
    formatRating?: (value: number, max: number) => string;
    formatStarLabel?: (star: number, max: number) => string;
    /** Shown in place of the value when nothing is rated. Default `'Not rated'`. */
    unratedLabel?: string;
}
/**
 * **V4 driver rating row** — the web twin of the native `DriverRatingRowV4`,
 * same props as {@link DriverRatingRow} plus three copy hooks.
 *
 * ## Four changes
 *
 * 1. **The read-only form is `RatingV4` with its value showing.**
 * 2. **Each interactive star is a real 44px target**, and the group is a
 *    `radiogroup` — so a keyboard user arrows through the stars instead of
 *    tabbing five times, and a reader hears one control rather than five.
 * 3. **The skeleton is opaque.**
 * 4. **Every English string is a prop.**
 *
 * **Renders nothing without a `driverName`** (§4.5).
 */
export declare const DriverRatingRowV4: React.ForwardRefExoticComponent<DriverRatingRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DriverRatingRowV4.d.ts.map