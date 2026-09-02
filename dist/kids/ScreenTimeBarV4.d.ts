import * as React from 'react';
import type { ScreenTimeBarProps } from './ScreenTimeBar';
export interface ScreenTimeBarV4Props extends ScreenTimeBarProps {
    /** The note under a reading with no limit behind it. Default `emptyLabel`. */
    noLimitLabel?: string;
    /** Leads the overage. Default `'over by'`. */
    overLabel?: string;
    /** Follows the remainder. Default `'left'`. */
    remainingLabel?: string;
    /** Render a duration. Default splits hours and minutes, in any unit. */
    formatDuration?: (minutes: number) => string;
}
/**
 * **V4 screen-time bar** — same props as {@link ScreenTimeBar} plus
 * `noLimitLabel`, `overLabel`, `remainingLabel` and `formatDuration`.
 *
 * ## Six changes
 *
 * 1. **`limit={0}` no longer throws the reading away.** The base rendered the
 *    shared empty state — the parent was told "No screen-time limit set" and
 *    never told the child had been on the device for four hours. That is the
 *    one screen where the number matters most. The reading is now always drawn;
 *    "no limit set" becomes a note beside it rather than a replacement for it.
 * 2. **A broken reading is reported, not laundered.** `used={-30}` rendered
 *    "0 min / 2h — 2h left" as though the sync were sound, and `used={NaN}`
 *    reached the screen as "NaNh NaNm" with a CSS width of the string `NaN%`.
 *    `meterParts` keeps `valid` separate from nought: an unusable measurement
 *    draws an empty state instead of a confident zero, and a negative one
 *    still reports what it was handed.
 * 3. **The meter's range is valid.** `used={180} limit={120}` announced
 *    `aria-valuenow="180"` against `aria-valuemax="120"`, which a reader says
 *    out loud as "180 of 120". The clamp belongs to the bar's width; the real
 *    number goes into `aria-valuetext`, in words.
 * 4. **The unit is no longer hard-coded.** See {@link splitDuration} — the
 *    hour/minute split was gated on the literal `'min'`, so every translated
 *    unit lost its formatting entirely.
 * 5. **Over the limit is `warn`, never `danger`.** A child past their screen
 *    time is a measurement outside its band, not a system failure — the same
 *    reading `health` settled on for a vital outside range. The two states are
 *    told apart by their words, which is what a colour-blind parent reads
 *    anyway.
 * 6. **Loading draws the shape it is about to be**, and the card sits on
 *    `card`/`on-card` so it still reads as raised in dark mode.
 */
export declare const ScreenTimeBarV4: React.ForwardRefExoticComponent<ScreenTimeBarV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ScreenTimeBarV4.d.ts.map