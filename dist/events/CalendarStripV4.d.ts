import * as React from 'react';
import type { CalendarStripProps } from './CalendarStrip';
export interface CalendarStripV4Props extends CalendarStripProps {
    /** BCP-47 tag for the weekday, month and day-number names. Default: the host's. */
    locale?: string;
    /** The word a marked day carries in its name. Default `'Has events'`. */
    markedLabel?: string;
    /** The day highlighted when the caller passes no `selected`. */
    defaultSelected?: Date;
    /** "Today", for pinning the strip in a test or a server render. */
    today?: Date;
}
/**
 * **V4 calendar strip** — the web twin of the native `CalendarStripV4`, same
 * props as {@link CalendarStrip} plus `locale`, `markedLabel`,
 * `defaultSelected` and `today`.
 *
 * ## Seven changes
 *
 * 1. **A marked day never loses its dot.** The month label and the has-events
 *    marker shared one slot as an either/or, and `showMonth` is true on the 1st
 *    of any month and on the first pill — so a day with events falling on a
 *    month boundary showed no marker at all. They are two slots now.
 * 2. **The mark is announced.** It was a coloured dot and nothing else; it now
 *    joins the day's name as `markedLabel`.
 * 3. **The strip speaks the host's language.** The weekday and month came from
 *    `format.ts`'s inline `['Sun','Mon',…]` arrays, so the picker was
 *    English-only whatever locale the app ran in. `weekdayName` / `monthName` /
 *    `dayNumber` go through `Intl`, and `locale` steers them.
 * 4. **`today` replaces the bare `new Date()` in render**, so the strip can be
 *    pinned for a test or a server render instead of drifting with the clock.
 * 5. **`defaultSelected` gives the uncontrolled case somewhere to live.** A
 *    consumer that passed only `onSelectDate` got a strip where nothing ever
 *    highlighted, because `selected` is the only thing that draws the fill.
 * 6. **The `tablist` role is gone.** Fourteen day pills are not tabs: nothing
 *    here shows or hides a panel, and the role promised a roving focus the base
 *    never implemented, so a screen reader announced "tab 3 of 14" over a
 *    control that behaved like fourteen ordinary buttons. They are buttons now,
 *    with `aria-pressed` for the chosen day — and the arrow keys, Home and End
 *    still walk the strip, which is a convenience rather than a contract.
 * 7. **Day numbers are tabular**, so a two-digit day does not shift the pill's
 *    centre, and `hover:bg-neutral-50` — a ramp step, near-white on a dark page
 *    — becomes the shared state layer. `font-extrabold` is off the kit's scale.
 */
export declare const CalendarStripV4: React.ForwardRefExoticComponent<CalendarStripV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CalendarStripV4.d.ts.map