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
 * **V4 driver rating row** — same props as {@link DriverRatingRow} plus three
 * copy hooks.
 *
 * ## Four changes
 *
 * 1. **The read-only form is `RatingV4` with its value showing.** The base
 *    hand-drew five glyphs; the primitive already draws them, and `showValue`
 *    puts the numeral beside them — which is the half a low-vision user reads.
 * 2. **Each interactive star is a real 44pt target.** The base's stars were
 *    laid out at glyph size, so rating a driver on a phone meant hitting a
 *    16pt box. The stars stay visually the same size; the *target* grows.
 * 3. **The skeleton is opaque**, not a translucent wash of `muted` that
 *    borrows whatever is behind it.
 * 4. **The whole group has one accessible name.** The base announced the
 *    read-only form and left the interactive one as five unlabelled presses.
 *
 * **Renders nothing without a `driverName`** (§4.5).
 */
export declare function DriverRatingRowV4({ driverName, avatarUrl, subtitle, value, max, onRate, variant, loading, formatRating, formatStarLabel, unratedLabel, style, }: DriverRatingRowV4Props): React.ReactElement | null;
//# sourceMappingURL=DriverRatingRowV4.d.ts.map